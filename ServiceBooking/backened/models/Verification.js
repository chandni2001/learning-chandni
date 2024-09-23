const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    isVerified: { type: Boolean, default: false }, 
});

module.exports = mongoose.model('Verification', VerificationSchema);
