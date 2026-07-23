import React from 'react';
import { DocumentData } from '../../types/document';
import { DocumentHeader } from './DocumentHeader';
import { DocumentPartyInfo } from './DocumentPartyInfo';
import { DocumentItemsTable } from './DocumentItemsTable';
import { DocumentSummary } from './DocumentSummary';
import { PaymentDetailsPreview } from './PaymentDetails';
import { DocumentFooter } from './DocumentFooter';

interface DocumentTemplateProps {
  documentData: DocumentData;
}

export const DocumentTemplate: React.FC<DocumentTemplateProps> = ({ documentData }) => {
  const { meta, sender, billTo, shipTo, useSameShipTo, items, calculations, paymentDetails } =
    documentData;

  return (
    <div
      id="a4-document-preview"
      className="a4-container space-y-4 font-sans text-gray-900 bg-white"
    >
      {/* Document Header (Editable Sender details left, Doc type right) */}
      <DocumentHeader meta={meta} sender={sender} />

      {/* Document Subject if present */}
      {meta.subject && (
        <div className="bg-gray-100 p-2 border-l-4 border-gray-700 text-xs font-semibold text-gray-900 page-break-avoid">
          <span className="uppercase text-[10px] text-gray-500 font-bold block">SUBJECT:</span>
          {meta.subject}
        </div>
      )}

      {/* Bill To & Ship To Details */}
      <DocumentPartyInfo
        billTo={billTo}
        shipTo={shipTo}
        useSameShipTo={useSameShipTo}
      />

      {/* Itemized Table matching TPFINV_004 */}
      <DocumentItemsTable items={items} />

      {/* Calculations & Summary Box */}
      <div className="summary-box page-break-avoid">
        <DocumentSummary calculations={calculations} documentType={meta.documentType} />
      </div>

      {/* Payment Credentials */}
      <div className="bank-box page-break-avoid">
        <PaymentDetailsPreview
          paymentDetails={paymentDetails}
          senderName={sender.name}
          notes={meta.notes}
        />
      </div>

      {/* Footer & Terms */}
      <div className="terms-box footer-box page-break-avoid">
        <DocumentFooter terms={meta.terms} documentType={meta.documentType} />
      </div>
    </div>
  );
};
