"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useInvoice } from "@/lib/store/InvoiceContext";
import { ModernTemplate } from "../pdf/ModernTemplate";
import { Loader2 } from "lucide-react";
import { useDebounce } from "@/lib/hooks/use-debounce";

// Dynamically import PDFViewer to avoid SSR errors
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center h-full w-full bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Generating instant preview...</p>
      </div>
    ),
  }
);

export function PDFViewerWrapper() {
  const { invoiceData, totals } = useInvoice();
  const debouncedInvoiceData = useDebounce(invoiceData, 400);
  const debouncedTotals = useDebounce(totals, 400);

  return (
    <div className="h-[calc(100vh-100px)] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white group">
      <PDFViewer className="w-full h-full border-none" showToolbar={true}>
        <ModernTemplate data={debouncedInvoiceData} totals={debouncedTotals} />
      </PDFViewer>
    </div>
  );
}
