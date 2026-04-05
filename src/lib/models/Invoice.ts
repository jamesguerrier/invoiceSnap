import mongoose from "mongoose";

const LineItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  taxRate: { type: Number, default: 0 },
});

const InvoiceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" }, // Optional
    invoiceNumber: { type: String, required: true },
    issueDate: { type: String, required: true }, // Keeping as string for simplicity
    dueDate: { type: String, required: true }, // Keeping as string for simplicity
    currency: { type: String, default: "USD" },
    notes: { type: String },
    items: [LineItemSchema],
    status: { type: String, default: "draft" },
  },
  { timestamps: true }
);

export default mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
