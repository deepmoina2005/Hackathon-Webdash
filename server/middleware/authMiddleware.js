import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js'; // Adjust path

const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  // Check authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token payload (excluding password)
      req.user = await User.findById(decoded.id).select('-passwordHash');
      
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as admin');
  }
};

// Optional: Ownership check middleware
const checkOwnership = (modelName) => asyncHandler(async (req, res, next) => {
  const document = await modelName.findById(req.params.id);
  
  if (!document) {
    res.status(404);
    throw new Error('Resource not found');
  }

  // Check if user is owner or admin
  if (document.userId.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized to perform this action');
  }

  next();
});

// Optional: Rate limiter for auth routes
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many login attempts, please try again later'
});

// Generate JWT token utility function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d'
  });
};

export { 
  protect, 
  admin, 
  checkOwnership, 
  authLimiter,
  generateToken
};