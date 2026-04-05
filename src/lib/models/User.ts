import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed
    image: { type: String },
    brandColor: { type: String, default: "#4f46e5" },
    plan: { type: String, enum: ["FREE", "PAID", "ADMIN"], default: "FREE" },
    downloadsThisMonth: { type: Number, default: 0 },
    lastDownloadReset: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
