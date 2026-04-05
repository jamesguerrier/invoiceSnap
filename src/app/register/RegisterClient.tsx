"use client";

import { useState } from "react";
import { register } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { Sparkles, Loader2, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      await register(formData);
      
      // Auto sign in after registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created, but could not sign in. Please try logging in.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
      >
        <div className="p-8 pb-0 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
              <Sparkles size={20} />
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900 font-outfit">
              Invoice<span className="text-indigo-600">Snap</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 mt-2">Join thousand of professionals</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
            <Input
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-slate-50 border-slate-200 focus:bg-white transition-all h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <Input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-slate-50 border-slate-200 focus:bg-white transition-all h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
            <Input
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="bg-slate-50 border-slate-200 focus:bg-white transition-all h-12 rounded-xl"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-md font-bold shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex gap-2"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
              <>
                <CheckCircle2 size={18} />
                Get Started Free
              </>
            )}
          </Button>

          <div className="text-center pt-4">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-600 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </form>

        <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em] mb-4">What you get</p>
          <div className="flex justify-around items-center gap-4 text-slate-500">
             <div className="flex flex-col items-center gap-1">
                <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
                <span className="text-[10px] font-bold">2 Free Downloads</span>
             </div>
             <div className="flex flex-col items-center gap-1">
                <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
                <span className="text-[10px] font-bold">Client CRM</span>
             </div>
             <div className="flex flex-col items-center gap-1">
                <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
                <span className="text-[10px] font-bold">Cloud Sync</span>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
