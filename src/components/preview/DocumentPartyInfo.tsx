import React from 'react';
import { PartyDetails } from '../../types/document';

interface DocumentPartyInfoProps {
  billTo: PartyDetails;
  shipTo?: PartyDetails;
  useSameShipTo: boolean;
}

export const DocumentPartyInfo: React.FC<DocumentPartyInfoProps> = ({
  billTo,
  shipTo,
  useSameShipTo,
}) => {
  const renderPartyBlock = (title: string, party: PartyDetails) => {
    if (!party || !party.name) return null;
    return (
      <div className="space-y-0.5 text-xs text-gray-800 leading-snug">
        <h3 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-1">
          {title}:
        </h3>
        <p className="font-extrabold text-xs sm:text-sm text-gray-900 uppercase">{party.name}</p>
        {party.pan && (
          <p className="font-semibold text-gray-800">
            PAN: <span className="font-mono text-gray-900">{party.pan}</span>
          </p>
        )}
        {party.gstin && (
          <p className="font-semibold text-gray-800">
            GSTIN: <span className="font-mono text-gray-900">{party.gstin}</span>
          </p>
        )}
        {party.addressLine1 && <p>{party.addressLine1}</p>}
        {party.addressLine2 && <p>{party.addressLine2}</p>}
        {(party.city || party.state || party.pinCode) && (
          <p className="font-semibold">
            {[party.city, party.state].filter(Boolean).join(', ')}
            {party.pinCode ? ` - ${party.pinCode}` : ''}
          </p>
        )}
      </div>
    );
  };

  const shipToParty = useSameShipTo ? billTo : shipTo;

  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="col-span-1">
        {renderPartyBlock('BILL TO', billTo)}
      </div>

      {shipToParty && (
        <div className="col-span-1">
          {renderPartyBlock('SHIP TO', shipToParty)}
        </div>
      )}
    </div>
  );
};
