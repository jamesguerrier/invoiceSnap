import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import { Button, Input } from "@/components/ui";
import { revalidatePath } from "next/cache";
import { Settings, User as UserIcon, Shield, CreditCard, Zap, Crown } from "lucide-react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await dbConnect();
  const user = await User.findById(session.user.id);

  async function updateProfile(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const session = await auth();
    if (!session?.user?.id) return;

    await dbConnect();
    await User.findByIdAndUpdate(session.user.id, { name });
    revalidatePath("/settings");
  }

  return (
    <div className="max-w-4xl space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold font-outfit text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1 font-medium">Manage your account preferences and subscription.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-1">
          <h2 className="font-bold text-slate-900 flex items-center gap-2">
            <UserIcon size={18} className="text-indigo-600" />
            Profile Information
          </h2>
          <p className="text-sm text-slate-500">Update your account name and email address.</p>
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <form action={updateProfile} className="space-y-4">
            <Input 
              name="name" 
              label="Full Name" 
              defaultValue={user.name} 
              placeholder="Your Name"
            />
            <Input 
              label="Email Address" 
              defaultValue={user.email} 
              disabled 
              className="bg-slate-50 border-dashed"
            />
            <p className="text-[10px] text-slate-400 font-medium italic">Email cannot be changed yet.</p>
            <div className="pt-2">
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-1">
          <h2 className="font-bold text-slate-900 flex items-center gap-2">
            <Zap size={18} className="text-indigo-600" />
            Subscription Plan
          </h2>
          <p className="text-sm text-slate-500">View and manage your current billing status.</p>
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 flex items-center justify-between bg-slate-50/50">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-indigo-600">
                   {user.plan === "FREE" ? <Zap size={24} /> : <Crown size={24} />}
                </div>
                <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Plan</p>
                   <p className="text-lg font-bold text-slate-900 font-outfit">{user.plan} Plan</p>
                </div>
             </div>
             <Button variant="secondary" className="rounded-xl font-bold border-indigo-100 text-indigo-600 hover:bg-white shadow-none">
                Manage Billing
             </Button>
          </div>
          <div className="p-6 border-t border-slate-100">
             <ul className="space-y-3">
                <PlanFeature active={true} text="Professional PDF Generator" />
                <PlanFeature active={user.plan !== "FREE"} text="Unlimited Downloads" />
                <PlanFeature active={user.plan !== "FREE"} text="Cloud History & CRM" />
                <PlanFeature active={user.plan === "ADMIN"} text="System Administration" />
             </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-8" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-1">
          <h2 className="font-bold text-slate-900 flex items-center gap-2">
            <Shield size={18} className="text-red-500" />
            Security
          </h2>
          <p className="text-sm text-slate-500">Protect your account and managed access.</p>
        </div>

        <div className="md:col-span-2 space-y-4">
           <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
              <div>
                 <p className="font-bold text-slate-900">Change Password</p>
                 <p className="text-xs text-slate-500">Update your secure login credentials.</p>
              </div>
              <Button variant="secondary" className="rounded-xl font-bold opacity-50 cursor-not-allowed">Update</Button>
           </div>
           
           <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-center justify-between">
              <div>
                 <p className="font-bold text-red-900">Delete Account</p>
                 <p className="text-xs text-red-700/70">Permanently remove all your data and invoices.</p>
              </div>
              <Button variant="danger" className="rounded-xl font-bold">Delete</Button>
           </div>
        </div>
      </div>
    </div>
  );
}

function PlanFeature({ text, active }: { text: string; active: boolean }) {
  return (
    <li className={`flex items-center gap-3 text-sm ${active ? "text-slate-700 font-medium" : "text-slate-300 line-through"}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${active ? "bg-indigo-500" : "bg-slate-200"}`} />
      {text}
    </li>
  );
}
