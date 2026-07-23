import React, { useState } from 'react';
import { DocumentData, PartyDetails, DocumentMeta, DocumentItem, DocumentCalculations, PaymentDetailsConfig } from '../../types/document';
import { PartyDetailsForm } from './PartyDetailsForm';
import { DocumentDetailsForm } from './DocumentDetailsForm';
import { DocumentItemsForm } from './DocumentItemsForm';
import { CalculationsForm } from './CalculationsForm';
import { PaymentAndNotesForm } from './PaymentAndNotesForm';
import { User, FileText, ShoppingBag, Calculator, ShieldCheck, AlertCircle } from 'lucide-react';

interface DocumentFormProps {
  documentData: DocumentData;
  onUpdateDocumentData: (updater: (prev: DocumentData) => DocumentData) => void;
}

export const DocumentForm: React.FC<DocumentFormProps> = ({
  documentData,
  onUpdateDocumentData,
}) => {
  const [activeTab, setActiveTab] = useState<'party' | 'doc' | 'items' | 'calc' | 'notes'>('party');

  const { meta, sender, billTo, shipTo, useSameShipTo, items, calculations, paymentDetails } =
    documentData;

  // Validation warnings
  const warnings: string[] = [];
  if (!sender.name.trim()) warnings.push('Sender Name is required.');
  if (!billTo.name.trim()) warnings.push('Bill To Party Name is required.');
  if (!meta.documentNumber.trim()) warnings.push('Document Number is required.');
  if (!meta.issueDate) warnings.push('Issue Date is required.');
  if (items.length === 0) warnings.push('At least one item must be added.');
  items.forEach((item, i) => {
    if (item.quantity <= 0) warnings.push(`Item #${i + 1} quantity must be greater than 0.`);
    if (item.unitPrice < 0) warnings.push(`Item #${i + 1} unit price cannot be negative.`);
  });

  const handleUpdateSender = (updated: PartyDetails) => {
    onUpdateDocumentData((prev) => ({ ...prev, sender: updated }));
  };

  const handleUpdateBillTo = (updated: PartyDetails) => {
    onUpdateDocumentData((prev) => ({ ...prev, billTo: updated }));
  };

  const handleUpdateShipTo = (updated: PartyDetails) => {
    onUpdateDocumentData((prev) => ({ ...prev, shipTo: updated }));
  };

  const handleToggleSameShipTo = (value: boolean) => {
    onUpdateDocumentData((prev) => ({ ...prev, useSameShipTo: value }));
  };

  const handleUpdateMeta = (updated: Partial<DocumentMeta>) => {
    onUpdateDocumentData((prev) => ({ ...prev, meta: { ...prev.meta, ...updated } }));
  };

  const handleAddItem = () => {
    const newItem: DocumentItem = {
      id: Date.now().toString(),
      name: `Phase ${items.length + 1}`,
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    onUpdateDocumentData((prev) => {
      const newItems = [...prev.items, newItem];
      return recalculateAll({ ...prev, items: newItems });
    });
  };

  const handleUpdateItem = (id: string, field: keyof DocumentItem, value: any) => {
    onUpdateDocumentData((prev) => {
      const newItems = prev.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            const qty = field === 'quantity' ? parseFloat(value) || 0 : item.quantity;
            const price = field === 'unitPrice' ? parseFloat(value) || 0 : item.unitPrice;
            updatedItem.total = qty * price;
          }
          return updatedItem;
        }
        return item;
      });
      return recalculateAll({ ...prev, items: newItems });
    });
  };

  const handleDeleteItem = (id: string) => {
    onUpdateDocumentData((prev) => {
      const newItems = prev.items.filter((item) => item.id !== id);
      return recalculateAll({ ...prev, items: newItems });
    });
  };

  const handleReorderItem = (index: number, direction: 'up' | 'down') => {
    onUpdateDocumentData((prev) => {
      const newItems = [...prev.items];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex >= 0 && targetIndex < newItems.length) {
        const temp = newItems[index];
        newItems[index] = newItems[targetIndex];
        newItems[targetIndex] = temp;
      }
      return { ...prev, items: newItems };
    });
  };

  const handleUpdateCalculations = (updated: Partial<DocumentCalculations>) => {
    onUpdateDocumentData((prev) => {
      const newCalc = { ...prev.calculations, ...updated };
      return recalculateAll({ ...prev, calculations: newCalc });
    });
  };

  const handleUpdatePaymentDetails = (updated: Partial<PaymentDetailsConfig>) => {
    onUpdateDocumentData((prev) => ({
      ...prev,
      paymentDetails: { ...prev.paymentDetails, ...updated },
    }));
  };

  const recalculateAll = (data: DocumentData): DocumentData => {
    const subtotal = data.items.reduce((acc, curr) => acc + (curr.total || 0), 0);

    let discountAmount = 0;
    if (data.calculations.discountType === 'percentage') {
      discountAmount = (subtotal * (data.calculations.discountValue || 0)) / 100;
    } else {
      discountAmount = data.calculations.discountValue || 0;
    }
    discountAmount = Math.min(discountAmount, subtotal);

    const afterDiscount = subtotal - discountAmount;

    let taxAmount = 0;
    if (data.calculations.taxType === 'percentage') {
      taxAmount = (afterDiscount * (data.calculations.taxValue || 0)) / 100;
    } else {
      taxAmount = data.calculations.taxValue || 0;
    }

    const additional = data.calculations.additionalCharges || 0;
    const grandTotal = Math.max(0, afterDiscount + taxAmount + additional);

    let amountPaid = data.calculations.amountPaid;
    if (data.meta.documentType === 'INVOICE' && (amountPaid === 0 || amountPaid === undefined)) {
      amountPaid = grandTotal;
    }

    const balancePayable = Math.max(0, grandTotal - (amountPaid || 0));

    let paymentStatus: 'PAID' | 'PARTIALLY_PAID' | 'UNPAID' = 'UNPAID';
    if (balancePayable === 0 && grandTotal > 0) {
      paymentStatus = 'PAID';
    } else if (amountPaid > 0 && balancePayable > 0) {
      paymentStatus = 'PARTIALLY_PAID';
    }

    return {
      ...data,
      calculations: {
        ...data.calculations,
        subtotal,
        discountAmount,
        taxAmount,
        grandTotal,
        amountPaid,
        balancePayable,
        paymentStatus,
      },
    };
  };

  const tabs = [
    { id: 'party', label: 'Parties Info', icon: User },
    { id: 'doc', label: 'Document Info', icon: FileText },
    { id: 'items', label: `Items (${items.length})`, icon: ShoppingBag },
    { id: 'calc', label: 'Totals & Tax', icon: Calculator },
    { id: 'notes', label: 'Bank & Notes', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-4 no-print">
      {/* Sub Tab Navigation */}
      <div className="flex items-center space-x-1 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Warnings Banner */}
      {warnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start space-x-2 text-xs text-amber-800">
          <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Missing or invalid details:</span>
            <ul className="list-disc list-inside mt-0.5 space-y-0.5">
              {warnings.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Active Form Section */}
      {activeTab === 'party' && (
        <PartyDetailsForm
          sender={sender}
          billTo={billTo}
          shipTo={shipTo}
          useSameShipTo={useSameShipTo}
          onUpdateSender={handleUpdateSender}
          onUpdateBillTo={handleUpdateBillTo}
          onUpdateShipTo={handleUpdateShipTo}
          onToggleSameShipTo={handleToggleSameShipTo}
        />
      )}

      {activeTab === 'doc' && (
        <DocumentDetailsForm meta={meta} onUpdateMeta={handleUpdateMeta} />
      )}

      {activeTab === 'items' && (
        <DocumentItemsForm
          items={items}
          onAddItem={handleAddItem}
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}
          onReorderItem={handleReorderItem}
        />
      )}

      {activeTab === 'calc' && (
        <CalculationsForm
          calculations={calculations}
          documentType={meta.documentType}
          onUpdateCalculations={handleUpdateCalculations}
        />
      )}

      {activeTab === 'notes' && (
        <PaymentAndNotesForm
          paymentDetails={paymentDetails}
          meta={meta}
          documentType={meta.documentType}
          onUpdatePaymentDetails={handleUpdatePaymentDetails}
          onUpdateMeta={handleUpdateMeta}
        />
      )}
    </div>
  );
};
