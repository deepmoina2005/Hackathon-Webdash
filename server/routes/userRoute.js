import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
} from '../controllers/userController.js';
// import { protect, admin, checkOwnership } from '../middleware/authMiddleware.js'; // Assume you have these middleware

const router = express.Router();

// Main User Routes
router.route('/')
    .get(/*protect, admin,*/ getAllUsers) // Uncomment middleware when implemented
    .post(createUser);

router.route('/:id')
    .get(/*protect, checkOwnership,*/ getUserById) // Example ownership check
    .put(/*protect, checkOwnership,*/ updateUser)
    .delete(/*protect, admin,*/ deleteUser);

// Address Management Routes
router.route('/:userId/addresses')
    .post(/*protect, checkOwnership,*/ addUserAddress);

router.route('/:userId/addresses/:addressId')
    .put(/*protect, checkOwnership,*/ updateUserAddress)
    .delete(/*protect, checkOwnership,*/ deleteUserAddress);

export default router;