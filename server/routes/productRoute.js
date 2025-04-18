import express from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// Public routes
router.route('/')
    .get(getAllProducts);

router.route('/:id')
    .get(getProductById);

// Admin routes
router.use((req, res, next) => { /* your admin auth middleware */ next() });

router.route('/')
    .post(createProduct);

router.route('/:id')
    .put(updateProduct)
    .delete(deleteProduct);

// Make sure this line exists at the end
export default router;