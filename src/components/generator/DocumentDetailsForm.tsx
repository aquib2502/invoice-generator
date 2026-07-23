import React from 'react';
import { DocumentMeta, DocumentType } from '../../types/document';
import { Calendar, Hash, FileCheck, Tag } from 'lucide-react';

interface DocumentDetailsFormProps {
  meta: DocumentMeta;
  onUpdateMeta: (updated: Partial<DocumentMeta>) => void;
}

export const DocumentDetailsForm: React.FC<DocumentDetailsFormProps> = ({
  meta,
  onUpdateMeta,
}) => {
  const getDocNumberLabel = (type: DocumentType) => {
    switch (type) {
      case 'INVOICE':
        return 'INVOICE NUMBER *';
      case 'CHALLAN':
        return 'CHALLAN NUMBER *';
      case 'QUOTATION':
        return 'QUOTATION NUMBER *';
    }
  };

  const getIssueDateLabel = (type: DocumentType) => {
    switch (type) {
      case 'INVOICE':
        return 'INVOICE DATE *';
      case 'CHALLAN':
        return 'ISSUE DATE *';
      case 'QUOTATION':
        return 'QUOTATION DATE *';
    }
  };

  const getDueDateLabel = (type: DocumentType) => {
    switch (type) {
      case 'INVOICE':
        return 'DUE DATE';
      case 'CHALLAN':
        return 'DUE DATE *';
      case 'QUOTATION':
        return 'VALID UNTIL *';
    }
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center space-x-2 border-b border-gray-100 pb-2">
        <FileCheck size={18} className="text-blue-600" />
        <h3 className="text-sm font-bold text-gray-900 uppercase">
          Document Details ({meta.documentType})
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center space-x-1">
            <Hash size={13} className="text-blue-600" />
            <span>{getDocNumberLabel(meta.documentType)}</span>
          </label>
          <input
            type="text"
            value={meta.documentNumber}
            onChange={(e) => onUpdateMeta({ documentNumber: e.target.value })}
            placeholder="e.g. 004 or TPF-INV-05"
            className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center space-x-1">
            <Tag size={13} className="text-blue-600" />
            <span>Reference # (PO / Contract)</span>
          </label>
          <input
            type="text"
            value={meta.referenceNo || ''}
            onChange={(e) => onUpdateMeta({ referenceNo: e.target.value })}
            placeholder="e.g. PO-2026-88"
            className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center space-x-1">
            <Calendar size={13} className="text-blue-600" />
            <span>{getIssueDateLabel(meta.documentType)}</span>
          </label>
          <input
            type="date"
            value={meta.issueDate}
            onChange={(e) => onUpdateMeta({ issueDate: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center space-x-1">
            <Calendar size={13} className="text-blue-600" />
            <span>{getDueDateLabel(meta.documentType)}</span>
          </label>
          <input
            type="date"
            value={meta.dueDate}
            onChange={(e) => onUpdateMeta({ dueDate: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Document Subject / Title (Optional)
          </label>
          <input
            type="text"
            value={meta.subject || ''}
            onChange={(e) => onUpdateMeta({ subject: e.target.value })}
            placeholder="e.g. UI/UX Design & Frontend Development Phase 1-3"
            className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
};
