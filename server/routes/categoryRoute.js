import express from 'express';
import {
    // Categories
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    
    // Material Types
    getAllMaterialTypes,
    getMaterialTypeById,
    createMaterialType,
    updateMaterialType,
    deleteMaterialType,
    
    // Badges
    getAllBadges,
    getBadgeById,
    createBadge,
    updateBadge,
    deleteBadge,
    
    // Badge Awarding
    awardBadgeToUser
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Category Routes ---
router.route('/categories')
    .get(getAllCategories)
    .post(protect, admin,createCategory);

router.route('/categories/:id')
    .get(getCategoryById)
    .put(protect, admin, updateCategory)
    .delete(protect, admin, deleteCategory);

// --- Material Type Routes ---
router.route('/materialtypes')
    .get(getAllMaterialTypes)
    .post(protect, admin, createMaterialType);

router.route('/materialtypes/:id')
    .get(getMaterialTypeById)
    .put(protect, admin, updateMaterialType)
    .delete(protect, admin, deleteMaterialType);

// --- Badge Routes ---
router.route('/badges')
    .get(getAllBadges)
    .post(protect, admin, createBadge);

router.route('/badges/:id')
    .get(getBadgeById)
    .put(protect, admin, updateBadge)
    .delete(protect, admin, deleteBadge);

// --- Badge Awarding Route ---
router.post('/users/:userId/badges', protect, admin, awardBadgeToUser);

export default router;