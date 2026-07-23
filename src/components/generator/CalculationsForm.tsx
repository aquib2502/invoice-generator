import React from 'react';
import { DocumentCalculations, DocumentType } from '../../types/document';
import { Calculator, Percent, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface CalculationsFormProps {
  calculations: DocumentCalculations;
  documentType: DocumentType;
  onUpdateCalculations: (updated: Partial<DocumentCalculations>) => void;
}

export const CalculationsForm: React.FC<CalculationsFormProps> = ({
  calculations,
  documentType,
  onUpdateCalculations,
}) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
        <Calculator size={18} className="text-blue-600" />
        <h3 className="text-sm font-bold text-gray-900 uppercase">
          Taxes, Discounts & Payment Totals
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Discount Section */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-gray-700">Discount</label>
            <div className="flex items-center space-x-1 bg-white border rounded p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => onUpdateCalculations({ discountType: 'flat' })}
                className={`px-2 py-0.5 rounded font-semibold ${
                  calculations.discountType === 'flat' ? 'bg-blue-600 text-white' : 'text-gray-600'
                }`}
              >
                ₹ Flat
              </button>
              <button
                type="button"
                onClick={() => onUpdateCalculations({ discountType: 'percentage' })}
                className={`px-2 py-0.5 rounded font-semibold ${
                  calculations.discountType === 'percentage'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600'
                }`}
              >
                % Percent
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="0"
              step="any"
              value={calculations.discountValue}
              onChange={(e) =>
                onUpdateCalculations({ discountValue: parseFloat(e.target.value) || 0 })
              }
              placeholder="0"
              className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
            />
            <span className="text-xs font-bold text-gray-600 min-w-[70px] text-right">
              = {formatCurrency(calculations.discountAmount)}
            </span>
          </div>
        </div>

        {/* Tax Section */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-gray-700">Tax / GST</label>
            <div className="flex items-center space-x-1 bg-white border rounded p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => onUpdateCalculations({ taxType: 'flat' })}
                className={`px-2 py-0.5 rounded font-semibold ${
                  calculations.taxType === 'flat' ? 'bg-blue-600 text-white' : 'text-gray-600'
                }`}
              >
                ₹ Flat
              </button>
              <button
                type="button"
                onClick={() => onUpdateCalculations({ taxType: 'percentage' })}
                className={`px-2 py-0.5 rounded font-semibold ${
                  calculations.taxType === 'percentage'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600'
                }`}
              >
                % Percent
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="0"
              step="any"
              value={calculations.taxValue}
              onChange={(e) =>
                onUpdateCalculations({ taxValue: parseFloat(e.target.value) || 0 })
              }
              placeholder="e.g. 18 for GST 18%"
              className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
            />
            <span className="text-xs font-bold text-gray-600 min-w-[70px] text-right">
              = {formatCurrency(calculations.taxAmount)}
            </span>
          </div>
        </div>

        {/* Additional Charges */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2 sm:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Additional Charges Label
              </label>
              <input
                type="text"
                value={calculations.additionalChargesLabel || ''}
                onChange={(e) => onUpdateCalculations({ additionalChargesLabel: e.target.value })}
                placeholder="e.g. Processing Fee / Delivery"
                className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Additional Amount (₹)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={calculations.additionalCharges}
                onChange={(e) =>
                  onUpdateCalculations({ additionalCharges: parseFloat(e.target.value) || 0 })
                }
                placeholder="0"
                className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Amount Paid / Payment Status section for Invoice & Challan */}
        {documentType !== 'QUOTATION' && (
          <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-200 sm:col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-blue-900">
                Amount Paid (₹) {documentType === 'INVOICE' && '(Default = Grand Total)'}
              </label>
              <span className="text-xs font-extrabold text-blue-800">
                Balance: {formatCurrency(calculations.balancePayable)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="number"
                min="0"
                step="any"
                value={calculations.amountPaid}
                onChange={(e) =>
                  onUpdateCalculations({ amountPaid: parseFloat(e.target.value) || 0 })
                }
                placeholder="Amount received"
                className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white font-semibold"
              />

              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-gray-700">Status:</span>
                <span
                  className={`text-xs font-extrabold px-2.5 py-1 rounded ${
                    calculations.paymentStatus === 'PAID'
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : calculations.paymentStatus === 'PARTIALLY_PAID'
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}
                >
                  {calculations.paymentStatus.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
