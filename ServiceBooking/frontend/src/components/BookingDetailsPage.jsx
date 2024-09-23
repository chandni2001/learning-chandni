import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Snackbar, IconButton } from '@mui/material';
import RateService from './RateService'; // Import the RateService component
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';

const BookingDetailsPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/booking/${id}`);
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    };

    if (id) {
      fetchBooking();
    }
  }, [id]);

  const handleRatingClose = () => {
    setShowRatingForm(false);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!booking) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        Loading...
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Booking Details
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 1,
          padding: 2,
        }}
      >
        <Typography variant="h6">Service: {booking.service.name}</Typography>
        <Typography variant="h6">Provider: {booking.provider.username}</Typography>
        <Typography variant="h6">Category: {booking.category.name}</Typography>
        <Typography variant="h6">Rating: {booking.rating || 'Not rated yet'}</Typography>
        <Typography variant="body1">Feedback: {booking.feedback || 'No feedback yet'}</Typography>

        <Button
          variant="contained"
          onClick={() => setShowRatingForm(true)}
          sx={{ 
            marginTop: 2, 
            backgroundColor: '#437b92', 
            '&:hover': {
              backgroundColor: '#356679', 
            },
          }}
        >
          Rate Service
        </Button>
      </Box>

      {showRatingForm && (
        <RateService bookingId={id} onClose={handleRatingClose} />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Thank you for your rating!"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </Box>
  );
};

export default BookingDetailsPage;
