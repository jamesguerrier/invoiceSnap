"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Clock, 
  ShieldCheck,
  FileText,
  BarChart3,
  Download
} from "lucide-react";
import { Button } from "@/components/ui";
import { useSession } from "next-auth/react";
import { UserMenu } from "@/components/layout/UserMenu";

export default function LandingPage() {
  const { data: session, status: sessionStatus } = useSession();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100 px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-all">
            <Sparkles size={22} />
          </div>
          <span className="font-bold text-2xl tracking-tight text-slate-900 font-outfit">
            Invoice<span className="text-indigo-600">Snap</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-slate-600 font-bold">
          <a href="#features" className="text-sm hover:text-indigo-600 transition-colors">Features</a>
          <a href="#pricing" className="text-sm hover:text-indigo-600 transition-colors">Pricing</a>
          <Link href="/new" className="text-sm hover:text-indigo-600 transition-colors">Free Editor</Link>
        </nav>

        <div className="flex items-center gap-4">
          {sessionStatus === "loading" ? (
             <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse"></div>
          ) : session?.user ? (
            <>
              <Link href="/dashboard" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="font-bold text-slate-600 hover:text-indigo-600">Dashboard</Button>
              </Link>
              <UserMenu user={session.user} />
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="font-bold text-slate-600 hidden sm:flex">Log in</Button>
              </Link>
              <Link href="/new">
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 h-11 px-6 rounded-xl font-bold">
                  Create Invoice
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold tracking-wide uppercase mb-6 border border-indigo-100">
              <Zap size={14} className="fill-indigo-700" />
              Revolutionizing Billing
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 font-outfit tracking-tight">
              Professional Invoices <br />
              <span className="text-indigo-600">in 60 Seconds.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop messing with Word docs. Create, preview, and download stunning invoices instantly. 
              Built for freelancers, agencies, and modern business.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/new">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 h-14 shadow-xl shadow-indigo-200 group rounded-2xl font-bold">
                  Start Billing for Free
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                <ShieldCheck size={18} className="text-emerald-500" />
                No registration required to start
              </div>
            </div>
          </motion.div>

          {/* Product Preview Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative max-w-5xl mx-auto bg-slate-900 rounded-2xl p-2 shadow-2xl border border-slate-800"
          >
             <div className="bg-slate-800 rounded-xl overflow-hidden aspect-[16/10] relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800/50 to-indigo-500/10"></div>
                <div className="absolute top-4 left-6 flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                   <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                   <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                </div>
                <div className="flex h-full w-full pt-10">
                   <Image 
                     src="/preview-image.png" 
                     alt="InvoiceSnap Application Preview" 
                     width={1200} 
                     height={800} 
                     className="w-full h-auto object-cover rounded-tl-xl rounded-tr-xl shadow-2xl" 
                     priority
                   />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-slate-900 mb-4">Everything you need to get paid.</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Simple controls, powerful output. Focus on your work, we'll handle the paperwork.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="text-indigo-600" />}
              title="Instant Preview"
              description="See exactly what your client will see with our real-time WYSIWYG editor."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-indigo-600" />}
              title="Locally Persisted"
              description="Your draft is saved in your browser. No data lost if you refresh."
            />
            <FeatureCard 
              icon={<FileText className="text-indigo-600" />}
              title="Professional PDF"
              description="Clean, modern templates designed to look great in any inbox."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-indigo-600" />}
              title="Client CRM"
              description="Save client details once and reuse them for all future invoices."
            />
            <FeatureCard 
              icon={<Download className="text-indigo-600" />}
              title="One-Click Export"
              description="Generate and download high-quality PDFs in under 2 seconds."
            />
            <FeatureCard 
              icon={<Clock className="text-indigo-600" />}
              title="History Tracking"
              description="Keep track of all sent invoices and their status in one clean dashboard."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold font-outfit text-slate-900 mb-4">Simple, transparent pricing.</h2>
          <p className="text-slate-500 mb-16">Choose the plan that fits your business scale.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-slate-100">
               <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 block">Free</span>
               <div className="text-5xl font-bold text-slate-900 mb-8">$0<span className="text-lg text-slate-400 font-normal">/mo</span></div>
               <ul className="text-left space-y-4 mb-10">
                  <PricingItem text="Public Invoice Editor" />
                  <PricingItem text="Real-time PDF Preview" />
                  <PricingItem text="2 Downloads per month" />
                  <PricingItem text="Local client browser saves" />
               </ul>
               <Link href="/new">
                 <Button variant="secondary" className="w-full h-12 rounded-xl text-indigo-600 border-indigo-100 hover:bg-indigo-50 font-bold">Get Started</Button>
               </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-slate-900 rounded-3xl p-10 border border-slate-800 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4">
                  <div className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
               </div>
               <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 block">Pro</span>
               <div className="text-5xl font-bold text-white mb-8">$9<span className="text-lg text-slate-400 font-normal">/mo</span></div>
               <ul className="text-left space-y-4 mb-10">
                  <PricingItem text="Everything in Free" dark />
                  <PricingItem text="Unlimited PDF Downloads" dark />
                  <PricingItem text="Full Client CRM & History" dark />
                  <PricingItem text="Cloud Sync across devices" dark />
                  <PricingItem text="Priority Support" dark />
               </ul>
               <Button className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-900/20 border-none group-hover:scale-[1.02] transition-transform font-bold">Get Unlimited Access</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-16 text-slate-400 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <Sparkles size={18} />
                </div>
                <span className="font-bold text-xl tracking-tight text-white font-outfit">
                  Invoice<span className="text-indigo-600">Snap</span>
                </span>
             </div>
             <p className="max-w-xs leading-relaxed">Making professional billing effortless for freelancers and modern businesses worldwide.</p>
          </div>
          <div>
             <h4 className="text-white font-bold mb-6">Product</h4>
             <ul className="space-y-4">
                <li><Link href="/new" className="hover:text-white transition-colors">Free Editor</Link></li>
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
             </ul>
          </div>
          <div>
             <h4 className="text-white font-bold mb-6">Company</h4>
             <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 text-sm flex flex-col md:flex-row justify-between items-center gap-6">
           <p>© 2026 InvoiceSnap Inc. All rights reserved.</p>
           <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
           </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

function PricingItem({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <li className="flex items-center gap-3">
      <CheckCircle2 size={18} className={dark ? "text-indigo-400" : "text-emerald-500"} />
      <span className={dark ? "text-slate-300" : "text-slate-600"}>{text}</span>
    </li>
  );
}
