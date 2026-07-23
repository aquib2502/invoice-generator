import React from 'react';
import { DocumentType } from '../../types/document';
import { FileText, Receipt, FileSpreadsheet } from 'lucide-react';

interface DocumentTypeSelectorProps {
  currentType: DocumentType;
  onSelectType: (type: DocumentType) => void;
}

export const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({
  currentType,
  onSelectType,
}) => {
  const types: { id: DocumentType; label: string; description: string; icon: React.ElementType }[] = [
    {
      id: 'INVOICE',
      label: 'INVOICE',
      description: 'Proof of payment received',
      icon: Receipt,
    },
    {
      id: 'CHALLAN',
      label: 'CHALLAN',
      description: 'Payment demand document',
      icon: FileText,
    },
    {
      id: 'QUOTATION',
      label: 'QUOTATION',
      description: 'Proposed cost estimation',
      icon: FileSpreadsheet,
    },
  ];

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 no-print">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Select Document Type
          </h2>
          <p className="text-xs text-gray-500">
            Switching mode automatically updates document headings, terms, & calculations
          </p>
        </div>
        <div className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
          Active: <span className="font-extrabold">{currentType}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {types.map((item) => {
          const Icon = item.icon;
          const isSelected = currentType === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectType(item.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all text-center ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Icon size={22} className={`mb-1 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className="font-bold text-xs sm:text-sm tracking-wide">{item.label}</span>
              <span className="text-[10px] text-gray-500 hidden md:block mt-0.5">
                {item.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
