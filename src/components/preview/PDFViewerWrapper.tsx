"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import the custom ClientPreview using react-pdf
const ClientPreview = dynamic(
  () => import("./ClientPDFPreview"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] w-full bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Generating instant preview...</p>
      </div>
    ),
  }
);

export function PDFViewerWrapper() {
  return <ClientPreview />;
}
