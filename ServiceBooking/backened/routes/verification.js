const express = require('express');
const router = express.Router();
const { createVerification,validateOtp } = require('../controllers/verificationController');
const upload = require('../middlewares/multer');

// Route to handle image upload, OTP generation, and SMS sending
router.post('/', upload, createVerification);
router.post('/validate', upload, validateOtp);

module.exports = router;
