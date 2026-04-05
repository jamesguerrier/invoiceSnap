"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { InvoiceData, InvoiceTotals, LineItem } from "../types/invoice";
import { calculateInvoiceTotals } from "../utils/calculate-totals";
import { useSearchParams } from "next/navigation";
import { getClientById } from "../actions";

interface InvoiceContextType {
  invoiceData: InvoiceData;
  totals: InvoiceTotals;
  updateInvoiceData: (path: string, value: string) => void;
  updateSender: (field: keyof InvoiceData["sender"], value: string) => void;
  updateClient: (field: keyof InvoiceData["client"], value: string) => void;
  updateDetails: (field: keyof InvoiceData["details"], value: string) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, field: keyof LineItem, value: string | number) => void;
  setInvoiceData: React.Dispatch<React.SetStateAction<InvoiceData>>;
}

const STORAGE_KEY = "invoice-snap-draft";

const defaultInvoice: InvoiceData = {
  sender: {
    name: "John Doe Design",
    email: "john@doe.design",
    address: "123 Creative St, San Francisco, CA",
    color: "#4f46e5",
  },
  client: {
    name: "Awesome Client",
    email: "billing@awesome.com",
    address: "456 Business Ave, New York, NY",
  },
  details: {
    invoiceNumber: "INV-001",
    issueDate: "",
    dueDate: "",
    currency: "USD",
  },
  items: [
    { id: "1", description: "Standard Service", quantity: 1, unitPrice: 1000, taxRate: 10 },
  ],
  notes: "Thank you for your business!",
};

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(defaultInvoice);
  const [isInitialized, setIsInitialized] = useState(false);
  const searchParams = useSearchParams();
  const clientIdParam = searchParams.get("clientId");

  // Load from localStorage or URL client on mount
  useEffect(() => {
    const init = async () => {
      // 1. Check if a clientId is provided in the URL
      if (clientIdParam) {
        const client = await getClientById(clientIdParam);
        if (client) {
          setInvoiceData(prev => ({
            ...prev,
            client: {
              name: client.name,
              email: client.email,
              address: client.address || "",
            }
          }));
          setIsInitialized(true);
          return;
        }
      }

      // 2. Otherwise load from localStorage
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setInvoiceData(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse saved invoice", e);
        }
      } else {
        // If no saved data, populate today's dates
        const today = new Date().toISOString().split("T")[0];
        const twoWeeksLater = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
        setInvoiceData((prev) => ({
          ...prev,
          details: {
            ...prev.details,
            issueDate: today,
            dueDate: twoWeeksLater,
          },
        }));
      }
      setIsInitialized(true);
    };

    init();
  }, [clientIdParam]); // Rely on clientIdParam change

  // Save to localStorage with debounce
  useEffect(() => {
    if (!isInitialized) return;
    const timeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(invoiceData));
    }, 500);
    return () => clearTimeout(timeout);
  }, [invoiceData, isInitialized]);

  const totals = useMemo(() => calculateInvoiceTotals(invoiceData.items), [invoiceData.items]);

  const updateSender = (field: keyof InvoiceData["sender"], value: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      sender: { ...prev.sender, [field]: value },
    }));
  };

  const updateClient = (field: keyof InvoiceData["client"], value: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      client: { ...prev.client, [field]: value },
    }));
  };

  const updateDetails = (field: keyof InvoiceData["details"], value: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      details: { ...prev.details, [field]: value },
    }));
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Math.random().toString(36).substr(2, 9),
          description: "",
          quantity: 1,
          unitPrice: 0,
          taxRate: 0,
        },
      ],
    }));
  };

  const removeItem = (id: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const updateInvoiceData = (path: string, value: string) => {
    // Simplified update for generic usage
    setInvoiceData((prev) => ({ ...prev, notes: value }));
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoiceData,
        totals,
        updateInvoiceData,
        updateSender,
        updateClient,
        updateDetails,
        addItem,
        removeItem,
        updateItem,
        setInvoiceData,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) throw new Error("useInvoice must be used within InvoiceProvider");
  return context;
};
