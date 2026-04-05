"use client";

import { signOut } from "next-auth/react";
import { LogOut, User as UserIcon, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 font-bold overflow-hidden hover:ring-2 hover:ring-indigo-500 transition-all"
      >
        {user.image ? (
          <img src={user.image} alt={user.name || "User"} className="w-full h-full object-cover" />
        ) : (
          <span>{user.name?.[0] || user.email?.[0] || "?"}</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in duration-200">
          <div className="px-3 py-3 border-b border-slate-50 mb-1">
            <p className="text-sm font-bold text-slate-900 truncate">{user.name || "User"}</p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>
          
          <Link 
            href="/dashboard" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <UserIcon size={16} /> My Dashboard
          </Link>
          <Link 
            href="/settings" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <Settings size={16} /> Settings
          </Link>
          
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
