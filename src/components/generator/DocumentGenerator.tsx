import React, { useState, useEffect } from 'react';
import { DocumentData, DocumentType } from '../../types/document';
import { INITIAL_SAMPLE_DATA, DEFAULT_NOTES, DEFAULT_TERMS } from '../../config/tpfConfig';
import { DocumentTypeSelector } from './DocumentTypeSelector';
import { DocumentForm } from './DocumentForm';
import { PreviewContainer } from '../preview/PreviewContainer';
import { LayoutGrid, Eye, Edit3 } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'tpf_doc_generator_draft_v2';

export const DocumentGenerator: React.FC = () => {
  const [documentType, setDocumentType] = useState<DocumentType>('INVOICE');
  const [documentData, setDocumentData] = useState<DocumentData>(INITIAL_SAMPLE_DATA.INVOICE);
  const [viewMode, setViewMode] = useState<'split' | 'form' | 'preview'>('form');

  // Load draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.meta && parsed.meta.documentType) {
          setDocumentType(parsed.meta.documentType);
          setDocumentData(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not read draft from localStorage', e);
    }
  }, []);

  // Persist draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(documentData));
    } catch (e) {
      console.warn('Could not save draft to localStorage', e);
    }
  }, [documentData]);

  // Handle switching document type (Invoice -> Challan -> Quotation)
  const handleSelectType = (newType: DocumentType) => {
    setDocumentType(newType);

    setDocumentData((prev) => {
      const newMeta = {
        ...prev.meta,
        documentType: newType,
        notes: DEFAULT_NOTES[newType],
        terms: DEFAULT_TERMS[newType],
      };

      let showPayment = true;
      if (newType === 'QUOTATION') showPayment = false;

      return {
        ...prev,
        meta: newMeta,
        paymentDetails: {
          ...prev.paymentDetails,
          showPaymentDetails: showPayment,
        },
      };
    });
  };

  const handleResetDocument = () => {
    if (window.confirm('Reset all fields to standard TPFINV_004 defaults?')) {
      const resetData = INITIAL_SAMPLE_DATA[documentType];
      setDocumentData(resetData);
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch (e) {}
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Workspace Header & Layout Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Document Generator
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Full-width A4 generator with editable sender details & True Path Foundation bill-to credentials.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setViewMode('form')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'form'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 size={14} />
            <span>Form Only</span>
          </button>

          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'split'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid size={14} />
            <span className="hidden sm:inline">Split View</span>
          </button>

          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'preview'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye size={14} />
            <span>Full A4 Preview</span>
          </button>
        </div>
      </div>

      {/* Document Type Selector [ INVOICE ] [ CHALLAN ] [ QUOTATION ] */}
      <DocumentTypeSelector currentType={documentType} onSelectType={handleSelectType} />

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Column */}
        {(viewMode === 'split' || viewMode === 'form') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-4`}>
            <div className="bg-slate-900 text-white p-3 rounded-xl shadow-sm flex items-center justify-between no-print">
              <span className="font-extrabold text-xs uppercase tracking-wider">Form Editor</span>
              <span className="text-[11px] bg-blue-600/50 px-2.5 py-0.5 rounded font-mono font-bold">
                {documentType}
              </span>
            </div>

            <DocumentForm
              documentData={documentData}
              onUpdateDocumentData={setDocumentData}
            />
          </div>
        )}

        {/* Live A4 Preview Column */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className={`${viewMode === 'split' ? 'lg:col-span-7 sticky top-20' : 'lg:col-span-12'}`}>
            <PreviewContainer
              documentData={documentData}
              onResetDocument={handleResetDocument}
              onToggleFullPreview={() => setViewMode((m) => (m === 'preview' ? 'form' : 'preview'))}
              isFullPreview={viewMode === 'preview'}
            />
          </div>
        )}
      </div>
    </div>
  );
};
