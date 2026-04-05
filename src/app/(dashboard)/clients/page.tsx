import { getClients, createClient, deleteClient, getInvoices } from "@/lib/actions";
import { Users, Plus, Trash2, Search, Mail, MapPin, ExternalLink, Receipt } from "lucide-react";
import { Button, Input } from "@/components/ui";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ClientsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const [allClients, allInvoices] = await Promise.all([
    getClients(),
    getInvoices()
  ]);

  const query = resolvedSearchParams.q?.toLowerCase() || "";
  const clients = allClients.filter((c: any) => 
    c.name.toLowerCase().includes(query) || 
    c.email.toLowerCase().includes(query)
  );

  const getClientStats = (clientId: string) => {
    const clientInvoices = allInvoices.filter((inv: any) => inv.clientId?._id === clientId || inv.clientId === clientId);
    const total = clientInvoices.reduce((acc: number, inv: any) => {
      const invTotal = inv.items?.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice * (1 + (item.taxRate || 0) / 100)), 0) || 0;
      return acc + invTotal;
    }, 0);
    return { count: clientInvoices.length, total };
  };

  async function handleCreateClient(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;
    if (!name || !email) return;

    await createClient({ name, email, address, tags: [] });
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-outfit text-slate-900">Clients</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your customer relationships and billing history.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <form action="/clients" method="GET">
              <input 
                name="q"
                defaultValue={query}
                placeholder="Search clients..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
              />
            </form>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {clients.length === 0 ? (
            <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200">
                <Users size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">No clients found</h3>
              <p className="text-slate-500 max-w-xs mx-auto">
                {query ? `No results for "${query}". Try a different search.` : "Add your first client to start creating professional invoices."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clients.map((client: any) => {
                const stats = getClientStats(client._id);
                return (
                  <div key={client._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <form action={async () => {
                         "use server";
                         await deleteClient(client._id);
                      }}>
                         <button className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all">
                           <Trash2 size={18} />
                         </button>
                      </form>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-lg font-outfit uppercase">
                        {client.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-outfit">{client.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                           <Mail size={12} />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Invoiced</p>
                          <p className="text-sm font-bold text-slate-900 font-outfit">${stats.total.toLocaleString()}</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Invoices</p>
                          <p className="text-sm font-bold text-slate-900 font-outfit">{stats.count}</p>
                       </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                      <Link href={`/new?clientId=${client._id}`} className="flex-1">
                        <Button className="w-full gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-none shadow-none font-bold rounded-xl text-xs h-11 transition-all">
                          <Receipt size={16} />
                          Create Invoice
                        </Button>
                      </Link>
                      <button className="text-slate-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-all ml-auto">
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {client.address && (
                      <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                        <MapPin size={14} className="mt-0.5 shrink-0 text-slate-300" />
                        <p className="line-clamp-2">{client.address}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl shadow-slate-100 sticky top-24">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-100">
                 <Plus size={20} />
              </div>
              <h2 className="text-xl font-bold font-outfit text-slate-900">Add New Client</h2>
            </div>
            
            <form action={handleCreateClient} className="space-y-5">
              <Input 
                name="name" 
                label="Client Name" 
                placeholder="e.g. Acme Corporation" 
                required 
              />
              <Input 
                name="email" 
                label="Billing Email" 
                type="email" 
                placeholder="billing@acme.com" 
                required 
              />
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 ml-1">Company Address</label>
                <textarea 
                  name="address" 
                  rows={3} 
                  className="w-full h-24 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all font-medium placeholder:text-slate-400 focus:bg-white"
                  placeholder="Street address, City, Country..." 
                />
              </div>
              <Button type="submit" size="lg" className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold h-14 shadow-xl shadow-indigo-100">
                Save Client Information
              </Button>
            </form>

            <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-1">Quick Tip</p>
               <p className="text-xs text-slate-500 text-center leading-relaxed font-medium">Adding clients allows you to quickly select them when creating new invoices.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
