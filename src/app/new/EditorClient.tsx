"use client";

import React from "react";
import { InvoiceForm } from "@/components/editor/InvoiceForm";
import { PDFViewerWrapper } from "@/components/preview/PDFViewerWrapper";
import { PDFDownloadButton } from "@/components/preview/PDFDownloadButton";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Edit2, Eye, LayoutDashboard, Users } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";
import { MobileNav } from "@/components/layout/MobileNav";
import { UserMenu } from "@/components/layout/UserMenu";

interface EditorClientProps {
  session: any;
}

export function EditorClient({ session }: EditorClientProps) {
  const [viewMode, setViewMode] = React.useState<"edit" | "preview">("edit");

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col pt-4 sm:pt-0">
      {/* Navbar / Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
            <Sparkles size={18} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 font-outfit">
            Invoice<span className="text-indigo-600">Snap</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-1">
            {session?.user && (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="font-semibold text-slate-600 flex gap-2 items-center">
                    <LayoutDashboard size={14} />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/clients">
                  <Button variant="ghost" size="sm" className="font-semibold text-slate-600 flex gap-2 items-center">
                    <Users size={14} />
                    Clients
                  </Button>
                </Link>
              </>
            )}
          </nav>
          
          <div className="h-6 w-px bg-slate-200 hidden md:block mx-1"></div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <PDFDownloadButton />
            </div>
            
            {!session?.user ? (
              <Link href="/login">
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100">
                  Sign In
                </Button>
              </Link>
            ) : (
              <UserMenu user={session.user} />
            )}
            
            <MobileNav />
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col pt-16 h-[calc(100vh-4rem)]">
        {/* Mobile View Toggle */}
        <div className="lg:hidden flex p-2 bg-white border-b border-slate-100 sticky top-16 z-40">
          <div className="flex w-full bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode("edit")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${viewMode === "edit" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}
            >
              <Edit2 size={16} /> Edit
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${viewMode === "preview" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}
            >
              <Eye size={16} /> Preview
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left: Form */}
          <div className={`flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50 ${viewMode === "preview" ? "hidden lg:block" : "block"}`}>
            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <header className="mb-8 hidden lg:block">
                  <h1 className="text-3xl font-bold text-slate-900 font-outfit">Create Your Invoice</h1>
                  <p className="text-slate-500 mt-1">Fill in the details below to generate your professional invoice.</p>
                </header>
                <InvoiceForm />
              </motion.div>
            </div>
          </div>

          {/* Right: Preview */}
          <div className={`flex-1 bg-slate-200/50 overflow-hidden relative flex flex-col ${viewMode === "edit" ? "hidden lg:flex" : "flex"}`}>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
              <div className="max-w-[800px] mx-auto min-h-full">
                <PDFViewerWrapper />
              </div>
            </div>
            
            {/* Bottom Actions removed to save memory - using header button instead */}
          </div>
        </div>
      </div>
    </main>
  );
}
