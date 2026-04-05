"use server";

import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import Client from "@/lib/models/Client";
import Invoice from "@/lib/models/Invoice";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

async function getSessionUser() {
  const session = await auth();
  if (!session?.user?.id) return null;
  await dbConnect();
  return User.findById(session.user.id);
}

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    throw new Error("Missing fields");
  }

  await dbConnect();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const isAdmin = email === "fjim0392@gmail.com";

  await User.create({
    name,
    email,
    password: hashedPassword,
    plan: isAdmin ? "ADMIN" : "FREE",
  });
}

export async function getDownloadStatus() {
  const start = Date.now();
  console.log(`[Action] getDownloadStatus started at ${new Date().toISOString()}`);
  
  const sessionUser = await getSessionUser();
  if (!sessionUser) return { canDownload: false, reason: "UNAUTHENTICATED" };

  // Admin and Paid users have unlimited downloads
  if (sessionUser.plan === "ADMIN" || sessionUser.plan === "PAID") {
    console.log(`[Action] getDownloadStatus completed in ${Date.now() - start}ms (Plan: ${sessionUser.plan})`);
    return { canDownload: true, plan: sessionUser.plan as string, remaining: -1 };
  }

  // Monthly Reset Logic
  const now = new Date();
  const lastReset = new Date(sessionUser.lastDownloadReset);
  if (now.getMonth() !== lastReset.getMonth() || now.getFullYear() !== lastReset.getFullYear()) {
    sessionUser.downloadsThisMonth = 0;
    sessionUser.lastDownloadReset = now;
    await sessionUser.save();
    console.log(`[Action] getDownloadStatus completed in ${Date.now() - start}ms (Monthly Reset)`);
    return { canDownload: true, plan: "FREE", remaining: 2 };
  }

  const remaining = Math.max(0, 2 - (sessionUser.downloadsThisMonth || 0));
  console.log(`[Action] getDownloadStatus completed in ${Date.now() - start}ms (Remaining: ${remaining})`);
  return { 
    canDownload: remaining > 0, 
    plan: "FREE", 
    remaining,
    reason: remaining === 0 ? "LIMIT_REACHED" : undefined 
  };
}

export async function recordDownload() {
  const sessionUser = await getSessionUser();
  if (!sessionUser || sessionUser.plan === "ADMIN" || sessionUser.plan === "PAID") return;

  sessionUser.downloadsThisMonth = (sessionUser.downloadsThisMonth || 0) + 1;
  await sessionUser.save();
}

export async function togglePlan(plan: string) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return;

  sessionUser.plan = plan;
  await sessionUser.save();
  revalidatePath("/dashboard");
}

export async function getDashboardStats() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return { totalInvoiced: 0, clientCount: 0, invoiceCount: 0, recentInvoices: [] };

  const userId = sessionUser._id;
  const [clientCount, invoiceCount, invoices] = await Promise.all([
    Client.countDocuments({ userId }),
    Invoice.countDocuments({ userId }),
    Invoice.find({ userId }).sort({ createdAt: -1 }).populate("clientId")
  ]);

  const totalInvoiced = invoices.reduce((acc: number, inv: any) => {
    const invTotal = inv.items?.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice * (1 + (item.taxRate || 0) / 100)), 0) || 0;
    return acc + invTotal;
  }, 0);

  return {
    totalInvoiced,
    clientCount,
    invoiceCount: invoices.length,
    recentInvoices: JSON.parse(JSON.stringify(invoices.slice(0, 5))) // Stringify for serialized response
  };
}

export async function createClient(data: { name: string; email: string; address: string; tags: string[] }) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) throw new Error("Unauthorized");

  const client = await Client.create({
    ...data,
    userId: sessionUser._id,
  });
  revalidatePath("/clients");
  return JSON.parse(JSON.stringify(client));
}

export async function getClients() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return [];

  const clients = await Client.find({ userId: sessionUser._id }).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(clients));
}

export async function saveInvoice(data: any) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) throw new Error("Unauthorized");

  const { client, details, items, notes } = data;

  // 1. Find or Create Client
  let dbClient = await Client.findOne({ email: client.email, userId: sessionUser._id });
  if (!dbClient) {
    dbClient = await Client.create({
      name: client.name,
      email: client.email,
      address: client.address,
      userId: sessionUser._id,
      tags: [],
    });
  } else {
    // Optionally update client info if it's different
    dbClient.name = client.name;
    dbClient.address = client.address;
    await dbClient.save();
  }

  // 2. Upsert Invoice
  let invoice;
  if (data.id) {
    // Update existing invoice
    invoice = await Invoice.findOneAndUpdate(
      { _id: data.id, userId: sessionUser._id },
      {
        invoiceNumber: details.invoiceNumber,
        issueDate: details.issueDate,
        dueDate: details.dueDate,
        currency: details.currency,
        clientId: dbClient._id,
        items: items,
        notes: notes,
      },
      { new: true }
    );
  } else {
    // Create new invoice
    invoice = await Invoice.create({
      invoiceNumber: details.invoiceNumber,
      issueDate: details.issueDate,
      dueDate: details.dueDate,
      currency: details.currency,
      userId: sessionUser._id,
      clientId: dbClient._id,
      items: items,
      notes: notes,
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/clients");
  return JSON.parse(JSON.stringify(invoice));
}

export async function getInvoiceById(id: string) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return null;

  const invoice = await Invoice.findOne({ _id: id, userId: sessionUser._id }).populate("clientId");
  return JSON.parse(JSON.stringify(invoice));
}

export async function getClientById(id: string) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return null;

  const client = await Client.findOne({ _id: id, userId: sessionUser._id });
  return JSON.parse(JSON.stringify(client));
}

export async function createInvoice(data: any) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) throw new Error("Unauthorized");

  const { items, clientId, ...invoiceData } = data;

  const invoice = await Invoice.create({
    ...invoiceData,
    userId: sessionUser._id,
    clientId: clientId || null,
    items: items || []
  });

  revalidatePath("/dashboard");
  return JSON.parse(JSON.stringify(invoice));
}

export async function getInvoices() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return [];

  const invoices = await Invoice.find({ userId: sessionUser._id })
    .sort({ createdAt: -1 })
    .populate("clientId"); // Note: Using populate for client info

  return JSON.parse(JSON.stringify(invoices));
}

export async function deleteInvoice(id: string) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) throw new Error("Unauthorized");

  await Invoice.deleteOne({ _id: id, userId: sessionUser._id });
  revalidatePath("/dashboard");
}

export async function deleteClient(id: string) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) throw new Error("Unauthorized");

  await Client.deleteOne({ _id: id, userId: sessionUser._id });
  revalidatePath("/clients");
}
