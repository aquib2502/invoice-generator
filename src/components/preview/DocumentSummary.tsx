import React from 'react';
import { DocumentCalculations, DocumentType } from '../../types/document';
import { formatCurrency, numberToWords } from '../../utils/formatters';

interface DocumentSummaryProps {
  calculations: DocumentCalculations;
  documentType: DocumentType;
}

export const DocumentSummary: React.FC<DocumentSummaryProps> = ({
  calculations,
  documentType,
}) => {
  const getGrandTotalLabel = () => {
    switch (documentType) {
      case 'INVOICE':
        return 'TOTAL AMOUNT PAID';
      case 'CHALLAN':
        return 'TOTAL CURRENTLY PAYABLE';
      case 'QUOTATION':
        return 'TOTAL QUOTED AMOUNT';
    }
  };

  const getPurposeStatement = () => {
    switch (documentType) {
      case 'INVOICE':
        return 'This document confirms that payment has been received in full for the services/goods listed above.';
      case 'CHALLAN':
        return 'This document serves as an official payment demand for the amount currently due and payable below.';
      case 'QUOTATION':
        return 'This document represents proposed pricing for approval. Upon agreement, work/services will commence as outlined.';
    }
  };

  const getPaymentStatusText = () => {
    const status = calculations.paymentStatus;
    if (status) {
      return status.replace(/_/g, ' ');
    }
    // Fallback based on balance payable
    return (calculations.balancePayable ?? 0) === 0 ? 'PAID' : 'UNPAID';
  };

  return (
    <div className="space-y-3 mb-6 font-sans">
      {/* Purpose Banner */}
      <div className={`p-2.5 rounded border text-xs font-bold ${
        documentType === 'INVOICE'
          ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
          : documentType === 'CHALLAN'
          ? 'bg-blue-50 text-blue-900 border-blue-300'
          : 'bg-amber-50 text-amber-900 border-amber-300'
      }`}>
        <span className="uppercase tracking-wider font-extrabold block text-[10px] opacity-75 mb-0.5">
          {documentType} STATEMENT:
        </span>
        <p className="leading-snug">{getPurposeStatement()}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        {/* Left: Number to Words & Status Badge */}
        <div className="w-full sm:w-[55%] space-y-2 pt-1">
          <div className="bg-gray-50 p-2.5 rounded border border-gray-300">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
              Amount in Words:
            </p>
            <p className="text-xs font-semibold text-gray-900 italic leading-snug">
              {numberToWords(calculations.grandTotal)}
            </p>
          </div>

          {documentType === 'INVOICE' && (
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-950 border border-emerald-400 px-3 py-1 rounded text-xs font-extrabold">
              <span>PAYMENT STATUS:</span>
              <span className="uppercase">{getPaymentStatusText()}</span>
            </div>
          )}

          {documentType === 'CHALLAN' && (
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-950 border border-blue-400 px-3 py-1 rounded text-xs font-extrabold">
              <span>PAYMENT DEMAND:</span>
              <span>PAYABLE BY DUE DATE</span>
            </div>
          )}

          {documentType === 'QUOTATION' && (
            <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-950 border border-amber-400 px-3 py-1 rounded text-xs font-extrabold">
              <span>PROPOSAL:</span>
              <span>PENDING APPROVAL</span>
            </div>
          )}
        </div>

        {/* Right: Summary Numbers Table */}
        <div className="w-full sm:w-[42%] border border-gray-400 font-sans text-xs">
          <div className="divide-y divide-gray-300">
            <div className="flex justify-between py-1.5 px-3">
              <span className="font-bold text-gray-800 uppercase">SUBTOTAL</span>
              <span className="font-bold text-gray-900 font-mono">
                {formatCurrency(calculations.subtotal, { style: 'dash' })}
              </span>
            </div>

            {calculations.discountAmount > 0 && (
              <div className="flex justify-between py-1.5 px-3 text-red-700">
                <span className="font-bold uppercase">
                  DISCOUNT ({calculations.discountType === 'percentage' ? `${calculations.discountValue}%` : 'FLAT'})
                </span>
                <span className="font-bold font-mono">
                  - {formatCurrency(calculations.discountAmount, { style: 'dash' })}
                </span>
              </div>
            )}

            <div className="flex justify-between py-1.5 px-3">
              <span className="font-bold text-gray-800 uppercase">
                {calculations.taxLabel || 'TAX'}
              </span>
              <span className="font-bold text-gray-900 font-mono">
                {calculations.taxAmount > 0
                  ? formatCurrency(calculations.taxAmount, { style: 'dash' })
                  : '00'}
              </span>
            </div>

            {calculations.additionalCharges > 0 && (
              <div className="flex justify-between py-1.5 px-3">
                <span className="font-bold text-gray-800 uppercase">
                  {calculations.additionalChargesLabel || 'ADDITIONAL CHARGES'}
                </span>
                <span className="font-bold text-gray-900 font-mono">
                  {formatCurrency(calculations.additionalCharges, { style: 'dash' })}
                </span>
              </div>
            )}

            <div className="flex justify-between py-2 px-3 bg-gray-100 border-t-2 border-gray-400">
              <span className="font-black text-gray-900 uppercase text-xs">
                {getGrandTotalLabel()}
              </span>
              <span className="font-black text-gray-900 font-mono text-sm">
                {formatCurrency(calculations.grandTotal, { style: 'dash' })}
              </span>
            </div>

            {documentType === 'INVOICE' && (
              <>
                <div className="flex justify-between py-1.5 px-3 text-green-800 bg-green-50/50">
                  <span className="font-bold uppercase">AMOUNT PAID</span>
                  <span className="font-bold font-mono">
                    {formatCurrency(calculations.amountPaid, { style: 'dash' })}
                  </span>
                </div>

                <div className="flex justify-between py-1.5 px-3">
                  <span className="font-bold text-gray-800 uppercase">BALANCE DUE</span>
                  <span className="font-bold font-mono">
                    {formatCurrency(calculations.balancePayable, { style: 'dash' })}
                  </span>
                </div>
              </>
            )}

            {documentType === 'CHALLAN' && (
              <div className="flex justify-between py-2 px-3 bg-blue-50 border-t border-gray-400">
                <span className="font-black text-blue-950 uppercase">TOTAL BALANCE PAYABLE</span>
                <span className="font-black text-blue-950 font-mono">
                  {formatCurrency(calculations.balancePayable, { style: 'dash' })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
