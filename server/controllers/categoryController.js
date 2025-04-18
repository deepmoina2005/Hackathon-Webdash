import asyncHandler from 'express-async-handler';
import { Category } from '../models/category.js';
import { MaterialType } from '../models/materialType.js';
import { Badge } from '../models/badge.js'; // Adjust path
import mongoose from 'mongoose';

// --- Category Controller ---

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.status(200).json({ status: 'success', count: categories.length, data: categories });
});

// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
         res.status(400); throw new Error('Invalid category ID format');
    }
    const category = await Category.findById(req.params.id);
    if (!category) {
         res.status(404); throw new Error('Category not found');
    }
    res.status(200).json({ status: 'success', data: category });
});

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    if (!name) {
         res.status(400); throw new Error('Category name is required');
    }
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
         res.status(400); throw new Error('Category with this name already exists');
    }
    const category = await Category.create({ name, description });
    res.status(201).json({ status: 'success', data: category });
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
         res.status(400); throw new Error('Invalid category ID format');
    }
    const { name, description } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { name, description },
        { new: true, runValidators: true }
    );
    if (!updatedCategory) {
         res.status(404); throw new Error('Category not found');
    }
    res.status(200).json({ status: 'success', data: updatedCategory });
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
         res.status(400); throw new Error('Invalid category ID format');
    }
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404); throw new Error('Category not found');
    }
    // Consider implications: What happens to products in this category?
    // The schema uses ON DELETE SET NULL for products.categoryId, so they will lose their category.
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// --- MaterialType Controller (Similar structure to Category) ---

const getAllMaterialTypes = asyncHandler(async (req, res) => {
    const materialTypes = await MaterialType.find({});
    res.status(200).json({ status: 'success', count: materialTypes.length, data: materialTypes });
});

const getMaterialTypeById = asyncHandler(async (req, res) => {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
         res.status(400); throw new Error('Invalid material type ID format');
    }
    const materialType = await MaterialType.findById(req.params.id);
    if (!materialType) {
         res.status(404); throw new Error('Material type not found');
    }
    res.status(200).json({ status: 'success', data: materialType });
});

const createMaterialType = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
     if (!name) {
         res.status(400); throw new Error('Material type name is required');
    }
    const exists = await MaterialType.findOne({ name });
    if (exists) {
         res.status(400); throw new Error('Material type with this name already exists');
    }
    const materialType = await MaterialType.create({ name, description });
    res.status(201).json({ status: 'success', data: materialType });
});

const updateMaterialType = asyncHandler(async (req, res) => {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
         res.status(400); throw new Error('Invalid material type ID format');
    }
    const { name, description } = req.body;
    const updated = await MaterialType.findByIdAndUpdate(
        req.params.id,
        { name, description },
        { new: true, runValidators: true }
    );
    if (!updated) {
         res.status(404); throw new Error('Material type not found');
    }
    res.status(200).json({ status: 'success', data: updated });
});

const deleteMaterialType = asyncHandler(async (req, res) => {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
         res.status(400); throw new Error('Invalid material type ID format');
    }
    const materialType = await MaterialType.findById(req.params.id);
     if (!materialType) {
        res.status(404); throw new Error('Material type not found');
    }
    // Products use ON DELETE SET NULL for materialTypeId
    await MaterialType.findByIdAndDelete(req.params.id);
    res.status(204).send();
});


// --- Badge Controller (Definition CRUD) ---

const getAllBadges = asyncHandler(async (req, res) => {
    const badges = await Badge.find({});
    res.status(200).json({ status: 'success', count: badges.length, data: badges });
});

const getBadgeById = asyncHandler(async (req, res) => {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
         res.status(400); throw new Error('Invalid badge ID format');
    }
    const badge = await Badge.findById(req.params.id);
    if (!badge) {
         res.status(404); throw new Error('Badge not found');
    }
    res.status(200).json({ status: 'success', data: badge });
});

const createBadge = asyncHandler(async (req, res) => {
    const { name, description, iconName, criteriaDescription } = req.body;
     if (!name || !description) {
         res.status(400); throw new Error('Badge name and description are required');
    }
    const exists = await Badge.findOne({ name });
    if (exists) {
         res.status(400); throw new Error('Badge with this name already exists');
    }
    const badge = await Badge.create({ name, description, iconName, criteriaDescription });
    res.status(201).json({ status: 'success', data: badge });
});

const updateBadge = asyncHandler(async (req, res) => {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
         res.status(400); throw new Error('Invalid badge ID format');
    }
    const { name, description, iconName, criteriaDescription } = req.body;
    const updated = await Badge.findByIdAndUpdate(
        req.params.id,
        { name, description, iconName, criteriaDescription },
        { new: true, runValidators: true }
    );
    if (!updated) {
         res.status(404); throw new Error('Badge not found');
    }
    res.status(200).json({ status: 'success', data: updated });
});

const deleteBadge = asyncHandler(async (req, res) => {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
         res.status(400); throw new Error('Invalid badge ID format');
    }
    const badge = await Badge.findById(req.params.id);
     if (!badge) {
        res.status(404); throw new Error('Badge not found');
    }
    // Consider implications: Users keep earned badges even if definition is deleted?
    // The user_badges schema uses ON DELETE CASCADE for badge_id, so deleting a badge definition
    // would remove it from all users who earned it in this SQL-based cascade thinking.
    // In Mongo, this link just becomes stale unless manually cleaned up.
    // Often better to mark badges as inactive rather than delete.
    await Badge.findByIdAndDelete(req.params.id);
    // Optional: Clean up references in users.badges array
    // await User.updateMany({}, { $pull: { badges: { badgeId: req.params.id } } });
    res.status(204).send();
});

// --- Manual Badge Awarding (Example - Admin action) ---
// @desc    Award a badge to a user
// @route   POST /api/users/:userId/badges
// @access  Private/Admin
const awardBadgeToUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { badgeId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(badgeId)) {
         res.status(400); throw new Error('Invalid ID format');
    }

    const user = await User.findById(userId);
    const badge = await Badge.findById(badgeId);

    if (!user) { res.status(404); throw new Error('User not found'); }
    if (!badge) { res.status(404); throw new Error('Badge not found'); }

    // Check if user already has the badge
    const alreadyHasBadge = user.badges.some(b => b.badgeId.equals(badgeId));
    if (alreadyHasBadge) {
        res.status(400); throw new Error('User already has this badge');
    }

    user.badges.push({ badgeId: badgeId, earnedAt: new Date() });
    await user.save();

    res.status(200).json({ status: 'success', data: user.badges });
});


export {
    // Category Exports
    getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory,
    // MaterialType Exports
    getAllMaterialTypes, getMaterialTypeById, createMaterialType, updateMaterialType, deleteMaterialType,
    // Badge Exports
    getAllBadges, getBadgeById, createBadge, updateBadge, deleteBadge,
    // Badge Management
    awardBadgeToUser
};

