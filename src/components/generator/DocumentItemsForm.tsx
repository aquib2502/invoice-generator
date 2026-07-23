import React from 'react';
import { DocumentItem } from '../../types/document';
import { Plus, Trash2, ArrowUp, ArrowDown, ListOrdered } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface DocumentItemsFormProps {
  items: DocumentItem[];
  onAddItem: () => void;
  onUpdateItem: (id: string, field: keyof DocumentItem, value: any) => void;
  onDeleteItem: (id: string) => void;
  onReorderItem: (index: number, direction: 'up' | 'down') => void;
}

export const DocumentItemsForm: React.FC<DocumentItemsFormProps> = ({
  items,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onReorderItem,
}) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
        <div className="flex items-center space-x-2">
          <ListOrdered size={18} className="text-blue-600" />
          <h3 className="text-sm font-bold text-gray-900 uppercase">
            Items / Services Table ({items.length})
          </h3>
        </div>

        <button
          onClick={onAddItem}
          className="flex items-center space-x-1 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg shadow-sm transition"
        >
          <Plus size={15} />
          <span>Add Item</span>
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="p-3 bg-gray-50 border border-gray-200 rounded-lg space-y-3 relative group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                Item #{index + 1}
              </span>

              <div className="flex items-center space-x-1">
                <button
                  disabled={index === 0}
                  onClick={() => onReorderItem(index, 'up')}
                  className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-500"
                  title="Move Up"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  disabled={index === items.length - 1}
                  onClick={() => onReorderItem(index, 'down')}
                  className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:hover:text-gray-500"
                  title="Move Down"
                >
                  <ArrowDown size={14} />
                </button>
                {items.length > 1 && (
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1 text-red-500 hover:text-red-700 ml-1"
                    title="Delete Item"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Item / Phase Name *
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => onUpdateItem(item.id, 'name', e.target.value)}
                  placeholder="e.g. Phase 1"
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={item.quantity}
                  onChange={(e) =>
                    onUpdateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Unit Price (₹) *
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={item.unitPrice}
                  onChange={(e) =>
                    onUpdateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col justify-center bg-blue-50/70 px-2.5 py-1 rounded border border-blue-100">
                <span className="text-[10px] text-gray-500 font-semibold uppercase">Total</span>
                <span className="text-xs font-extrabold text-blue-900 truncate">
                  {formatCurrency(item.total)}
                </span>
              </div>

              <div className="sm:col-span-12">
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Detailed Description (Wrapping Text)
                </label>
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                  placeholder="Enter detailed description of work or service provided..."
                  className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
