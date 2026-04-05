export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export interface PaymentLink {
  id: string;
  label: string;
  url: string;
  showQr: boolean;
}

export interface InvoiceData {
  id?: string;
  sender: {
    name: string;
    email: string;
    address: string;
    logo?: string;
    color: string;
  };
  client: {
    name: string;
    email: string;
    address: string;
  };
  details: {
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    currency: string;
  };
  items: LineItem[];
  notes: string;
  paymentLinks?: PaymentLink[];
}

export interface InvoiceTotals {
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  total: number;
}
