const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for registering a new user
router.post('/register', registerUser);

// Route for logging in an existing user
router.post('/login', loginUser);

// Protected route for getting user profile
router.get('/profile', protect, getUserProfile);

module.exports = router;
