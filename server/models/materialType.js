import mongoose from "mongoose";

const MaterialTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  createdAt: Date,
  updatedAt: Date
});

export const MaterialType = mongoose.models?.MaterialType || mongoose.model('MaterialType', MaterialTypeSchema);