const express = require('express');
const { createService, getServicesByCategory } = require('../controllers/serviceController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for creating a new service (Providers and Admins only)
router.post('/', protect, adminOnly, createService);

// Route for getting all services by category name
router.get('/category/:categoryName', getServicesByCategory);

module.exports = router;


