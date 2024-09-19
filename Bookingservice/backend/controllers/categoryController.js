const { body, validationResult } = require('express-validator');
const Category = require('../models/Category');

// Middleware for validating and sanitizing category input
exports.validateCategory = [
  body('name')
    .isString().withMessage('Category name must be a string')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .escape()
];

// Create a new category (Admin only)
exports.createCategory = [
  exports.validateCategory,
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      // Check if the category already exists
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category already exists' });
      }

      // Create and save the new category
      const category = await Category.create({ name });

      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    // Fetch all categories
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
