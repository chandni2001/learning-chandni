const mongoose = require('mongoose');

// Define the Rating schema
const ratingSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Export the Rating model
module.exports = mongoose.model('Rating', ratingSchema);
