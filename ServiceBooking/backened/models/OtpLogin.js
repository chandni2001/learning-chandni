const mongoose = require('mongoose');

const otpLoginSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    otpCode: { type: String, required: true },
    isUsed: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model('OtpLogin', otpLoginSchema);