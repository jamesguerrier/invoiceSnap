# InvoiceSnap — Premium "Direct Utility" Invoicing

InvoiceSnap is a high-performance, frictionless invoicing tool designed for modern freelancers and agencies. It prioritizes speed, aesthetics, and privacy by letting users generate professional PDFs instantly in their browser without mandatory accounts.

---

## 🏗️ Project Roadmap

### ✅ Phase 1: Speed & Instant Utility (COMPLETED)
The "60-Second Invoice" foundation. Focuses on in-browser performance and premium WYSIWYG editing.

- [x] **Split-Screen Editor**: High-fidelity side-by-side editing on desktop.
- [x] **Mobile UX Toggle**: Dedicated "Edit" and "Preview" modes for mobile creators.
- [x] **Instant PDF Engine**: Zero-server client-side generation using `@react-pdf/renderer`.
- [x] **Local Persistence**: Debounced `localStorage` sync to protect work-in-progress.
- [x] **Universal Navigation**: Mobile hamburger menu and pricing navigation.

---

### 🌩️ Phase 2: Authentication & Cloud Persistence
Moving from "Guest Mode" to a personalized financial workspace.

#### 1. Identity & Security
- **Auth Integration**: Set up [Clerk](https://clerk.com) or [NextAuth](https://next-auth.js.org) for secure login.
- **Social Login**: Support Google and Magic Link authentication.
- **User Settings**: Profile management, default labels, and custom signature uploads.

#### 2. Client CRM (Module)
- **Client Directory**: Create, edit, and archive clients for faster billing.
- **Client Tags**: Categorize clients (e.g., "Retainer", "Project-Based").
- **Smart History**: View all invoices associated with a specific client.

#### 3. Cloud Database
- **Database Setup**: Connect [Supabase](https://supabase.com) (PostgreSQL) or Prisma.
- **Draft Syncing**: Sync in-progress invoices across devices (cross-device `localStorage` fallback).
- **Archival**: A dedicated "Invoice List" view where users can download past PDFs.

---

### 🚀 Phase 3: Business Automation & Payments
Turning a utility into a scalable SaaS engine with revenue features.

#### 1. Professional Payments
- **Stripe Integration**: Connect Stripe to invoices.
- **Instant Pay**: Clients can pay via Credit Card, Apple Pay, or Bank Transfer directly from a public invoice link.
- **Commission Management**: Automatic calculation of Stripe fees vs Net Profit.

#### 2. Scaling & Automation
- **Recurring Invoices**: Set and forget—automatic generation for monthly retainers.
- **Auto-Reminders**: Smart email sequences for overdue payments (Resend/SendGrid).
- **Custom Templates**: Premium "Marketplace" or custom CSS-styled templates.

#### 3. Financial Intelligence
- **Revenue Dashboard**: Visual charts for Monthly Recurring Revenue (MRR) and Total Revenue.
- **Overdue Tracking**: Real-time status badges (Paid, Pending, Overdue, Cancelled).
- **Accounting Export**: Export all billing data as CSV for tax season or QuickBooks.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Framer Motion
- **PDF Engine**: @react-pdf/renderer
- **Icons**: Lucide React
- **Persistence**: Zustand/Context + LocalStorage API

---

## 🚀 Getting Started
1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Visit [http://localhost:3000](http://localhost:3000)

*Made for the modern creator by the InvoiceSnap team.*
