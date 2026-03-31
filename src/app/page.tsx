"use client";

import React from "react";
import { InvoiceForm } from "@/components/editor/InvoiceForm";
import { PDFViewerWrapper } from "@/components/preview/PDFViewerWrapper";
import { PDFDownloadButton } from "@/components/preview/PDFDownloadButton";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";
import { Edit2, Eye } from "lucide-react";

export default function HomePage() {
  const [viewMode, setViewMode] = React.useState<"edit" | "preview">("edit");
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col pt-4 sm:pt-0">
      {/* Navbar / Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Sparkles size={18} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 font-outfit">
            Invoice<span className="text-indigo-600">Snap</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/pricing">
            <Button variant="ghost" className="hidden sm:flex gap-2">
              Pricing
            </Button>
          </Link>
          <div className="hidden sm:block">
            <PDFDownloadButton />
          </div>
          <MobileNav />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row pt-20 px-4 md:px-0 max-w-[1920px] mx-auto w-full">
        {/* Left Panel: Editor */}
        <section className={`flex-1 md:h-[calc(100vh-80px)] md:overflow-y-auto px-4 md:px-12 py-8 scroll-smooth scrollbar-hide ${
          viewMode === "preview" ? "hidden md:block" : "block"
        }`}>
          <div className="max-w-4xl mx-auto">
            <InvoiceForm />
            
            {/* Footer sections (Social proof / Info) below the fold */}
            <footer className="mt-12 py-12 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm text-slate-400">
              <div className="space-y-4">
                <p>© 2026 InvoiceSnap. Your data stays in your browser.</p>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-slate-600">Terms</a>
                  <a href="#" className="hover:text-slate-600">Privacy</a>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-2">
                <p>Built for the modern freelancer.</p>
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm" className="h-auto p-0">Blog</Button>
                  <Button variant="ghost" size="sm" className="h-auto p-0">Changelog</Button>
                </div>
              </div>
            </footer>
          </div>
        </section>

        {/* Right Panel: Live Preview */}
        <section className={`flex-1 bg-slate-100/50 p-4 md:p-12 border-l border-slate-200 items-start sticky top-20 h-[calc(100vh-80px)] ${
          viewMode === "edit" ? "hidden md:flex" : "flex"
        }`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Instant Preview</span>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-full border border-slate-200 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">WYSIWYG</span>
              </div>
            </div>
            <PDFViewerWrapper />
          </motion.div>
        </section>

        {/* Mobile Toggle Bar / Preview (Optional mobile layout element) */}
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center bg-white rounded-full border border-slate-200 shadow-2xl p-1 gap-1">
           <button
             onClick={() => setViewMode("edit")}
             className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
               viewMode === "edit" 
                 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                 : "text-slate-500 hover:text-slate-900"
             }`}
           >
             <Edit2 size={16} />
             Edit
           </button>
           <button
             onClick={() => setViewMode("preview")}
             className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
               viewMode === "preview" 
                 ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                 : "text-slate-500 hover:text-slate-900"
             }`}
           >
             <Eye size={16} />
             Preview
           </button>
           <div className="w-px h-6 bg-slate-200 mx-1"></div>
           <PDFDownloadButton />
        </div>
      </div>
    </main>
  );
}
