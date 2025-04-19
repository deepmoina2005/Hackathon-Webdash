import mongoose from "mongoose";
const BadgeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  iconName: String,
  criteriaDescription: String,
  createdAt: Date,
  updatedAt: Date
});

export const Badge = mongoose.models?.Badge || mongoose.model('Badge', BadgeSchema);