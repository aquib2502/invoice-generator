import React from 'react';
import { PaymentDetailsConfig, DocumentMeta, DocumentType } from '../../types/document';
import { CreditCard, FileText, Plus, Trash2, ShieldAlert } from 'lucide-react';

interface PaymentAndNotesFormProps {
  paymentDetails: PaymentDetailsConfig;
  meta: DocumentMeta;
  documentType: DocumentType;
  onUpdatePaymentDetails: (updated: Partial<PaymentDetailsConfig>) => void;
  onUpdateMeta: (updated: Partial<DocumentMeta>) => void;
}

export const PaymentAndNotesForm: React.FC<PaymentAndNotesFormProps> = ({
  paymentDetails,
  meta,
  documentType,
  onUpdatePaymentDetails,
  onUpdateMeta,
}) => {
  const handleAddTerm = () => {
    onUpdateMeta({ terms: [...meta.terms, 'New term or condition'] });
  };

  const handleUpdateTerm = (index: number, value: string) => {
    const updated = [...meta.terms];
    updated[index] = value;
    onUpdateMeta({ terms: updated });
  };

  const handleDeleteTerm = (index: number) => {
    const updated = meta.terms.filter((_, i) => i !== index);
    onUpdateMeta({ terms: updated });
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
      {/* Bank Credentials Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <div className="flex items-center space-x-2">
            <CreditCard size={18} className="text-blue-600" />
            <h3 className="text-sm font-bold text-gray-900 uppercase">
              True Path Foundation Bank Credentials
            </h3>
          </div>

          <label className="flex items-center space-x-2 text-xs font-semibold text-blue-700 cursor-pointer bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
            <input
              type="checkbox"
              checked={paymentDetails.showPaymentDetails}
              onChange={(e) => onUpdatePaymentDetails({ showPaymentDetails: e.target.checked })}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Show Bank Box on Document</span>
          </label>
        </div>

        {paymentDetails.showPaymentDetails && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                Account Holder Name
              </label>
              <input
                type="text"
                value={paymentDetails.accountName}
                onChange={(e) => onUpdatePaymentDetails({ accountName: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                Bank & Branch
              </label>
              <input
                type="text"
                value={paymentDetails.bankName}
                onChange={(e) => onUpdatePaymentDetails({ bankName: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                Account Number
              </label>
              <input
                type="text"
                value={paymentDetails.accountNumber}
                onChange={(e) => onUpdatePaymentDetails({ accountNumber: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                IFSC Code
              </label>
              <input
                type="text"
                value={paymentDetails.ifscCode}
                onChange={(e) => onUpdatePaymentDetails({ ifscCode: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded outline-none font-mono uppercase"
              />
            </div>
          </div>
        )}
      </div>

      {/* Notes & Terms Section */}
      <div className="pt-3 border-t border-gray-200 space-y-3">
        <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
          <FileText size={18} className="text-blue-600" />
          <h3 className="text-sm font-bold text-gray-900 uppercase">
            Notes & Terms & Conditions
          </h3>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Special Notes / Instructions
          </label>
          <textarea
            rows={2}
            value={meta.notes}
            onChange={(e) => onUpdateMeta({ notes: e.target.value })}
            placeholder="e.g. Make all checks payable to TRUE PATH FOUNDATION"
            className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-gray-700">
              Terms & Conditions ({meta.terms.length})
            </label>
            <button
              onClick={handleAddTerm}
              className="flex items-center space-x-1 text-[11px] font-bold text-blue-600 hover:text-blue-800"
            >
              <Plus size={13} />
              <span>Add Term Line</span>
            </button>
          </div>

          <div className="space-y-2">
            {meta.terms.map((term, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-gray-400 w-4 text-right">
                  {index + 1}.
                </span>
                <input
                  type="text"
                  value={term}
                  onChange={(e) => handleUpdateTerm(index, e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                />
                {meta.terms.length > 1 && (
                  <button
                    onClick={() => handleDeleteTerm(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remove term"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
