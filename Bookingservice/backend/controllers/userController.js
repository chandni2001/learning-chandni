const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Helper function to generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'my_jwt_secret', { // Use environment variable or default
    expiresIn: '30d',
  });
};

// Register new user
exports.registerUser = [
  // Validation and sanitization
  body('name').notEmpty().withMessage('Name is required').trim().escape(),
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('phone_number').isMobilePhone().withMessage('Invalid phone number').optional().trim().escape(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').trim().escape(),
  body('role').isIn(['admin', 'provider', 'customer']).withMessage('Invalid role').trim().escape(),

  // Controller function
  async (req, res) => {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone_number, password, role } = req.body;

    try {
      // Check if user exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      const user = await User.create({
        name,
        email,
        phone_number,
        password,
        role
      });

      // Return token and user data
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
        token: generateToken(user._id)
      });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  }
];

// Login user
exports.loginUser = [
  // Validation and sanitization
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required').trim(),

  // Controller function
  async (req, res) => {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });

      // Check if user exists and passwords match
      if (user && (await user.matchPassword(password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
          role: user.role,
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  }
];

// Get user profile (protected route)
exports.getUserProfile = async (req, res) => {
  const user = req.user; // User is attached by the middleware

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
