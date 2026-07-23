import React from 'react';
import { FileText, ShieldCheck, Printer, Download } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md no-print">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 rounded-lg p-2 text-white shadow-sm flex items-center justify-center">
            <FileText size={22} />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-white flex items-center space-x-2">
              <span>TRUE PATH FOUNDATION</span>
              <span className="text-xs bg-blue-500/30 text-blue-300 font-medium px-2 py-0.5 rounded border border-blue-400/30 hidden sm:inline-block">
                Document Hub
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Invoice • Challan • Quotation Engine
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 border border-slate-700">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>100% Frontend Engine • Privacy Guaranteed</span>
          </div>
        </div>
      </div>
    </header>
  );
};
