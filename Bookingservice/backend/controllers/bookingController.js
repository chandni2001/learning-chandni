const Booking = require('../models/Booking');
const Service = require('../models/Service');
const User = require('../models/User');
const multer = require('multer');
const upload = multer({dest:'uploads/'});
const twilio = require('twilio');
const dotenv=require('dotenv');
dotenv.config();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);


// Create a new booking
exports.createBooking = async (req, res) => {
  const { serviceId, serviceProviderId, bookingDate, status } = req.body;
  const userId = req.user._id; // Get userId from authenticated user

  try {
    // Check if the service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(400).json({ message: 'Service does not exist' });
    }

    // Check if the service provider exists
    const serviceProvider = await User.findById(serviceProviderId);
    if (!serviceProvider) {
      return res.status(400).json({ message: 'Service provider does not exist' });
    }

    // Create and save the new booking
    const booking = await Booking.create({
      userId,
      serviceId,
      serviceProviderId,
      bookingDate,
      status,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  const userId = req.user._id; // Get userId from authenticated user

  try {
    // Fetch bookings for the user
    const bookings = await Booking.find({ userId }).populate('serviceId').populate('serviceProviderId');

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



exports.uploadImagesAndSendOTP = async (req, res) => {
  try {
    console.log(req.user);
    
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    const beforeimg = req.files['beforeimg'] ? req.files['beforeimg'][0].path : null;
    const afterimg = req.files['afterimg'] ? req.files['afterimg'][0].path : null;
    if (!beforeimg || !afterimg) {
      return res.status(400).json({ error: 'Both beforeimg and afterimg files are required' });
    }

    // Update booking with image paths
    booking.beforeimg = beforeimg;
    booking.afterimg = afterimg;
    await booking.save();

    // Generate OTP and send via Twilio
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    booking.otp = otp;
    await booking.save();

    // Create a pre-filled Google Form link
    const googleFormURL = `https://docs.google.com/forms/d/e/FORM_ID/viewform?usp=pp_url&entry.1234567890=${req.user.name}&entry.0987654321=${req.user.email}`;

    // Send OTP and Google Form link via Twilio
    client.messages.create({
      body: `Your OTP for booking completion is ${otp}. Please complete your review at: ${googleFormURL}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.phone_number // User's phone number
    });

    res.json({ message: 'Images uploaded successfully. OTP and review form link sent for booking completion.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error uploading images and sending OTP' });
  }
};

// Verify OTP and complete booking
exports.verifyOTP = async (req, res) => {
  const { otp } = req.body;

  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    // Check if OTP matches
    if (booking.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // If OTP is correct, update booking status
    booking.status = 'completed';
    booking.otp = undefined; // Clear the OTP once it's verified
    await booking.save();

    res.json({ message: 'Booking completed successfully', booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error verifying OTP' });
  }
};






