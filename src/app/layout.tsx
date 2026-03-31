import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { InvoiceProvider } from "@/lib/store/InvoiceContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "InvoiceSnap — Professional Invoices in 60 Seconds",
  description: "Create, preview, and download professional invoices instantly. No registration required. High-speed billing for freelancers and agencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-slate-900 bg-slate-50`}>
        <InvoiceProvider>
          {children}
        </InvoiceProvider>
      </body>
    </html>
  );
}
