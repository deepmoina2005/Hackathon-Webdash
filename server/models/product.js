import mongoose from "mongoose";

const productDetailsSchema = new mongoose.Schema({
  dimensions: String,
  weight: String,
  madeIn: String,
  careInstructions: String
});

const ProductSchema = new mongoose.Schema({
  sku: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, min: 0 },
  imageUrl: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  materialTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'MaterialType' },
  carbonFootprint: { type: Number, min: 0 },
  waterSaved: { type: Number, min: 0 },
  wasteDiverted: { type: Number, min: 0 },
  isFeatured: { type: Boolean, default: false },
  details: productDetailsSchema,
  stockQuantity: { type: Number, required: true, min: 0, default: 0 },
  createdAt: Date,
  updatedAt: Date
});

ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ categoryId: 1 });
ProductSchema.index({ materialTypeId: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ isFeatured: 1 });

export const Product = mongoose.models?.Product || mongoose.model('Product', ProductSchema);