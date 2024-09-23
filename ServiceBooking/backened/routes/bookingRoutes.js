const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking, getBookingsByProvider } = require('../controllers/bookingController');

// Create a new booking
router.post('/', createBooking);

// Get all bookings
router.get('/', getAllBookings);

// Get a single booking by ID
router.get('/:id', getBookingById);

// Update a booking by ID
router.put('/:bookingId', updateBooking);

// Delete a booking by ID
router.delete('/:id', deleteBooking);
router.get('/provider/:providerId', getBookingsByProvider);
module.exports = router;