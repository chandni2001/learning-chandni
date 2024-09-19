const express = require('express');
const { createCategory, getAllCategories } = require('../controllers/categoryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for creating a new category (Admin only)
router.post('/', protect, adminOnly, createCategory);

// Route for getting all categories
router.get('/', getAllCategories);

module.exports = router;
