import React from 'react';
import {
  LayoutDashboard,
  FileCheck2,
  Users,
  DollarSign,
  Settings,
  HelpCircle,
  FileText,
  Building2,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: FileCheck2, label: 'Invoice / Challan / Quotation Generator', active: true },
    { icon: Users, label: 'Donors & Campaign', active: false },
    { icon: DollarSign, label: 'Financial Aid Management', active: false },
    { icon: Building2, label: 'Organization Profile', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden no-print"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full z-50 transition-all duration-300 bg-white border-r border-gray-200 w-64 flex flex-col no-print ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header inside mobile sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <span className="font-bold text-gray-900">TPF Admin Menu</span>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-4 flex-1 overflow-y-auto space-y-1">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Modules
          </p>

          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  item.active
                    ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon size={18} className={item.active ? 'text-blue-600' : 'text-gray-500'} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer info box */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 m-3 rounded-lg">
          <div className="flex items-center space-x-2 text-xs font-semibold text-gray-700 mb-1">
            <Building2 size={14} className="text-blue-600" />
            <span>True Path Foundation</span>
          </div>
          <p className="text-[11px] text-gray-500 leading-tight">
            Registered Non-Profit Org
          </p>
          <p className="text-[10px] text-gray-400 mt-1">
            PAN: AAJCT7092M
          </p>
        </div>
      </aside>
    </>
  );
};
