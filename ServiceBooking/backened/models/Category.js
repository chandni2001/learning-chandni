const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }]
}
);

module.exports = mongoose.model('Category', CategorySchema);
