import { getInvoices, deleteInvoice, getDownloadStatus, togglePlan, getDashboardStats } from "@/lib/actions";
import Link from "next/link";
import { FileText, Plus, Trash2, Zap, Crown, TrendingUp, Users, Receipt, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui";

export const dynamic = "force-dynamic";

function StatCard({ title, value, icon: Icon, description, trend }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
          <Icon size={24} />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <ArrowUpRight size={14} />
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-slate-500 mb-1">{title}</h3>
      <div className="text-2xl font-bold text-slate-900 font-outfit">{value}</div>
      <p className="text-xs text-slate-400 mt-2">{description}</p>
    </div>
  );
}

export default async function DashboardPage() {
  const invoices = await getInvoices();
  const status = await getDownloadStatus();
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8 pb-12">
      {/* Plan Status Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 rounded-2xl p-8 text-white shadow-xl shadow-indigo-200/50 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner border border-white/20">
            {status.plan === "FREE" ? <Zap size={32} /> : <Crown size={32} />}
          </div>
          <div>
            <div className="flex items-center gap-3">
               <h2 className="text-2xl font-bold font-outfit tracking-tight">Your {status.plan} Plan</h2>
               {status.plan === "ADMIN" && (
                 <span className="bg-amber-400 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Admin Access</span>
               )}
            </div>
            <p className="text-indigo-100 mt-1 font-medium">
              {status.remaining === -1 
                ? "Enjoy unlimited professional PDF downloads." 
                : `You've used ${2 - (status.remaining ?? 0)}/2 free downloads this month.`}
            </p>
          </div>
        </div>

        <div className="relative z-10">
          {status.plan === "FREE" && (
            <form action={async () => {
              "use server";
              await togglePlan("PAID");
            }}>
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold px-10 h-14 rounded-xl shadow-2xl hover:scale-105 transition-all">
                Upgrade to Pro
              </Button>
            </form>
          )}
          {(status.plan === "PAID") && (
             <form action={async () => {
              "use server";
              await togglePlan("FREE");
            }}>
              <Button size="sm" variant="ghost" className="text-indigo-100 hover:text-white hover:bg-white/10 text-xs opacity-50">
                Downgrade (Testing)
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Invoiced" 
          value={`$${stats.totalInvoiced.toLocaleString()}`} 
          icon={TrendingUp} 
          description="Lifetime revenue across all invoices"
          trend="+12.5%" 
        />
        <StatCard 
          title="Active Clients" 
          value={stats.clientCount} 
          icon={Users} 
          description="Total clients in your directory" 
        />
        <StatCard 
          title="Invoices Sent" 
          value={stats.invoiceCount} 
          icon={Receipt} 
          description="Total PDF invoices generated" 
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
            Recent Invoices
            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">{invoices.length} Total</span>
          </h2>
          <Link href="/new">
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 rounded-xl">
              <Plus size={18} /> New Invoice
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {invoices.length === 0 ? (
            <div className="py-24 text-center px-6">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
                <FileText size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">No invoices yet</h3>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">Create your first professional invoice in seconds and start getting paid faster.</p>
              <Link href="/new">
                <Button size="lg" className="px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 h-14 font-bold shadow-xl shadow-indigo-100">
                  Create First Invoice
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <th className="py-4 px-6">Invoice #</th>
                    <th className="py-4 px-6">Client</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices.map((inv: any) => (
                    <tr key={inv._id} className="group hover:bg-slate-50/80 transition-colors">
                      <td className="py-5 px-6 font-bold text-slate-900 font-outfit">{inv.invoiceNumber}</td>
                      <td className="py-5 px-6">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-700">{inv.clientId?.name || "Self-Service"}</span>
                          <span className="text-[10px] text-slate-400">{inv.clientId?.email || "No email"}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6 text-sm text-slate-500 font-medium">{new Date(inv.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td className="py-5 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          inv.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <form action={async () => {
                            "use server";
                            await deleteInvoice(inv._id);
                          }}>
                            <button className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all">
                              <Trash2 size={16} />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
