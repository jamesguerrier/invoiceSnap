"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useInvoice } from "@/lib/store/InvoiceContext";
import { getDownloadStatus, recordDownload, saveInvoice } from "@/lib/actions";
import { Button } from "../ui";
import { Lock, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export function DownloadGate({ children }: { children: React.ReactNode }) {
  const { data: session, status: sessionStatus } = useSession();
  const { invoiceData } = useInvoice();
  const [status, setStatus] = useState<{ canDownload: boolean; reason?: string; remaining?: number } | null>(null);

  useEffect(() => {
    if (session?.user) {
      getDownloadStatus().then(setStatus);
    }
  }, [session]);

  const handleDownloadClick = async (e: React.MouseEvent) => {
    if (!session?.user) {
      e.preventDefault();
      return;
    }

    if (status && !status.canDownload) {
      e.preventDefault();
      return;
    }

    // 1. Record the download (affects limits for free users)
    recordDownload();
    
    // 2. Automatically save as draft/history on download
    try {
      await saveInvoice(invoiceData);
    } catch (err) {
      console.error("Auto-save on download failed:", err);
    }
    
    // 3. Refresh status after a short delay
    setTimeout(() => {
      getDownloadStatus().then(setStatus);
    }, 2000);
  };

  if (sessionStatus === "loading") return <Button disabled variant="secondary" size="sm" className="bg-slate-100"><Loader2 className="animate-spin h-4 w-4" /></Button>;

  if (!session?.user) {
    return (
      <Link href="/login">
        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100">
          <Lock size={16} />
          Sign in to Download
        </Button>
      </Link>
    );
  }

  if (status && !status.canDownload) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Button disabled variant="secondary" className="gap-2 bg-slate-100 opacity-70">
          <AlertCircle size={16} />
          Monthly Limit Reached
        </Button>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Upgrade to Pro for Unlimited</p>
      </div>
    );
  }

  return (
    <div onClick={handleDownloadClick}>
      {children}
      {status && status.remaining !== -1 && (
        <p className="text-center text-[10px] text-slate-400 mt-1 font-medium">
          {status.remaining} free downloads left this month
        </p>
      )}
    </div>
  );
}
