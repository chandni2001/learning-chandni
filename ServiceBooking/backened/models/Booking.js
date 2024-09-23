
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },
    consumer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    status: {
        type: String,
        enum: ['incomplete', 'ongoing', 'completed', 'upcoming'],
        default: 'upcoming'
    },
    feedback: {
        type: String,
        trim: true
    },
    timeslot: {  
        type: [Date],  
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
