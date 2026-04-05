"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useInvoice } from "@/lib/store/InvoiceContext";
import { ModernTemplate } from "../pdf/ModernTemplate";
import { Button } from "../ui";
import { Download, Loader2 } from "lucide-react";

// Dynamically import PDFDownloadLink to avoid SSR errors
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="gap-2 bg-indigo-600/50">
        <Loader2 className="h-4 w-4 animate-spin" />
        Preparing...
      </Button>
    ),
  }
);

import { DownloadGate } from "./DownloadGate";

export function PDFDownloadButton() {
  const { invoiceData, totals } = useInvoice();

  const fileName = `${invoiceData.details.invoiceNumber || "invoice"}.pdf`;

  return (
    <DownloadGate>
      <PDFDownloadLink
        document={<ModernTemplate data={invoiceData} totals={totals} />}
        fileName={fileName}
      >
        {({ loading }: { loading: boolean; blob: Blob | null; url: string | null; error: Error | null }) =>
          loading ? (
            <Button disabled className="gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </Button>
          ) : (
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200">
              <Download size={18} />
              Download PDF
            </Button>
          )
        }
      </PDFDownloadLink>
    </DownloadGate>
  );
};
