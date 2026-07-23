import React from 'react';
import { PaymentDetailsConfig } from '../../types/document';

interface PaymentDetailsProps {
  paymentDetails: PaymentDetailsConfig;
  senderName?: string;
  notes?: string;
}

export const PaymentDetailsPreview: React.FC<PaymentDetailsProps> = ({
  paymentDetails,
  senderName,
  notes,
}) => {
  if (!paymentDetails.showPaymentDetails) return null;

  return (
    <div className="mb-6 space-y-2 font-sans text-xs text-gray-800 border-t border-b border-gray-200 py-3">
      {notes && (
        <p className="font-semibold text-gray-900 leading-snug">
          {notes}
        </p>
      )}

      <p className="font-bold text-gray-900">Kindly pay at below mentioned credentials:</p>

      <div className="grid grid-cols-1 gap-1 text-xs pl-2 font-sans">
        <div className="flex">
          <span className="w-40 font-semibold text-gray-700">Account Holder Name</span>
          <span className="font-bold text-gray-900">: {paymentDetails.accountName || senderName || 'True Path Foundation'}</span>
        </div>
        <div className="flex">
          <span className="w-40 font-semibold text-gray-700">Bank & Branch Address</span>
          <span className="font-medium text-gray-900">: {paymentDetails.bankName}</span>
        </div>
        <div className="flex">
          <span className="w-40 font-semibold text-gray-700">Account No.</span>
          <span className="font-bold font-mono text-gray-900">: {paymentDetails.accountNumber}</span>
        </div>
        <div className="flex">
          <span className="w-40 font-semibold text-gray-700">IFSC</span>
          <span className="font-bold font-mono text-gray-900">: {paymentDetails.ifscCode}</span>
        </div>
        {paymentDetails.upiId && (
          <div className="flex">
            <span className="w-40 font-semibold text-gray-700">UPI ID / QR</span>
            <span className="font-bold font-mono text-blue-900">: {paymentDetails.upiId}</span>
          </div>
        )}
      </div>
    </div>
  );
};
