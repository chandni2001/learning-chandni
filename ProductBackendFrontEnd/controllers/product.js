const { body, validationResult } = require('express-validator');
const Product = require('../models/product');

// Create a new product
exports.createProduct = [
    body('name').isLength({ min: 1 }).withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('availability').isIn(['available', 'not available']).withMessage('Availability must be either "available" or "not available"'),
    async function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, price, availability } = req.body;
        const product = new Product({ name, price, availability });
        const result = await product.save();
        res.status(201).json(result);
    }
];

// Get all products
exports.getProducts = async function (req, res, next) {
    const results = await Product.find();
    res.json(results);
};

// Get a single product by ID
exports.getProductById = async function (req, res, next) {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
};

// Delete a product by ID
exports.deleteProduct = async function (req, res, next) {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
};

// Update a product by ID
exports.updateProduct = async function (req, res, next) {
    const { name, price, availability } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (price) updateData.price = price;
    if (availability) updateData.availability = availability;

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated', product });
};

// Search products by name
exports.findProductByName = async (req, res) => {
    const { name } = req.params;
    try {
        const products = await Product.find({ name: new RegExp(name, 'i') });
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found with that name" });
        }
        res.json(products);
    } catch (err) {
        res.status(400).json({ message: "Error searching for products", error: err });
    }
};

exports.findProductByAvailability = async (req, res) => {
    const { availability } = req.params;
    try {
        const products = await Product.find({ availability });
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found with that availability status" });
        }
        res.json(products);
    } catch (err) {
        res.status(400).json({ message: "Error searching for products", error: err });
    }
};

exports.findProductByPriceGreaterThan = async (req, res) => {
    const { price } = req.params;
    try {
        const products = await Product.find({ price: { $gt: price } });
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found with price greater than specified value" });
        }
        res.json(products);
    } catch (err) {
        res.status(400).json({ message: "Error searching for products", error: err });
    }
};
