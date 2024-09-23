
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProviderBookings } from '../services/api';
import { Grid, Paper, Typography, Tabs, Tab, Card, CardContent, Button } from '@mui/material';
import { selectUser } from './selectors';

const ProviderBookingsPage = () => {
  const user = useSelector(selectUser);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      if (user && user._id) {
        try {
          const response = await fetchProviderBookings(user._id);
          setBookings(response.data);
        } catch (error) {
          console.error('Error fetching provider bookings:', error);
          setError('Failed to fetch bookings');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <div>No user data available. Please log in.</div>;
  }

  const upcomingBookings = bookings.filter(booking => booking.status === 'upcoming' || booking.status === 'ongoing');
  const completedBookings = bookings.filter(booking => booking.status === 'completed');
  const incompleteBookings = bookings.filter(booking => booking.status === 'incomplete');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderBookingCards = (bookingList) => (
    bookingList.map((booking) => (
      <Grid item xs={12} sm={6} md={4} key={booking._id}>
        <Card sx={{ backgroundColor: '#dbf0f9', margin: '10px', borderRadius: '8px' }}>
          <CardContent>
            <Typography variant="h6">{booking.service?.name || 'N/A'}</Typography>
            <Typography>Consumer: {booking.consumer?.username || 'N/A'}</Typography>
            <Typography>Category: {booking.category?.name || 'N/A'}</Typography>
            <Typography>Rating: {booking.rating || 'N/A'}</Typography>
            <Typography>Status: {booking.status}</Typography>
            
            {(booking.status === 'upcoming' || booking.status === 'ongoing') && (
              <Button onClick={() => navigate(`/verification/${booking._id}`)} variant="contained" color="primary" sx={{ marginTop: '10px' }}>
                Verify Booking
              </Button>
            )}
          </CardContent>
        </Card>
      </Grid>
    ))
  );

  return (
    <div style={{ paddingTop: '60px' }}> 
      <Paper>
        <Grid container spacing={3} sx={{ padding: { xs: '10px', md: '20px' } }}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Provider Bookings
            </Typography>
            <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
              <Tab label="Upcoming and Ongoing" />
              <Tab label="Completed" />
              <Tab label="Incomplete" />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {tabValue === 0 && renderBookingCards(upcomingBookings)}
              {tabValue === 1 && renderBookingCards(completedBookings)}
              {tabValue === 2 && renderBookingCards(incompleteBookings)}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ProviderBookingsPage;
