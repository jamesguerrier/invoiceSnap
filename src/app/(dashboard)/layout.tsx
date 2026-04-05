import Link from "next/link";
import { LayoutDashboard, Users, Sparkles } from "lucide-react";
import { auth } from "@/auth";
import { UserMenu } from "@/components/layout/UserMenu";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const headerList = await headers();
  const pathname = headerList.get("x-invoke-path") || "/dashboard";

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Clients", href: "/clients", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-16">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
              <Sparkles size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 font-outfit">
              Invoice<span className="text-indigo-600">Snap</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link key={link.name} href={link.href} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive ? "bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-50" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}>
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {session?.user && (
            <UserMenu user={session.user} />
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
