import type { Metadata } from "next";
import "./globals.css";
import { InvoiceProvider } from "@/lib/store/InvoiceContext";
import { AuthProvider } from "@/components/providers/AuthProvider";

// Mock font variables since build env is offline and cannot fetch from Google Fonts
const inter = { variable: "font-inter" };
const outfit = { variable: "font-outfit" };

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
      <body className={`${inter.variable} ${outfit.variable} font-sans text-slate-900 antialiased`}>
        <AuthProvider>
          <InvoiceProvider>
            {children}
          </InvoiceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
