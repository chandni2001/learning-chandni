const mongoose = require('mongoose');

const serviceNameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ServiceName', serviceNameSchema);
