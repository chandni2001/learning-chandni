const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const Consumer = require('../models/Consumer');
const Provider = require('../models/Provider');
const User = require('../models/User');


const jwtSecret = 'your_jwt_secret';


exports.register = [
  
  check('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters'),
  check('mobile')
    .isLength({ min: 10, max: 10 })
    .withMessage('Mobile number must be exactly 10 digits')
    .isNumeric()
    .withMessage('Mobile number must only contain numbers'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, mobile, role, services } = req.body;

    try {
      
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      
      if (role === 'consumer' && services) {
        return res.status(400).json({ msg: 'Services are not allowed for consumer role' });
      }

      
      if (role === 'provider') {
        if (!services || services.length === 0) {
          return res.status(400).json({ msg: 'At least one service is required for provider role' });
        }

        
        for (let i = 0; i < services.length; i++) {
          if (!services[i].service || !services[i].price) {
            return res.status(400).json({
              msg: `Service and price are required for every service entry (missing at index ${i})`,
            });
          }
        }
      }

      
      let newUser;
      if (role === 'consumer') {
        newUser = new Consumer({ username, password, mobile });
      } else if (role === 'provider') {
        newUser = new Provider({
          username,
          password,
          mobile,
          services,
        });
      } else {
        return res.status(400).json({ msg: 'Invalid role' });
      }

      
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);

      
      const savedUser = new User({ username, password: newUser.password });
      await savedUser.save();
      await newUser.save();

      
      const payload = {
        user: { id: newUser.id, role: role },
      };
      jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  },
];


exports.login = [
  
  check('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      
      let user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      
      let roleUser = await Consumer.findOne({ username });
      if (!roleUser) {
        roleUser = await Provider.findOne({ username });
      }

      
      if (!roleUser) {
        return res.status(400).json({ msg: 'User not found in specific role' });
      }

      const role = roleUser.role;

      
      const payload = {
        user: {
          id: user.id,
          role,
        },
      };

      
      jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;

        
        res.json({
          token,
          userDetails: roleUser,
        });
      });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  },
];


exports.getProviders = async (req, res) => {
  const { serviceId } = req.query;

  try {
    const providers = await Provider.find({
      services: { $elemMatch: { service: serviceId } }
    }).populate('services.service'); 
    res.json(providers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.getAllProviders = async (req, res) => {
  try {
    const providers = await Provider.find().populate('services');
    res.json(providers);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.updateConsumer = async (req, res) => {
  const { id } = req.params;
  const { username, password, mobile, address } = req.body;

  try {
    
    let consumer = await Consumer.findById(id);
    if (!consumer) {
      return res.status(404).json({ msg: 'Consumer not found' });
    }

    
    if (username) consumer.username = username;
    if (mobile) consumer.mobile = mobile;
    if (address !== undefined) consumer.address = address; 

    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      consumer.password = await bcrypt.hash(password, salt);
    }

    
    await consumer.save();

    res.json({ msg: 'Consumer details updated', consumer });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};


exports.getConsumerById = async (req, res) => {
  const { id } = req.params;

  try {
    const consumer = await Consumer.findById(id);
    if (!consumer) {
      return res.status(404).json({ msg: 'Consumer not found' });
    }

    res.json(consumer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
