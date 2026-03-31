"use client";

import React, { useState } from "react";
import { Menu, X, Sparkles, BookOpen, CreditCard, HelpCircle, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const menuItems = [
    { title: "Invoice Editor", href: "/", icon: <BookOpen size={20} /> },
    { title: "Pricing Plans", href: "/pricing", icon: <CreditCard size={20} /> },
    { title: "Help & Support", href: "#", icon: <HelpCircle size={20} /> },
    { title: "Feedback", href: "#", icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={toggle}
        className="p-2 transition-colors hover:bg-slate-100 rounded-lg text-slate-600"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggle}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />

            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <Sparkles size={16} />
                  </div>
                  <span className="font-bold text-lg text-slate-900 font-outfit">
                    Invoice<span className="text-indigo-600">Snap</span>
                  </span>
                </div>
                <button
                  onClick={toggle}
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 p-6 space-y-4">
                {menuItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={toggle}
                    className="flex items-center gap-4 p-4 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all font-medium"
                  >
                    <div className="text-slate-400 group-hover:text-indigo-500">{item.icon}</div>
                    {item.title}
                  </Link>
                ))}
              </nav>

              <div className="p-6 border-t border-slate-100 space-y-4">
                <Button className="w-full py-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 h-auto">
                  Create Free Invoice
                </Button>
                <p className="text-center text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
                  Secure & Instant
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
