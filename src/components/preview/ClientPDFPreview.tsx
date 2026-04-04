"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInvoice } from "@/lib/store/InvoiceContext";
import { ModernTemplate } from "../pdf/ModernTemplate";
import { Loader2 } from "lucide-react";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { usePDF } from "@react-pdf/renderer";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ClientPDFPreview() {
  const { invoiceData, totals } = useInvoice();
  const debouncedInvoiceData = useDebounce(invoiceData, 400);
  const debouncedTotals = useDebounce(totals, 400);
  
  const [numPages, setNumPages] = useState<number>();
  const [containerWidth, setContainerWidth] = useState<number>(600);
  const containerRef = useRef<HTMLDivElement>(null);

  const [instance, updateInstance] = usePDF({
    document: <ModernTemplate data={debouncedInvoiceData} totals={debouncedTotals} />
  });

  useEffect(() => {
    updateInstance(<ModernTemplate data={debouncedInvoiceData} totals={debouncedTotals} />);
  }, [debouncedInvoiceData, debouncedTotals, updateInstance]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // Leave some padding
        setContainerWidth(Math.max(containerRef.current.clientWidth - 32, 280));
      }
    };
    
    // Initial width
    updateWidth();
    
    // Small timeout to ensure DOM is fully painted
    const timeout = setTimeout(updateWidth, 100);
    
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timeout);
    };
  }, []);

  if (!instance.url) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] w-full bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Generating instant preview...</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="h-[calc(100vh-100px)] w-full rounded-2xl overflow-y-auto overflow-x-hidden shadow-2xl border border-slate-200 bg-slate-200/50 custom-scrollbar relative flex flex-col items-center py-8"
    >
      {instance.loading && (
        <div className="fixed top-24 right-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm z-10 border border-slate-200 transition-opacity">
          <Loader2 className="h-4 w-4 text-indigo-600 animate-spin" />
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">Updating</span>
        </div>
      )}
      
      <Document
         file={instance.url}
         onLoadSuccess={({ numPages }) => setNumPages(numPages)}
         loading={null}
         className="flex flex-col items-center gap-6"
      >
        {Array.from(new Array(numPages || 0), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-md rounded-sm overflow-hidden bg-white"
            width={containerWidth}
          />
        ))}
      </Document>
    </div>
  );
}
