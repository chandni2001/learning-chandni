const express = require('express');
const { createRating, getServiceRatings ,submitReview} = require('../controllers/ratingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for creating a new rating
router.post('/', protect, createRating);

// Route for getting all ratings for a specific service
router.get('/service/:serviceId', getServiceRatings);
router.post('/submit', submitReview);

module.exports = router;
