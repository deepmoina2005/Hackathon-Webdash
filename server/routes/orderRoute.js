import express from 'express';
import {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
} from '../controllers/orderController.js';
// import { protect, admin, checkOrderOwnership } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply protection to all order routes
// router.use(protect);

// Public routes (none) -> All protected

// Protected routes
router.post('/', /*protect,*/ createOrder);
router.get('/myorders', /*protect,*/ getMyOrders);
router.get('/:id', /*protect, checkOrderOwnership,*/ getOrderById);

// Admin-only routes
router.get('/', /*protect, admin,*/ getAllOrders);
router.put('/:id/status', /*protect, admin,*/ updateOrderStatus);

export default router;