import React from 'react';
import { DocumentMeta, PartyDetails } from '../../types/document';
import { formatDate } from '../../utils/formatters';

interface DocumentHeaderProps {
  meta: DocumentMeta;
  sender: PartyDetails;
}

export const DocumentHeader: React.FC<DocumentHeaderProps> = ({ meta, sender }) => {
  const getDueDateTitle = () => {
    if (meta.documentType === 'QUOTATION') return 'VALID UNTIL';
    return 'DUE DATE';
  };

  const getDocTypeHeader = () => {
    return meta.documentType;
  };

  return (
    <div className="flex flex-row justify-between items-start pb-6 mb-4 font-sans border-b border-gray-300">
      {/* Left: Party Sending / Vendor Details (as in TPFINV_004) */}
      <div className="w-[58%] space-y-0.5 text-xs text-gray-800 leading-snug">
        <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-gray-900 uppercase mb-1">
          {sender.name || 'SENDER / COMPANY NAME'}
        </h1>
        {sender.pan && (
          <p className="font-semibold text-gray-800">
            PAN: <span className="font-mono text-gray-900">{sender.pan}</span>
          </p>
        )}
        {sender.gstin && (
          <p className="font-semibold text-gray-800">
            GSTIN: <span className="font-mono text-gray-900">{sender.gstin}</span>
          </p>
        )}
        {sender.addressLine1 && <p className="text-gray-700">{sender.addressLine1}</p>}
        {sender.addressLine2 && <p className="text-gray-700">{sender.addressLine2}</p>}
        {(sender.city || sender.state || sender.pinCode) && (
          <p className="text-gray-700">
            {[sender.city, sender.state].filter(Boolean).join(', ')}
            {sender.pinCode ? `- ${sender.pinCode}` : ''}
          </p>
        )}
        {sender.mobile && <p className="text-gray-700">Mobile: {sender.mobile}</p>}
        {sender.email && <p className="text-gray-700">Email: {sender.email}</p>}
      </div>

      {/* Right: Document Type & Dates (as in TPFINV_004) */}
      <div className="w-[40%] text-right space-y-2">
        <h2 className="text-2xl font-black tracking-widest text-gray-700 uppercase">
          {getDocTypeHeader()}
        </h2>

        <div className="space-y-0.5 text-xs text-gray-800 pt-1 font-sans">
          <p className="font-bold text-sm text-gray-900">
            {meta.documentType} # {meta.documentNumber}
          </p>
          <p className="font-semibold text-gray-700">
            DATE: <span className="font-mono">{formatDate(meta.issueDate)}</span>
          </p>
          {meta.dueDate && (
            <p className="font-semibold text-gray-700">
              {getDueDateTitle()}: <span className="font-mono">{formatDate(meta.dueDate)}</span>
            </p>
          )}
          {meta.referenceNo && (
            <p className="text-gray-600 font-medium">
              REF #: <span className="font-mono text-gray-900">{meta.referenceNo}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
