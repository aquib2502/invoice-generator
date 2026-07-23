export type DocumentType = 'INVOICE' | 'CHALLAN' | 'QUOTATION';

export interface PartyDetails {
  name: string;
  pan: string;
  gstin?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  mobile: string;
  email: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface DocumentCalculations {
  subtotal: number;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  discountAmount: number;
  taxType: 'percentage' | 'flat';
  taxValue: number;
  taxAmount: number;
  taxLabel: string;
  additionalCharges: number;
  additionalChargesLabel: string;
  grandTotal: number;
  amountPaid: number;
  balancePayable: number;
  paymentStatus: 'PAID' | 'PARTIALLY_PAID' | 'UNPAID';
}

export interface PaymentDetailsConfig {
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch?: string;
  upiId?: string;
  showPaymentDetails: boolean;
}

export interface DocumentMeta {
  documentType: DocumentType;
  documentNumber: string;
  issueDate: string;
  dueDate: string;
  referenceNo?: string;
  subject?: string;
  notes: string;
  terms: string[];
}

export interface DocumentData {
  meta: DocumentMeta;
  sender: PartyDetails;
  billTo: PartyDetails;
  shipTo?: PartyDetails;
  useSameShipTo: boolean;
  items: DocumentItem[];
  calculations: DocumentCalculations;
  paymentDetails: PaymentDetailsConfig;
}

export interface TPFDetails {
  name: string;
  pan: string;
  gstin?: string;
  addressLine1: string;
  addressLine2: string;
  cityStatePin: string;
}
