import React from 'react';
import { PartyDetails } from '../../types/document';
import { User, Building2, Truck, Copy } from 'lucide-react';

interface PartyDetailsFormProps {
  sender: PartyDetails;
  billTo: PartyDetails;
  shipTo?: PartyDetails;
  useSameShipTo: boolean;
  onUpdateSender: (updated: PartyDetails) => void;
  onUpdateBillTo: (updated: PartyDetails) => void;
  onUpdateShipTo: (updated: PartyDetails) => void;
  onToggleSameShipTo: (value: boolean) => void;
}

export const PartyDetailsForm: React.FC<PartyDetailsFormProps> = ({
  sender,
  billTo,
  shipTo,
  useSameShipTo,
  onUpdateSender,
  onUpdateBillTo,
  onUpdateShipTo,
  onToggleSameShipTo,
}) => {
  const handleSenderChange = (field: keyof PartyDetails, value: string) => {
    onUpdateSender({ ...sender, [field]: value });
  };

  const handleBillToChange = (field: keyof PartyDetails, value: string) => {
    onUpdateBillTo({ ...billTo, [field]: value });
  };

  const handleShipToChange = (field: keyof PartyDetails, value: string) => {
    if (shipTo) {
      onUpdateShipTo({ ...shipTo, [field]: value });
    }
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm space-y-6">
      {/* Sender Details Section (Party Sending) */}
      <div>
        <div className="flex items-center space-x-2 border-b border-gray-100 pb-2 mb-3">
          <User size={18} className="text-blue-600" />
          <h3 className="text-sm font-bold text-gray-900 uppercase">
            Sender Details (Party Sending / Vendor)
          </h3>
          <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold border border-blue-200">
            Editable Header Party
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Sender / Company Name *
            </label>
            <input
              type="text"
              value={sender.name}
              onChange={(e) => handleSenderChange('name', e.target.value)}
              placeholder="e.g. AQUIB MOHAMMED ALI HINGWALA"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Sender PAN</label>
            <input
              type="text"
              value={sender.pan}
              onChange={(e) => handleSenderChange('pan', e.target.value.toUpperCase())}
              placeholder="e.g. AVDCSH8283A"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              GSTIN (Optional)
            </label>
            <input
              type="text"
              value={sender.gstin || ''}
              onChange={(e) => handleSenderChange('gstin', e.target.value.toUpperCase())}
              placeholder="e.g. 27AVDCSH8283A1Z2"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1">Address Line 1</label>
            <input
              type="text"
              value={sender.addressLine1}
              onChange={(e) => handleSenderChange('addressLine1', e.target.value)}
              placeholder="e.g. C-9, Mukund Nagar, Marol Pipe Line"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Address Line 2</label>
            <input
              type="text"
              value={sender.addressLine2 || ''}
              onChange={(e) => handleSenderChange('addressLine2', e.target.value)}
              placeholder="e.g. Andheri East"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">City, State & PIN</label>
            <input
              type="text"
              value={`${sender.city}, ${sender.state} - ${sender.pinCode}`}
              onChange={(e) => {
                const parts = e.target.value.split(',');
                if (parts.length >= 2) {
                  const city = parts[0].trim();
                  const statePin = parts[1].split('-');
                  const state = statePin[0]?.trim() || '';
                  const pinCode = statePin[1]?.trim() || '';
                  onUpdateSender({ ...sender, city, state, pinCode });
                } else {
                  handleSenderChange('city', e.target.value);
                }
              }}
              placeholder="e.g. Mumbai, Maharashtra - 400059"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile</label>
            <input
              type="text"
              value={sender.mobile}
              onChange={(e) => handleSenderChange('mobile', e.target.value)}
              placeholder="e.g. +91 91678 33311"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={sender.email}
              onChange={(e) => handleSenderChange('email', e.target.value)}
              placeholder="e.g. aca@gmail.com.com"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Bill To Section (True Path Foundation / Recipient) */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 border-b border-gray-100 pb-2 mb-3">
          <Building2 size={18} className="text-blue-600" />
          <h3 className="text-sm font-bold text-gray-900 uppercase">
            Bill To (True Path Foundation / Client)
          </h3>
          <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-semibold border border-emerald-200">
            Fixed as in TPFINV_004
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Bill To Name *
            </label>
            <input
              type="text"
              value={billTo.name}
              onChange={(e) => handleBillToChange('name', e.target.value)}
              placeholder="e.g. TRUE PATH FOUNDATION"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">PAN Number</label>
            <input
              type="text"
              value={billTo.pan}
              onChange={(e) => handleBillToChange('pan', e.target.value.toUpperCase())}
              placeholder="e.g. AAJCT7092M"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">GSTIN</label>
            <input
              type="text"
              value={billTo.gstin || ''}
              onChange={(e) => handleBillToChange('gstin', e.target.value.toUpperCase())}
              placeholder="e.g. 07AAJCT7092M1ZB"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Address Line 1</label>
            <input
              type="text"
              value={billTo.addressLine1}
              onChange={(e) => handleBillToChange('addressLine1', e.target.value)}
              placeholder="e.g. 229A, DDA FLATS,"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Address Line 2</label>
            <input
              type="text"
              value={billTo.addressLine2 || ''}
              onChange={(e) => handleBillToChange('addressLine2', e.target.value)}
              placeholder="e.g. POCKET - 12, JASOLA,"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Ship To Section */}
      <div className="pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Truck size={18} className="text-blue-600" />
            <h3 className="text-sm font-bold text-gray-900 uppercase">
              Ship To Details (Optional)
            </h3>
          </div>

          <label className="flex items-center space-x-2 text-xs text-blue-700 font-semibold cursor-pointer bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
            <input
              type="checkbox"
              checked={useSameShipTo}
              onChange={(e) => onToggleSameShipTo(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <Copy size={12} />
            <span>Same as Bill To</span>
          </label>
        </div>

        {!useSameShipTo && shipTo && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Ship To Name
              </label>
              <input
                type="text"
                value={shipTo.name}
                onChange={(e) => handleShipToChange('name', e.target.value)}
                placeholder="Shipping recipient name"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Address 1</label>
              <input
                type="text"
                value={shipTo.addressLine1}
                onChange={(e) => handleShipToChange('addressLine1', e.target.value)}
                placeholder="Shipping address"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Address 2</label>
              <input
                type="text"
                value={shipTo.addressLine2 || ''}
                onChange={(e) => handleShipToChange('addressLine2', e.target.value)}
                placeholder="Pocket / Area"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
