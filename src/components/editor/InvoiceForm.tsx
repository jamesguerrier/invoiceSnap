"use client";

import React, { useEffect, useState } from "react";
import { useInvoice } from "@/lib/store/InvoiceContext";
import { Input, Button } from "@/components/ui";
import { LineItemsTable } from "./LineItemsTable";
import { User, Building, FileText, Settings, Download, Palette } from "lucide-react";
import { motion } from "framer-motion";

export function InvoiceForm() {
  const { invoiceData, updateSender, updateClient, updateDetails, totals } = useInvoice();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className="h-screen flex items-center justify-center text-slate-400">Loading editor...</div>;
  }

  return (
    <div className="flex flex-col gap-8 pb-32">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Create Invoice
        </h1>
        <p className="text-slate-500">Fill in the details to generate your professional invoice instantly.</p>
      </div>

      {/* Grid for basics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* From Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4"
        >
          <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-2">
            <Building size={18} />
            <h2>Sender Details</h2>
          </div>
          <Input
            label="Company Name"
            placeholder="Your Business LLC"
            value={invoiceData.sender.name}
            onChange={(e) => updateSender("name", e.target.value)}
          />
          <Input
            label="Email Address"
            placeholder="hello@yourbusiness.com"
            value={invoiceData.sender.email}
            onChange={(e) => updateSender("email", e.target.value)}
          />
          <Input
            label="Address"
            placeholder="123 Success Way, City, State"
            value={invoiceData.sender.address}
            onChange={(e) => updateSender("address", e.target.value)}
          />
        </motion.div>

        {/* To Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4"
        >
          <div className="flex items-center gap-2 text-emerald-600 font-semibold mb-2">
            <User size={18} />
            <h2>Bill To</h2>
          </div>
          <Input
            label="Client Name"
            placeholder="Client Company Name"
            value={invoiceData.client.name}
            onChange={(e) => updateClient("name", e.target.value)}
          />
          <Input
            label="Client Email"
            placeholder="billing@client.com"
            value={invoiceData.client.email}
            onChange={(e) => updateClient("email", e.target.value)}
          />
          <Input
            label="Client Address"
            placeholder="456 Client St, City, State"
            value={invoiceData.client.address}
            onChange={(e) => updateClient("address", e.target.value)}
          />
        </motion.div>
      </div>

      {/* Invoice Details */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 max-h-[350px] overflow-y-auto md:max-h-none">
        <div className="flex items-center gap-2 text-slate-800 font-semibold mb-2">
          <FileText size={18} />
          <h2 id="invoice-meta-title">Invoice Meta</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Input
            label="Invoice #"
            value={invoiceData.details.invoiceNumber}
            onChange={(e) => updateDetails("invoiceNumber", e.target.value)}
          />
          <Input
            label="Issue Date"
            type="date"
            value={invoiceData.details.issueDate}
            onChange={(e) => updateDetails("issueDate", e.target.value)}
          />
          <Input
            label="Due Date"
            type="date"
            value={invoiceData.details.dueDate}
            onChange={(e) => updateDetails("dueDate", e.target.value)}
          />
          <Input
            label="Currency"
            value={invoiceData.details.currency}
            onChange={(e) => updateDetails("currency", e.target.value)}
          />
        </div>
      </div>

      {/* Items Section */}
      <LineItemsTable />

      {/* Branding / Settings */}
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 border-dashed space-y-4">
        <div className="flex items-center gap-2 text-slate-800 font-semibold mb-2">
          <Palette size={18} />
          <h2>Branding & Style</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-tight">Brand Color</label>
            <input
              type="color"
              value={invoiceData.sender.color}
              onChange={(e) => updateSender("color", e.target.value)}
              className="w-12 h-12 rounded-lg cursor-pointer border-2 border-white shadow-sm ring-1 ring-slate-200"
            />
          </div>
          <p className="text-sm text-slate-500 max-w-xs">
            This color will be used for accents, subtotals, and headers across your professional PDF.
          </p>
        </div>
      </div>
    </div>
  );
};
