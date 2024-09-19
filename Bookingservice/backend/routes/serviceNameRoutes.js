const express = require('express');
const { createService, getServicesByCategoryId } = require('../controllers/serviceNameController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new service under a category (Admin only)
router.post('/', protect, adminOnly, createService);

// Route to get all services under a category by category ID
router.get('/category/:categoryId', getServicesByCategoryId);

module.exports = router;
