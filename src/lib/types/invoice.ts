export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export interface InvoiceData {
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
}

export interface InvoiceTotals {
  subtotal: number;
  taxTotal: number;
  discountTotal: number;
  total: number;
}
