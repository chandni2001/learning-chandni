const { body, validationResult } = require('express-validator');
const ServiceName = require('../models/ServiceName');
const Category = require('../models/Category');

// Middleware to validate the service input
exports.validateService = [
  body('name')
    .isString().withMessage('Service name must be a string')
    .trim()
    .notEmpty().withMessage('Service name is required')
    .escape(),
  body('categoryId')
    .isMongoId().withMessage('Valid category ID is required')
];

// Create a new service under a specific category (Admin only)
exports.createService = [
  exports.validateService,
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, categoryId } = req.body;

    try {
      // Check if the category exists
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      // Create and save the new service
      const service = new ServiceName({ name, category: categoryId });
      await service.save();

      res.status(201).json({ message: 'Service created successfully', service });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }
];

// Get all services for a specific category by category ID
exports.getServicesByCategoryId = async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Find all services under the category
    const services = await ServiceName.find({ category: categoryId }).populate('category', 'name');
    if (!services.length) {
      return res.status(404).json({ message: 'No services found for this category' });
    }

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
