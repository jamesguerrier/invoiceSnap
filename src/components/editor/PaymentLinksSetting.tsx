"use client";

import React from "react";
import { useInvoice } from "@/lib/store/InvoiceContext";
import { Input, Button } from "@/components/ui";
import { Link as LinkIcon, Trash2, Plus, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PaymentLinksSetting() {
  const { invoiceData, addPaymentLink, updatePaymentLink, removePaymentLink } = useInvoice();
  const paymentLinks = invoiceData.paymentLinks || [];

  return (
    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 border-dashed space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800 font-semibold">
          <LinkIcon size={18} />
          <h2>Payment Links & QR Codes</h2>
        </div>
        {paymentLinks.length < 2 && (
          <Button 
            onClick={addPaymentLink} 
            variant="secondary" 
            size="sm" 
            className="gap-2 text-indigo-600 bg-white border-indigo-100 hover:bg-indigo-50"
          >
            <Plus size={16} /> 
            Add Link
          </Button>
        )}
      </div>

      <p className="text-sm text-slate-500">
        Add up to 2 payment links (e.g. PayPal, Stripe). They will appear on your PDF invoice.
      </p>

      <div className="space-y-4">
        <AnimatePresence>
          {paymentLinks.map((link, idx) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4 relative"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Payment Link {idx + 1}
                </span>
                <button
                  onClick={() => removePaymentLink(link.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors bg-slate-50 p-1.5 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Label (e.g., Pay with Stripe)"
                  placeholder="Pay via Credit Card"
                  value={link.label}
                  onChange={(e) => updatePaymentLink(link.id, "label", e.target.value)}
                />
                <Input
                  label="URL"
                  placeholder="https://..."
                  value={link.url}
                  onChange={(e) => updatePaymentLink(link.id, "url", e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <QrCode size={16} className={link.showQr ? "text-indigo-500" : "text-slate-400"} />
                  <span className="text-sm font-medium text-slate-600">Show QR Code on PDF</span>
                </div>
                
                {/* Custom Toggle Switch */}
                <button
                  type="button"
                  onClick={() => updatePaymentLink(link.id, "showQr", !link.showQr)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    link.showQr ? "bg-indigo-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      link.showQr ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {paymentLinks.length === 0 && (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl bg-white/50 text-slate-400 text-sm">
          No payment links added yet.
        </div>
      )}
    </div>
  );
}
