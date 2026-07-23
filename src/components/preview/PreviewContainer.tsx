import React, { useState } from 'react';
import { DocumentData } from '../../types/document';
import { DocumentTemplate } from './DocumentTemplate';
import { Download, Printer, RotateCcw, ZoomIn, ZoomOut, Eye, Maximize2 } from 'lucide-react';
import { downloadPDF, triggerPrint } from '../../utils/pdfGenerator';

interface PreviewContainerProps {
  documentData: DocumentData;
  onResetDocument: () => void;
  onToggleFullPreview?: () => void;
  isFullPreview?: boolean;
}

export const PreviewContainer: React.FC<PreviewContainerProps> = ({
  documentData,
  onResetDocument,
  onToggleFullPreview,
  isFullPreview,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(0.9);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    try {
      await downloadPDF('a4-document-preview', documentData.meta);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    triggerPrint();
  };

  return (
    <div className="flex flex-col h-full bg-slate-200/90 p-3 sm:p-5 rounded-2xl border border-slate-300 shadow-sm">
      {/* Top Preview Action Bar */}
      <div className="bg-white p-3.5 rounded-xl shadow-sm border border-slate-200 mb-4 flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex items-center space-x-2">
          <Eye size={18} className="text-blue-600" />
          <span className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
            Live A4 Document Preview
          </span>
          <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">
            {documentData.meta.documentType} #{documentData.meta.documentNumber}
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1 border border-slate-200 rounded-lg p-1 text-xs bg-slate-50">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.1))}
            className="p-1 text-slate-600 hover:text-blue-600 transition"
            title="Zoom Out"
          >
            <ZoomOut size={15} />
          </button>
          <span className="w-12 text-center font-mono font-bold text-slate-800">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.1))}
            className="p-1 text-slate-600 hover:text-blue-600 transition"
            title="Zoom In"
          >
            <ZoomIn size={15} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {onToggleFullPreview && (
            <button
              onClick={onToggleFullPreview}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                isFullPreview
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              title="Expand view"
            >
              <Maximize2 size={14} />
              <span className="hidden sm:inline">
                {isFullPreview ? 'Split Screen' : 'Full Preview'}
              </span>
            </button>
          )}

          <button
            onClick={onResetDocument}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
            title="Reset document fields"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 shadow-sm transition"
          >
            <Printer size={14} className="text-slate-700" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition disabled:opacity-50"
          >
            <Download size={14} />
            <span>{isExporting ? 'Generating PDF...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* A4 Document Viewport */}
      <div className="flex-1 overflow-auto flex justify-center items-start p-2 sm:p-6 bg-slate-300/80 rounded-xl min-h-[700px]">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease-in-out',
          }}
          className="my-2 shadow-2xl"
        >
          <DocumentTemplate documentData={documentData} />
        </div>
      </div>
    </div>
  );
};
