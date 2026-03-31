"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";
import { motion } from "framer-motion";

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  isPopular = false,
  ctaText = "Get Started",
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`relative flex flex-col p-8 bg-white rounded-3xl border-2 transition-all duration-300 ${
        isPopular
          ? "border-indigo-600 shadow-xl shadow-indigo-100 scale-105 z-10"
          : "border-slate-100 shadow-sm hover:border-slate-200"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg shadow-indigo-200">
          <Sparkles size={12} />
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{name}</h3>
        <p className="text-slate-500 text-sm">{description}</p>
      </div>

      <div className="mb-8 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-slate-900 tracking-tight">${price}</span>
        <span className="text-slate-400 font-medium">/mo</span>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 group">
            <div className="mt-1 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <Check size={12} strokeWidth={3} />
            </div>
            <span className="text-slate-600 text-sm leading-tight">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={isPopular ? "primary" : "secondary"}
        className={`w-full py-6 rounded-2xl ${
          isPopular ? "bg-indigo-600 hover:bg-indigo-700" : ""
        }`}
      >
        {ctaText}
      </Button>
    </motion.div>
  );
}
