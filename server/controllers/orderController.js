import Order from '../models/order.js'; // ✅ Correct
import Product from "../models/product.js";

// Place Order COD: /api/order/cod
export const PlaceOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid Data" });
    }

    // Calculate Amount Using Items (Avoid using async/await inside reduce)
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + (product.offerPrice * item.quantity);
    })

    // Add Tax Charge (2%)
    amount += Math.floor(amount * 0.02);

     await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({ success: true, message: "Order Placed Successfully"});
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Get Orders by User ID: /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;  // Or you might want to extract userId from req.user if the user is authenticated
    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Get All Orders (for seller/admin): /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
