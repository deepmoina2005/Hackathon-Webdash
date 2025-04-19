import asyncHandler from 'express-async-handler';
import { User } from '../models/user.js'; // Adjust path as needed
import mongoose from 'mongoose';
import { generateToken } from '../middleware/authMiddleware.js';
import bcrypt from 'bcryptjs';

const getAllUsers = asyncHandler(async (req, res) => {
    // TODO: Add pagination, filtering, sorting options from req.query
    const users = await User.find({}).select('-passwordHash'); // Exclude password hash
    res.status(200).json({ status: 'success', count: users.length, data: users });
});

const getUserById = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error('Invalid user ID format');
    }

    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    // TODO: Check authorization if not admin (user can get own profile)
    res.status(200).json({ status: 'success', data: user });
});

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, addresses, monthlyCarbonGoal } = req.body;

    // Basic validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please provide name, email, and password');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists with this email');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        name,
        email,
        passwordHash: hashedPassword, // !! REPLACE with hashedPassword !!
        addresses: addresses || [], // Ensure addresses is at least an empty array
        monthlyCarbonGoal,
        joinedAt: new Date() // Set join date
        // createdAt/updatedAt are handled by timestamps: true
    });

    if (user) {
      res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          monthlyCarbonGoal: user.monthlyCarbonGoal,
          token: generateToken(user._id)
      });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for email and password
  if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
  }

  // Find user
  const user = await User.findOne({ email });

  // Check password match
  if (user && (await bcrypt.compare(password, user.passwordHash))) {
      res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          monthlyCarbonGoal: user.monthlyCarbonGoal,
          token: generateToken(user._id)
      });
  } else {
      res.status(401);
      throw new Error('Invalid email or password');
  }
});

const updateUser = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error('Invalid user ID format');
    }

    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // TODO: Check authorization (is user updating own profile or is admin?)

    // Prevent password updates through this route - use a dedicated password change route
    const { passwordHash, email, ...updateData } = req.body; // Exclude passwordHash and potentially email

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true } // Return updated doc, run schema validators
    ).select('-passwordHash');

    if (!updatedUser) {
        // Should not happen if user was found initially, but good practice
        res.status(404);
        throw new Error('User not found after update attempt');
    }

    res.status(200).json({ status: 'success', data: updatedUser });
});

const deleteUser = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error('Invalid user ID format');
    }

    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // TODO: Consider implications - delete related data? Mark as inactive instead?
    // Cascade deletes are not automatic in MongoDB, handle manually if needed.
    // e.g., delete orders, etc. (or handle via model hooks if appropriate)

    await User.findByIdAndDelete(req.params.id);

    res.status(204).send(); // No Content
});

// --- Address Management ---

const addUserAddress = asyncHandler(async (req, res) => {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400); throw new Error('Invalid user ID format');
    }
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404); throw new Error('User not found');
    }
    // TODO: Authorization check

    const { addressLine1, city, stateProvince, postalCode, country, ...rest } = req.body;
    if (!addressLine1 || !city || !stateProvince || !postalCode || !country) {
         res.status(400); throw new Error('Missing required address fields');
    }

    const newAddress = { addressLine1, city, stateProvince, postalCode, country, ...rest };

    // If setting default, unset other defaults
    if (newAddress.isDefaultShipping) {
        user.addresses.forEach(addr => addr.isDefaultShipping = false);
    }
    if (newAddress.isDefaultBilling) {
        user.addresses.forEach(addr => addr.isDefaultBilling = false);
    }

    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json({ status: 'success', data: user.addresses });
});


const updateUserAddress = asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId) || !mongoose.Types.ObjectId.isValid(req.params.addressId)) {
        res.status(400); throw new Error('Invalid ID format');
    }
    const user = await User.findById(req.params.userId);
    if (!user) {
        res.status(404); throw new Error('User not found');
    }
    // TODO: Authorization check

    const address = user.addresses.id(req.params.addressId);
    if (!address) {
        res.status(404); throw new Error('Address not found');
    }

    // If setting default, unset other defaults first
    if (req.body.isDefaultShipping === true) {
        user.addresses.forEach(addr => { if(addr.id !== req.params.addressId) addr.isDefaultShipping = false; });
    }
    if (req.body.isDefaultBilling === true) {
        user.addresses.forEach(addr => { if(addr.id !== req.params.addressId) addr.isDefaultBilling = false; });
    }

    // Update fields
    Object.assign(address, req.body);

    await user.save();
    res.status(200).json({ status: 'success', data: address });
});

// @desc    Delete user address
// @route   DELETE /api/users/:userId/addresses/:addressId
// @access  Private/Owner
const deleteUserAddress = asyncHandler(async (req, res) => {
     if (!mongoose.Types.ObjectId.isValid(req.params.userId) || !mongoose.Types.ObjectId.isValid(req.params.addressId)) {
        res.status(400); throw new Error('Invalid ID format');
    }
    const user = await User.findById(req.params.userId);
     if (!user) {
        res.status(404); throw new Error('User not found');
    }
    // TODO: Authorization check

    const address = user.addresses.id(req.params.addressId);
    if (!address) {
        res.status(404); throw new Error('Address not found');
    }

    address.remove(); // Mongoose subdocument remove method
    await user.save();

    res.status(204).send();
});


export {
    getAllUsers,
    getUserById,
    createUser,
    authUser,
    updateUser,
    deleteUser,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
};
