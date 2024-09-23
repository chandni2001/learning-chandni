const mongoose = require('mongoose');

const ConsumerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    address: {
      type: String,
      
  },
    role: {
        type: String,
        default: 'consumer',
    },
});

module.exports = mongoose.model('Consumer', ConsumerSchema);
