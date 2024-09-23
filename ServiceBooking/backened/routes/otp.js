const express = require('express');
const router = express.Router();
const { generateAndCreateOtp, validateOtp } = require('../controllers/otp');


router.post('/generate', generateAndCreateOtp);
router.post('/validate', validateOtp);

module.exports = router;
