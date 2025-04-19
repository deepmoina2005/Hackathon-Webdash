import mongoose from 'mongoose';
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
export const Order = mongoose.models?.Order || mongoose.model('Order', OrderSchema);