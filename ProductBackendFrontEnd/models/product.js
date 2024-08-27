const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: String, enum: ['available', 'not available'], required: true }
});

module.exports = mongoose.model('Product', ProductSchema);
