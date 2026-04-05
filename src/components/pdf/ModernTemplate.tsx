"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { InvoiceData, InvoiceTotals } from "@/lib/types/invoice";

// Register fonts if needed, or use defaults
// Font.register({ family: 'Inter', src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2' });

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    color: "#334155",
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 8,
    color: "#64748b",
    textTransform: "uppercase",
    marginBottom: 4,
    fontWeight: "bold",
  },
  value: {
    fontSize: 10,
    color: "#1e293b",
  },
  grid: {
    flexDirection: "row",
    gap: 40,
    marginBottom: 40,
  },
  table: {
    marginTop: 20,
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 8,
    marginBottom: 12,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  colDesc: { width: "50%" },
  colQty: { width: "15%", textAlign: "center" },
  colPrice: { width: "20%", textAlign: "right" },
  colTotal: { width: "15%", textAlign: "right" },
  totalsSection: {
    marginTop: 30,
    marginLeft: "auto",
    width: "40%",
    gap: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderTopColor: "#e2e8f0",
    paddingTop: 12,
    marginTop: 8,
  },
  grandTotalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e293b",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 20,
  },
  watermark: {
    fontSize: 8,
    color: "#94a3b8",
    marginTop: 10,
  }
});

interface ModernTemplateProps {
  data: InvoiceData;
  totals: InvoiceTotals;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, totals }) => {
  const brandColor = data.sender.color || "#4f46e5";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: brandColor }]}>INVOICE</Text>
            <Text style={{ marginTop: 4, color: "#64748b" }}>#{data.details.invoiceNumber}</Text>
          </View>
          <View style={{ textAlign: "right" }}>
            <Text style={{ fontSize: 12, fontWeight: "bold" }}>{data.sender.name}</Text>
            <Text style={{ color: "#64748b", marginTop: 2 }}>{data.sender.email}</Text>
            <Text style={{ color: "#64748b" }}>{data.sender.address}</Text>
          </View>
        </View>

        {/* Info Grid */}
        <View style={styles.grid}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Bill To</Text>
            <Text style={{ fontWeight: "bold", fontSize: 11 }}>{data.client.name}</Text>
            <Text style={{ color: "#64748b", marginTop: 2 }}>{data.client.email}</Text>
            <Text style={{ color: "#64748B" }}>{data.client.address}</Text>
          </View>
          <View style={{ flex: 1, textAlign: "right" }}>
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.label}>Issue Date</Text>
              <Text>{data.details.issueDate}</Text>
            </View>
            <View>
              <Text style={styles.label}>Due Date</Text>
              <Text style={{ fontWeight: "bold" }}>{data.details.dueDate}</Text>
            </View>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.label, styles.colDesc]}>Description</Text>
            <Text style={[styles.label, styles.colQty]}>Qty</Text>
            <Text style={[styles.label, styles.colPrice]}>Price</Text>
            <Text style={[styles.label, styles.colTotal]}>Total</Text>
          </View>

          {data.items.map((item) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.colDesc}>{item.description || "No description"}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>
                {item.unitPrice.toLocaleString("en-US", { style: "currency", currency: data.details.currency })}
              </Text>
              <Text style={styles.colTotal}>
                {(item.quantity * item.unitPrice).toLocaleString("en-US", { style: "currency", currency: data.details.currency })}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={{ color: "#64748b" }}>Subtotal</Text>
            <Text>{totals.subtotal.toLocaleString("en-US", { style: "currency", currency: data.details.currency })}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={{ color: "#64748b" }}>Tax Total</Text>
            <Text>{totals.taxTotal.toLocaleString("en-US", { style: "currency", currency: data.details.currency })}</Text>
          </View>
          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalText}>Total</Text>
            <Text style={[styles.grandTotalText, { color: brandColor }]}>
              {totals.total.toLocaleString("en-US", { style: "currency", currency: data.details.currency })}
            </Text>
          </View>
        </View>

        {/* Notes */}
        {data.notes && (
          <View style={{ marginTop: 40 }}>
            <Text style={styles.label}>Notes</Text>
            <Text style={{ color: "#64748b", lineHeight: 1.5 }}>{data.notes}</Text>
          </View>
        )}

        {/* Payment QR Codes */}
        {data.paymentLinks && data.paymentLinks.length > 0 && (
          <View style={{ marginTop: 30, flexDirection: "row", gap: 30 }}>
            {data.paymentLinks.map((link) => 
              link.showQr && link.url ? (
                <View key={link.id} style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 10, marginBottom: 8, color: "#1e293b", fontWeight: "bold" }}>
                    {link.label || "Payment Link"}
                  </Text>
                  <Image 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(link.url)}`}
                    style={{ width: 80, height: 80 }}
                  />
                </View>
              ) : null
            )}
          </View>
        )}

        {/* Footer & Watermark */}
        <View style={styles.footer}>
          <Text style={{ color: "#64748b" }}>Thank you for your business!</Text>
          <Text style={styles.watermark}>Powered by InvoiceSnap — Professional Invoices in Seconds</Text>
        </View>
      </Page>
    </Document>
  );
};
