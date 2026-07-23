import React from 'react';
import { DocumentType } from '../../types/document';

interface DocumentFooterProps {
  terms: string[];
  documentType: DocumentType;
}

export const DocumentFooter: React.FC<DocumentFooterProps> = ({ terms, documentType }) => {
  return (
    <div className="space-y-4 font-sans text-xs pt-2">
      {/* Terms & Conditions Block */}
      {terms && terms.length > 0 && (
        <div className="bg-gray-50/70 p-3 rounded border border-gray-200 text-gray-700 space-y-1">
          <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-1">
            Terms & Conditions:
          </h4>
          <ul className="list-disc list-inside space-y-0.5 text-[11px] leading-relaxed">
            {terms.map((t, idx) => (
              <li key={idx}>{t}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Thank you & Computer Generated Disclaimer */}
      <div className="text-center pt-4 border-t border-gray-300 space-y-1 text-gray-800">
        <p className="font-black text-sm uppercase tracking-widest text-gray-900">
          THANK YOU FOR YOUR BUSINESS!
        </p>
        <p className="text-[11px] text-gray-500 italic">
          This is a computer generated {documentType.toLowerCase()}, signature not required.
        </p>
      </div>
    </div>
  );
};
