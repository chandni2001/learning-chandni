// models/Task.js

const mongoose = require('mongoose');

// Define the Task Schema
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Task name is required'],
    },
    description: {
        type: String,
        required: [true, 'Task description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Task price is required'],
        min: [0, 'Price cannot be negative'],
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: [true, 'Service is required']
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
