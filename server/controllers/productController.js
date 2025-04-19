import asyncHandler from 'express-async-handler';
import { Product } from '../models/product.js'; // Adjust path
import mongoose from 'mongoose';

// @desc    Get all products (with filtering, sorting, pagination)
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
    const { category, material, featured, minPrice, maxPrice, sort, page = 1, limit = 10 } = req.query;

    const query = {};

    if (category) {
        // Find category ID first if name is provided, or assume ID is provided
        // Example: const categoryDoc = await Category.findOne({ name: category });
        // if (categoryDoc) query.categoryId = categoryDoc._id; else query.categoryId = category;
        query.categoryId = category; // Assuming ID is passed for simplicity
    }
    if (material) {
        query.materialTypeId = material; // Assuming ID is passed
    }
    if (featured) {
        query.isFeatured = featured === 'true';
    }
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sortOptions = {};
    if (sort) {
        // Example sort values: 'price', '-price', 'name', '-createdAt'
        const sortBy = sort.startsWith('-') ? sort.substring(1) : sort;
        const order = sort.startsWith('-') ? -1 : 1;
        sortOptions[sortBy] = order;
    } else {
        sortOptions.createdAt = -1; // Default sort
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
        .populate('categoryId', 'name') // Populate category name
        .populate('materialTypeId', 'name') // Populate material name
        .sort(sortOptions)
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));

    res.status(200).json({
        status: 'success',
        count: products.length,
        total: count,
        currentPage: Number(page),
        totalPages: Math.ceil(count / Number(limit)),
        data: products
    });
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error('Invalid product ID format');
    }

    const product = await Product.findById(req.params.id)
        .populate('categoryId', 'name description')
        .populate('materialTypeId', 'name description');

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }
    res.status(200).json({ status: 'success', data: product });
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    // Destructure all expected fields from req.body
    const {
        name, sku, description, price, originalPrice, imageUrl, categoryId,
        materialTypeId, carbonFootprint, waterSaved, wasteDiverted,
        isFeatured, details, stockQuantity
    } = req.body;

    // Basic validation
    if (!name || price === undefined || stockQuantity === undefined) {
        res.status(400);
        throw new Error('Missing required fields: name, price, stockQuantity');
    }

    // Optional: Validate categoryId and materialTypeId exist
    if(categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
         res.status(400); throw new Error('Invalid category ID format');
    }
     if(materialTypeId && !mongoose.Types.ObjectId.isValid(materialTypeId)) {
         res.status(400); throw new Error('Invalid material type ID format');
    }
    // Could add checks:
    // const categoryExists = await Category.findById(categoryId); if (!categoryExists) ...
    // const materialExists = await MaterialType.findById(materialTypeId); if (!materialExists) ...


    const product = await Product.create({
        name, sku, description, price, originalPrice, imageUrl, categoryId,
        materialTypeId, carbonFootprint, waterSaved, wasteDiverted,
        isFeatured, details, stockQuantity
        // createdAt/updatedAt handled by timestamps
    });

    res.status(201).json({ status: 'success', data: product });
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error('Invalid product ID format');
    }

    // Optional: Validate categoryId and materialTypeId if provided in req.body

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body, // Pass the whole body for update
        { new: true, runValidators: true }
    );

    if (!updatedProduct) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.status(200).json({ status: 'success', data: updatedProduct });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error('Invalid product ID format');
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // TODO: Consider implications - check if product is in existing orders?
    // Maybe mark as inactive/archived instead of hard delete.

    await Product.findByIdAndDelete(req.params.id);

    res.status(204).send(); // No Content
});


export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
