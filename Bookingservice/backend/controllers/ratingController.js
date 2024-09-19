const Rating = require('../models/Rating');
const Service = require('../models/Service');
const User = require('../models/User');

// Create a new rating
exports.createRating = async (req, res) => {
  const { comment, score, serviceId } = req.body;
  const userId = req.user._id; // Get userId from authenticated user

  try {
    // Check if the service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(400).json({ message: 'Service does not exist' });
    }

    // Create and save the new rating
    const rating = await Rating.create({
      comment,
      score,
      service: serviceId,
      user: userId,
    });

    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all ratings for a service
exports.getServiceRatings = async (req, res) => {
  const { serviceId } = req.params;

  try {
    // Check if the service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(400).json({ message: 'Service does not exist' });
    }

    // Fetch ratings for the service
    const ratings = await Rating.find({ service: serviceId }).populate('user');

    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.submitReview = async (req, res) => {
  const { userName, userEmail, score, comment, serviceId } = req.body;

  try {
    // Find user by email (or you could handle user registration if not found)
    let user = await User.findOne({ email: userEmail });
    if (!user) {
      // Create a new user or return an error
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(400).json({ message: 'Service does not exist' });
    }

    // Create and save the new rating
    const rating = await Rating.create({
      comment,
      score,
      service: serviceId,
      user: user._id,
    });

    res.status(201).json(rating);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
