"use client";

import React from "react";
import { PricingCard } from "@/components/pricing/PricingCard";
import { ArrowLeft, Sparkles, Star, Zap, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "9",
      description: "Perfect for freelancers and solo creators.",
      features: [
        "Up to 20 invoices per month",
        "Unlimited custom clients",
        "Email invoice delivery",
        "Standard templates",
        "Subtle branding"
      ],
      ctaText: "Start Starter Plan"
    },
    {
      name: "Pro",
      price: "24",
      description: "For established agencies and growing businesses.",
      features: [
        "Everything in Starter",
        "Unlimited invoices & clients",
        "Automated payment reminders",
        "Custom branding & logo removal",
        "Recurring invoicing",
        "Premium layout pack"
      ],
      isPopular: true,
      ctaText: "Upgrade to Pro"
    },
    {
      name: "Agency",
      price: "79",
      description: "For teams needing scale and team management.",
      features: [
        "Everything in Pro",
        "Up to 5 team members",
        "Multi-brand workspaces",
        "Accountant portal access",
        "Priority 24/7 support",
        "API access (Coming soon)"
      ],
      ctaText: "Contact Sales"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-24 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-[100px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-100/30 rounded-full blur-[100px] translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation */}
        <div className="mb-12 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-slate-500 hover:text-slate-900">
              <ArrowLeft size={18} />
              Back to Editor
            </Button>
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
              <Sparkles size={16} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 font-outfit">
              Invoice<span className="text-indigo-600">Snap</span>
            </span>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold tracking-tight text-slate-900"
          >
            Simple, <span className="text-indigo-600">Transparent</span> Pricing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500"
          >
            Choose the plan that&apos;s right for your business. No hidden fees. No long-term contracts.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, idx) => (
            <PricingCard key={idx} {...plan} />
          ))}
        </div>

        {/* Trust Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-t border-slate-200">
          <div className="flex flex-col items-center text-center gap-3">
             <div className="text-indigo-600 mb-2"><Zap size={24} /></div>
             <h4 className="font-semibold text-slate-900">Instant Setup</h4>
             <p className="text-xs text-slate-500 px-4">Start creating invoices in under 60 seconds. No complex setup.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
             <div className="text-indigo-600 mb-2"><ShieldCheck size={24} /></div>
             <h4 className="font-semibold text-slate-900">Secure Billing</h4>
             <p className="text-xs text-slate-500 px-4">Bank-grade security for your data and your client&apos;s payments.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
             <div className="text-indigo-600 mb-2"><Globe size={24} /></div>
             <h4 className="font-semibold text-slate-900">Multi-Currency</h4>
             <p className="text-xs text-slate-500 px-4">Bill clients globally with support for 135+ world currencies.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
             <div className="text-indigo-600 mb-2"><Star size={24} /></div>
             <h4 className="font-semibold text-slate-900">Premium Output</h4>
             <p className="text-xs text-slate-500 px-4">Dazzle clients with modern, high-fidelity PDF invoice designs.</p>
          </div>
        </div>

        <footer className="mt-20 text-center text-sm text-slate-400">
           <p>© 2026 InvoiceSnap. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
