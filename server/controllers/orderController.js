import asyncHandler from 'express-async-handler';
import { Order } from '../models/order.js'; 
import { Product } from '../models/product.js';// Adjust path
import mongoose from 'mongoose';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, billingAddress,userId } = req.body; // Assuming paymentMethod is relevant
    

    if (!orderItems || orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items provided');
    }
     if (!shippingAddress || !billingAddress) {
        res.status(400);
        throw new Error('Shipping and billing addresses are required');
    }

    // --- Complex Logic Section ---
    // 1. Get product details for calculation and validation
    const productIds = orderItems.map(item => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== productIds.length) {
         res.status(400); throw new Error('One or more products not found');
    }

    let totalAmount = 0;
    let totalCarbonSaved = 0;
    let totalWaterSaved = 0;
    let totalWasteDiverted = 0;
    const itemsToSave = [];
    const stockUpdates = []; // For atomic stock update later

    for (const item of orderItems) {
        const product = products.find(p => p._id.toString() === item.productId);
        if (!product) {
            // This check is slightly redundant due to the check above, but safe
             res.status(400); throw new Error(`Product with ID ${item.productId} not found during processing`);
        }

        // Check stock
        if (product.stockQuantity < item.quantity) {
             res.status(400); throw new Error(`Not enough stock for ${product.name}. Available: ${product.stockQuantity}`);
        }

        const priceAtPurchase = product.price; // Use current price
        const carbonSaved = (product.carbonFootprint || 0) * item.quantity; // Example calc
        const waterSaved = (product.waterSaved || 0) * item.quantity;
        const wasteDiverted = (product.wasteDiverted || 0) * item.quantity;

        totalAmount += priceAtPurchase * item.quantity;
        totalCarbonSaved += carbonSaved;
        totalWaterSaved += waterSaved;
        totalWasteDiverted += wasteDiverted;

        itemsToSave.push({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: priceAtPurchase,
            carbonSavedAtPurchase: carbonSaved,
            waterSavedAtPurchase: waterSaved,
            wasteDivertedAtPurchase: wasteDiverted,
        });

        // Prepare stock update operation
        stockUpdates.push({
            updateOne: {
                filter: { _id: product._id },
                update: { $inc: { stockQuantity: -item.quantity } }
            }
        });
    }

     // TODO: Payment Processing Integration would go here

    // --- Transaction Recommended ---
    // For atomicity (create order AND update stock OR neither), use a transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Update stock levels
        const stockUpdateResult = await Product.bulkWrite(stockUpdates, { session });
        if (stockUpdateResult.modifiedCount !== stockUpdates.length) {
            // This check might be too strict if bulkWrite behaves differently, adjust as needed
            throw new Error('Failed to update stock for all items');
        }

        // Create the order document
        const order = new Order({
            userId: userId,
            orderDate: new Date(),
            items: itemsToSave,
            shippingAddress: shippingAddress, // Assumes structure matches OrderAddressSchema
            billingAddress: billingAddress,   // Assumes structure matches OrderAddressSchema
            totalAmount: totalAmount,
            totalCarbonSaved: totalCarbonSaved,
            totalWaterSaved: totalWaterSaved,
            totalWasteDiverted: totalWasteDiverted,
            status: 'Pending', // Or 'Processing' if payment successful
            // paymentMethod: paymentMethod // Store payment method if needed
        });

        const createdOrder = await order.save({ session });

        // TODO: Award Badges based on order completion/totals (call a service function)
        // await awardBadgesForOrder(userId, createdOrder);

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ status: 'success', data: createdOrder });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500); // Internal Server Error or specific error from try block
        throw new Error(`Order creation failed: ${error.message}`);
    }
    // --- End Transaction ---
});

// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const userId = req.user._id; // From auth middleware
    const orders = await Order.find({ userId: userId })
        .populate('items.productId', 'name price imageUrl') // Populate some product details
        .sort({ orderDate: -1 }); // Sort by most recent

    res.status(200).json({ status: 'success', count: orders.length, data: orders });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (Owner or Admin)
const getOrderById = asyncHandler(async (req, res) => {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error('Invalid order ID format');
    }

    const order = await Order.findById(req.params.id)
        .populate('userId', 'name email') // Populate user details
        .populate('items.productId', 'name price imageUrl sku'); // Populate product details

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    // TODO: Authorization check (req.user._id === order.userId.toString() || req.user.isAdmin)

    res.status(200).json({ status: 'success', data: order });
});

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    // TODO: Add filtering by status, user, date range; add pagination
    const orders = await Order.find({})
        .populate('userId', 'name email')
        .sort({ orderDate: -1 });

    res.status(200).json({ status: 'success', count: orders.length, data: orders });
});


// @desc    Update order status (e.g., to shipped, delivered)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error('Invalid order ID format');
    }
    const { status } = req.body;

    // Validate status against enum if possible (or rely on schema validation)
    const allowedStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"];
    if (!status || !allowedStatuses.includes(status)) {
        res.status(400);
        throw new Error(`Invalid status value. Must be one of: ${allowedStatuses.join(', ')}`);
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    // --- Complex Logic ---
    // If status is 'Cancelled' or 'Returned', potentially adjust stock levels back
    if ((status === 'Cancelled' || status === 'Returned') && order.status !== 'Cancelled' && order.status !== 'Returned') {
        const stockUpdates = order.items.map(item => ({
            updateOne: {
                filter: { _id: item.productId },
                update: { $inc: { stockQuantity: item.quantity } } // Increase stock back
            }
        }));
        // Consider using a transaction here as well
        await Product.bulkWrite(stockUpdates);
        // TODO: Handle potential badge revocations? Payment refunds?
    }
    // --- End Complex Logic ---

    order.status = status;
    // Potentially set shippedAt, deliveredAt dates etc.
    const updatedOrder = await order.save();

    res.status(200).json({ status: 'success', data: updatedOrder });
});


export {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
};
