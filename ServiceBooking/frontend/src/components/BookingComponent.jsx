
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, TextField, Button, Box, Card, Grid, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { updateCartCount, addBookingDetails } from '../redux/actions/cartActions';
import bookingImg from '../images/bookingimg.jpg'; 

const BookingComponent = () => {
  const location = useLocation();
  const { provider } = location.state || {};
  const dispatch = useDispatch();
  const [consumerName, setConsumerName] = useState('');
  const consumerDetails = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (consumerDetails) {
      setConsumerName(consumerDetails.username);
    }
  }, [consumerDetails]);

  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const selectedService = useSelector((state) => state.categories.selectedService);
  const isLargerThan600px = useMediaQuery('(min-width:601px)'); 
  const formik = useFormik({
    initialValues: {
      startDate: '',
      endDate: '',
    },
    onSubmit: async (values) => {
      const { startDate, endDate } = values;

      const bookingData = {
        provider: provider?._id,
        consumer: consumerDetails._id,
        category: selectedCategory?._id,
        service: selectedService?._id,
        timeslot: [new Date(startDate)], 
      };

      const bookingDataDetails = {
        provider: provider?.username,
        consumer: consumerDetails.username,
        category: selectedCategory?.name,
        service: selectedService?.name,
        startDate,
        endDate,
      };

      try {
        const response = await axios.post('http://localhost:3000/api/booking', bookingData);
        if (response.status === 201) {
          dispatch(updateCartCount(1));
          dispatch(addBookingDetails(bookingDataDetails));
          alert('Service successfully booked!');
        }
      } catch (error) {
        console.error('Error booking the service:', error);
        alert('Failed to book the service. Please try again.');
      }
    },
  });

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Grid container sx={{ flexGrow: 1 }}>
        
        <Grid item xs={12} md={6} sx={{ padding: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card sx={{ backgroundColor: '#cbedfb', padding: 2 }}>
                <Typography variant="h6">Provider Name</Typography>
                <Typography variant="body1">{provider.username}</Typography>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ backgroundColor: '#cbedfb', padding: 2 }}>
                <Typography variant="h6">Consumer Name</Typography>
                <Typography variant="body1">{consumerName}</Typography>
              </Card>
            </Grid>
          </Grid>

          
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={6}>
              <Card sx={{ backgroundColor: '#cbedfb', padding: 2 }}>
                <Typography variant="h6">Category</Typography>
                <Typography variant="body1">{selectedCategory?.name || ''}</Typography>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ backgroundColor: '#cbedfb', padding: 2 }}>
                <Typography variant="h6">Service</Typography>
                <Typography variant="body1">{selectedService?.name || ''}</Typography>
              </Card>
            </Grid>
          </Grid>

          
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={6}>
              <Card sx={{ backgroundColor: '#cbedfb', padding: 2 }}>
                <Typography variant="h6">Start Date</Typography>
                <TextField
                  type="date"
                  fullWidth
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ backgroundColor: '#cbedfb', padding: 2 }}>
                <Typography variant="h6">End Date</Typography>
                <TextField
                  type="date"
                  fullWidth
                  name="endDate"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Card>
            </Grid>
          </Grid>

          
          <Grid container sx={{ marginTop: 2 }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#62bed1', color: 'white', width: '100%' }}
                onClick={formik.handleSubmit}
                disabled={!formik.values.startDate || !formik.values.endDate}
              >
                Book Service
              </Button>
            </Grid>
          </Grid>
        </Grid>

        
        {isLargerThan600px && (
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img
              src={bookingImg}
              alt="Booking"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '10px',
                boxShadow: '0 1px 8px rgba(0,0,0,0.1)',
                opacity: 0.7,
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default BookingComponent;









