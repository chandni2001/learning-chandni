const express = require('express');
const { createBooking, getUserBookings, uploadImagesAndSendOTP, verifyOTP} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({dest:'uploads/'});
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const User = require('../models/User');

const router = express.Router();

// Route for creating a new booking
router.post('/', protect, createBooking);

// Route for getting all bookings for a user
router.get('/my-bookings', protect, getUserBookings);

// router.post('/:id/imgageupload',imgupload);

// router.post('/:id/imageupload', upload.fields([
//  { name: 'beforeimg', maxCount: 1 },
//  { name: 'afterimg', maxCount: 1 }
// ]), async (req, res) => {
//   try {
//    const booking = await Booking.findById(req.params.id);
//       console.log(booking);
//     if (!booking) return res.status(404).json({ error: 'Booking not found' });
  

//   const beforeimg = req.files['beforeimg'] ? req.files['beforeimg'][0].path : null;
//   const afterimg = req.files['afterimg'] ? req.files['afterimg'][0].path : null;
//   if (!beforeimg || !afterimg) {
//    return res.status(400).json({ error: 'Both beforeWorking and afterWorking files are required' });
//   }
  
//   booking.beforeimg = beforeimg;
//   booking.afterimg = afterimg;
//   booking.status = 'completed';
//   await booking.save();




//   res.json({ message: 'Booking completed with proof images', booking });
//  } catch (error) {
//     console.log(error);
//   res.status(500).json({ error: 'Error completing booking with proof images' });
//  }
// });

router.post('/:id/imageupload', protect, upload.fields([
  { name: 'beforeimg', maxCount: 1 },
  { name: 'afterimg', maxCount: 1 }
]), uploadImagesAndSendOTP);

// Route for verifying OTP and completing the booking
router.post('/:id/verify-otp', protect, verifyOTP);

module.exports = router;
