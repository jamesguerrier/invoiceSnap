import { LineItem, InvoiceTotals } from "../types/invoice";

export function calculateInvoiceTotals(items: LineItem[]): InvoiceTotals {
  const subtotal = items.reduce((acc, item) => {
    return acc + item.quantity * item.unitPrice;
  }, 0);

  const taxTotal = items.reduce((acc, item) => {
    const itemSubtotal = item.quantity * item.unitPrice;
    return acc + itemSubtotal * (item.taxRate / 100);
  }, 0);

  return {
    subtotal,
    taxTotal,
    discountTotal: 0, // Placeholder for Phase 1
    total: subtotal + taxTotal,
  };
}
