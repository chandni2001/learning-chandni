const express = require('express');
const router = express.Router();
const { register, login,getProviders,getAllProviders, updateConsumer, getConsumerById } = require('../controllers/authController');

// Register User
router.post('/register', register);

// Login User
router.post('/login', login);

router.get('/providers', getProviders);
router.get('/providers/all', getAllProviders);
router.put('/consumer/:id', updateConsumer);
router.get('/consumer/:id', getConsumerById);
module.exports = router;
