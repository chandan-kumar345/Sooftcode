import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import logger from '../utils/logger.js';

// Helper to sign JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'sooftcode_enterprise_level_jwt_secret_key_2026', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user (admin/editor)
// @route   POST /api/auth/register
// @access  Public (for initial setup)
export const registerUser = async (req, res, next) => {
  const { username, email, password, role } = req.body;
  logger.security('User registration initiated', { username, email, role });

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      logger.security('User registration failed: User already exists', { username, email });
      res.status(400);
      throw new Error('User already exists with this email or username');
    }

    const user = await User.create({
      username,
      email,
      password,
      role: role || 'admin',
    });

    if (user) {
      logger.security('User registered successfully', { userId: user._id, username: user.username, role: user.role });
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        },
      });
    } else {
      logger.security('User registration failed: Invalid user data', { username, email });
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    logger.error('User registration exception', { error: error.message });
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  const { emailOrUsername, password } = req.body;
  logger.security('Login attempt initiated', { emailOrUsername });

  try {
    if (!emailOrUsername || !password) {
      logger.security('Login attempt failed: Missing credentials');
      res.status(400);
      throw new Error('Please enter username/email and password');
    }

    const user = await User.findOne({
      $or: [{ email: emailOrUsername.toLowerCase() }, { username: emailOrUsername }],
    });

    if (user && (await user.matchPassword(password))) {
      logger.security('Login successful', { userId: user._id, username: user.username, role: user.role });
      res.json({
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        },
      });
    } else {
      logger.security('Login failed: Invalid credentials', { emailOrUsername });
      res.status(401);
      throw new Error('Invalid email/username or password');
    }
  } catch (error) {
    logger.error('Login exception', { error: error.message });
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};
