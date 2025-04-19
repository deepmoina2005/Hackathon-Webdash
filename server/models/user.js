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

export const User = mongoose.models?.User || mongoose.model('User', UserSchema);