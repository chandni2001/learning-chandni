const { body, param, validationResult } = require('express-validator');
const Service = require('../models/Service');
const Category = require('../models/Category');

// Middleware for validating and sanitizing service input
exports.validateService = [
  body('name')
    .isString().withMessage('Service name must be a string')
    .trim()
    .notEmpty().withMessage('Service name is required')
    .escape(),
  body('description')
    .isString().withMessage('Description must be a string')
    .trim()
    .notEmpty().withMessage('Description is required')
    .escape(),
  body('price')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number')
    .notEmpty().withMessage('Price is required'),
  body('category')
    .isMongoId().withMessage('Category must be a valid MongoDB ID')
    .notEmpty().withMessage('Category ID is required')
];

// Create a new service (Provider and Admin only)
exports.createService = [
  exports.validateService,
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, category } = req.body;
    const serviceProvider = req.user._id; // Extract serviceProvider from authenticated user

    try {
      // Check if the category exists
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res.status(400).json({ message: 'Category does not exist' });
      }

      // Create and save the new service
      const service = await Service.create({
        name,
        description,
        price,
        category,
        serviceProvider
      });

      res.status(201).json(service);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];

// Middleware for validating and sanitizing category name input
exports.validateCategoryName = [
  param('categoryName')
    .isString().withMessage('Category name must be a string')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .escape()
];

// Get all services by category name
exports.getServicesByCategory = [
  exports.validateCategoryName,
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { categoryName } = req.params;

    try {
      // Find the category by name
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      // Fetch services associated with the found category
      const services = await Service.find({ category: category._id }).populate('category').populate('serviceProvider');

      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
];




