

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadImagesAction, verifyOtpAction, updateBookingStatusAction } from '../redux/actions/verificationActions';
import { Grid, Card, CardContent, Button, TextField, Typography, Snackbar, Hidden } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import verifyImg from '../images/verifyimg.avif'; 

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const VerificationForm = () => {
  const dispatch = useDispatch();
  const { bookingId } = useParams();
  const { otpValidated, bookingStatusUpdated } = useSelector(state => state);
  const navigate = useNavigate();

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/booking/${bookingId}`);
        const bookingDetails = response.data;
        setPhoneNumber(bookingDetails.consumer.mobile.replace('+91', ''));
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handleImageChange = (setter) => (e) => setter(e.target.files[0]);

  const handleUploadImages = () => {
    if (image1 && image2 && phoneNumber) {
      dispatch(uploadImagesAction(image1, image2, `+91${phoneNumber}`, bookingId));
      setSnackbarMessage('OTP sent to your mobile phone.');
      setOpenSnackbar(true);
    }
  };

  const handleVerifyOtp = () => {
    if (phoneNumber && otpCode) {
      dispatch(verifyOtpAction(`+91${phoneNumber}`, otpCode));
      setSnackbarMessage('OTP verified.');
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = () => {
    if (bookingId) {
      dispatch(updateBookingStatusAction(bookingId, "completed"));
      navigate('/providers-bookings');
    }
  };

  useEffect(() => {
    if (otpValidated) {
      setSnackbarMessage('OTP verified.');
      setOpenSnackbar(true);
    }
  }, [otpValidated]);

  useEffect(() => {
    if (bookingStatusUpdated) {
      setSnackbarMessage('Booking status updated to complete!');
      setOpenSnackbar(true);
    }
  }, [bookingStatusUpdated]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid container sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', margin: 0 }}>
      <Grid item xs={12} md={5} sx={{ padding: 1 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Verification
        </Typography>

        <Card sx={{ mb: 2, backgroundColor: '#cfecf8' }}>
          <CardContent>
            <Typography variant="subtitle1">Upload Images</Typography>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image1-upload"
              type="file"
              onChange={handleImageChange(setImage1)}
            />
            <label htmlFor="image1-upload">
              <Button variant="contained" component="span" fullWidth sx={{ backgroundColor: '#1f4352', mb: 1, '&:hover': { backgroundColor: '#58a2b0' } }}>
                Upload Image 1
              </Button>
            </label>
            {image1 && <Typography variant="caption">Uploaded: {image1.name}</Typography>}
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image2-upload"
              type="file"
              onChange={handleImageChange(setImage2)}
            />
            <label htmlFor="image2-upload">
              <Button variant="contained" component="span" fullWidth sx={{ backgroundColor: '#1f4352', mb: 1, '&:hover': { backgroundColor: '#58a2b0' } }}>
                Upload Image 2
              </Button>
            </label>
            {image2 && <Typography variant="caption">Uploaded: {image2.name}</Typography>}
          </CardContent>
        </Card>

        <Card sx={{ mb: 2, backgroundColor: '#cfecf8' }}>
          <CardContent>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button variant="contained" onClick={handleUploadImages} fullWidth sx={{ backgroundColor: '#1f4352', mt: 1, '&:hover': { backgroundColor: '#58a2b0' } }}>
              Send OTP
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ mb: 2, backgroundColor: '#cfecf8' }}>
          <CardContent>
            <TextField
              label="Enter OTP"
              variant="outlined"
              fullWidth
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />
            <Button variant="contained" onClick={handleVerifyOtp} fullWidth sx={{ backgroundColor: '#1f4352', mt: 1, '&:hover': { backgroundColor: '#58a2b0' } }}>
              Verify OTP
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: '#cfecf8' }}>
          <CardContent>
            <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ backgroundColor: '#1f4352', '&:hover': { backgroundColor: '#58a2b0' } }}>
              Submit
            </Button>
          </CardContent>
        </Card>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>

      <Hidden mdDown>
        <Grid item md={7} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={verifyImg} alt="Verification" style={{ width: '100%', maxWidth: '500px', borderRadius: '20px', objectFit: 'cover' }} />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default VerificationForm;
