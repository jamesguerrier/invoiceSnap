"use client";

import React from "react";
import { useInvoice } from "@/lib/store/InvoiceContext";
import { Input, Button } from "@/components/ui";
import { Trash2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const LineItemsTable: React.FC = () => {
  const { invoiceData, addItem, removeItem, updateItem } = useInvoice();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-slate-800">Invoice Items</h3>
        <Button onClick={addItem} size="sm" variant="secondary" className="gap-2">
          <Plus size={16} />
          Add Item
        </Button>
      </div>

      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[40%]">Description</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[15%]">Qty</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[20%]">Price</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[15%]">Tax %</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-[10%]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <AnimatePresence initial={false}>
              {invoiceData.items.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="p-4">
                    <Input
                      placeholder="Item description..."
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      className="border-transparent bg-transparent hover:border-slate-200 focus:bg-white"
                    />
                  </td>
                  <td className="p-4">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)}
                      className="border-transparent bg-transparent hover:border-slate-200 focus:bg-white text-center"
                    />
                  </td>
                  <td className="p-4">
                    <Input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                      className="border-transparent bg-transparent hover:border-slate-200 focus:bg-white text-right"
                    />
                  </td>
                  <td className="p-4 text-center">
                    <Input
                      type="number"
                      value={item.taxRate}
                      onChange={(e) => updateItem(item.id, "taxRate", parseFloat(e.target.value) || 0)}
                      className="border-transparent bg-transparent hover:border-slate-200 focus:bg-white text-center w-16"
                    />
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};
