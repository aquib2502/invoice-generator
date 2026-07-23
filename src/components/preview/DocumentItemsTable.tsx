import React from 'react';
import { DocumentItem } from '../../types/document';
import { formatCurrency } from '../../utils/formatters';

interface DocumentItemsTableProps {
  items: DocumentItem[];
}

export const DocumentItemsTable: React.FC<DocumentItemsTableProps> = ({ items }) => {
  return (
    <div className="mb-4 overflow-hidden border border-gray-400 rounded-none">
      <table className="w-full text-left border-collapse font-sans text-xs">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-400 text-gray-900 font-bold uppercase tracking-wider text-[11px]">
            <th className="py-2.5 px-3 border-r border-gray-400 w-[18%] text-center">ORDER</th>
            <th className="py-2.5 px-4 border-r border-gray-400 w-[50%]">DESCRIPTION</th>
            <th className="py-2.5 px-3 border-r border-gray-400 w-[16%] text-right">UNIT PRICE</th>
            <th className="py-2.5 px-3 w-[16%] text-right">TOTAL(RS.)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 text-gray-800">
          {items.map((item, idx) => (
            <tr key={item.id || idx} className="hover:bg-gray-50/50 page-break-inside-avoid">
              <td className="py-3 px-3 border-r border-gray-400 align-top text-center font-bold text-gray-900">
                {item.name || `Phase ${idx + 1}`}
              </td>
              <td className="py-3 px-4 border-r border-gray-400 align-top whitespace-pre-line leading-relaxed">
                {item.description}
              </td>
              <td className="py-3 px-3 border-r border-gray-400 align-top text-right font-medium whitespace-nowrap">
                {formatCurrency(item.unitPrice, { style: 'dash' })}
              </td>
              <td className="py-3 px-3 align-top text-right font-bold text-gray-900 whitespace-nowrap">
                {formatCurrency(item.total, { style: 'dash' })}
              </td>
            </tr>
          ))}

          {/* Empty rows filler for visual structure if items < 3 */}
          {items.length < 2 && (
            <tr className="h-10">
              <td className="border-r border-gray-400"></td>
              <td className="border-r border-gray-400"></td>
              <td className="border-r border-gray-400"></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
