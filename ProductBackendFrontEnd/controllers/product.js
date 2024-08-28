const { body, validationResult } = require('express-validator');
const Product = require('../models/product');

exports.createProduct = [
  body('name')
    .isLength({ min: 1 })
    .withMessage('Name is required'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number'),
  body('availability')
    .isIn(['available', 'not available'])
    .withMessage('Availability must be either "available" or "not available"'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, availability } = req.body;
    try {
      const product = new Product({ name, price, availability });
      const result = await product.save();
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
];

exports.getProducts = async (req, res, next) => {
  try {
    const results = await Product.find();
    res.json(results);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  const { name, price, availability } = req.body;
  const updateData = {};
  if (name) updateData.name = name;
  if (price) updateData.price = price;
  if (availability) updateData.availability = availability;

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated', product });
  } catch (err) {
    next(err);
  }
};

exports.findProductByName = async (req, res) => {
  const { name } = req.params;
  try {
    const products = await Product.find({ name: new RegExp(name, 'i') });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found with that name' });
    }
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: 'Error searching for products', error: err });
  }
};

exports.findProductByAvailability = async (req, res) => {
  const { availability } = req.params;
  try {
    const products = await Product.find({ availability });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found with that availability status' });
    }
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: 'Error searching for products', error: err });
  }
};

exports.findProductByPriceGreaterThan = async (req, res) => {
  const { price } = req.params;
  try {
    const products = await Product.find({ price: { $gt: price } });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found with price greater than specified value' });
    }
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: 'Error searching for products', error: err });
  }
};
