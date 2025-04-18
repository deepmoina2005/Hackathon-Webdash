import mongoose from "mongoose";

// --- Sub-schemas ---
const addressSchema = new mongoose.Schema({
  addressLine1: { type: String, required: true },
  addressLine2: String,
  city: { type: String, required: true },
  stateProvince: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  addressType: { type: String, enum: ["Shipping", "Billing", "General"] },
  isDefaultShipping: { type: Boolean, default: false },
  isDefaultBilling: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: Date
}, { _id: true });

const badgeEarnedSchema = new mongoose.Schema({
  badgeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge', required: true },
  earnedAt: { type: Date, required: true }
});

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  priceAtPurchase: { type: Number, required: true, min: 0 },
  carbonSavedAtPurchase: { type: Number, min: 0 },
  waterSavedAtPurchase: { type: Number, min: 0 },
  wasteDivertedAtPurchase: { type: Number, min: 0 }
});

const orderAddressSchema = new mongoose.Schema({
  addressLine1: { type: String, required: true },
  addressLine2: String,
  city: { type: String, required: true },
  stateProvince: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
});

// --- Main Schemas ---
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  joinedAt: { type: Date, required: true },
  monthlyCarbonGoal: { type: Number, min: 0 },
  addresses: { type: [addressSchema], required: true },
  badges: [badgeEarnedSchema],
  createdAt: Date,
  updatedAt: Date
});

UserSchema.index({ 'addresses._id': 1 });
UserSchema.index({ 'badges.badgeId': 1 });

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  createdAt: Date,
  updatedAt: Date
});

const MaterialTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  createdAt: Date,
  updatedAt: Date
});

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

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"],
    default: "Pending"
  },
  items: { type: [orderItemSchema], required: true },
  shippingAddress: { type: orderAddressSchema, required: true },
  billingAddress: { type: orderAddressSchema, required: true },
  totalAmount: { type: Number, required: true, min: 0 },
  totalCarbonSaved: { type: Number, min: 0 },
  totalWaterSaved: { type: Number, min: 0 },
  totalWasteDiverted: { type: Number, min: 0 },
  createdAt: Date,
  updatedAt: Date
});

OrderSchema.index({ userId: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ orderDate: -1 });
OrderSchema.index({ 'items.productId': 1 });

const BadgeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  iconName: String,
  criteriaDescription: String,
  createdAt: Date,
  updatedAt: Date
});

// --- Models ---
export const User = mongoose.models?.User || mongoose.model('User', UserSchema);
export const Category = mongoose.models?.Category || mongoose.model('Category', CategorySchema);
export const MaterialType = mongoose.models?.MaterialType || mongoose.model('MaterialType', MaterialTypeSchema);
export const Product = mongoose.models?.Product || mongoose.model('Product', ProductSchema);
export const Order = mongoose.models?.Order || mongoose.model('Order', OrderSchema);
export const Badge = mongoose.models?.Badge || mongoose.model('Badge', BadgeSchema);