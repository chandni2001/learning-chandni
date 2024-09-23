import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Box, Card, CardContent, Button, Snackbar, IconButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Cart = () => {
  const bookingDetails = useSelector((state) => state.cart.bookingDetails);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handlePayment = () => {
    setSnackbarOpen(true);
    setCashOnDelivery(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>Booking Details</Typography>

      {/* Booking Details Grid */}
      <Grid container spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
        {bookingDetails ? (
          <>
            <Grid item xs={12}>
              <Card sx={{ mb: 2, boxShadow: 2, backgroundColor: '#cbedfb' }}>
                <CardContent>
                  <Typography variant="h6">Provider</Typography>
                  <Typography variant="body1">{bookingDetails.provider}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ mb: 2, boxShadow: 2, backgroundColor: '#cbedfb' }}>
                <CardContent>
                  <Typography variant="h6">Consumer</Typography>
                  <Typography variant="body1">{bookingDetails.consumer}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ mb: 2, boxShadow: 2, backgroundColor: '#cbedfb' }}>
                <CardContent>
                  <Typography variant="h6">Category</Typography>
                  <Typography variant="body1">{bookingDetails.category}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ mb: 2, boxShadow: 2, backgroundColor: '#cbedfb' }}>
                <CardContent>
                  <Typography variant="h6">Service</Typography>
                  <Typography variant="body1">{bookingDetails.service}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ mb: 2, boxShadow: 2, backgroundColor: '#cbedfb' }}>
                <CardContent>
                  <Typography variant="h6">Start Date</Typography>
                  <Typography variant="body1">{new Date(bookingDetails.startDate).toLocaleDateString() || 'N/A'}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ mb: 2, boxShadow: 2, backgroundColor: '#cbedfb' }}>
                <CardContent>
                  <Typography variant="h6">End Date</Typography>
                  <Typography variant="body1">{new Date(bookingDetails.endDate).toLocaleDateString() || 'N/A'}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        ) : (
          <Typography>No booking details available.</Typography>
        )}
      </Grid>

      {/* Payment Method Section */}
      <Box sx={{ marginTop: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>Payment Mode</Typography>
        <Card
          sx={{
            marginBottom: '20px',
            cursor: 'pointer',
            border: cashOnDelivery ? '2px solid #3f51b5' : '1px solid #ccc',
            width: '100%',
            maxWidth: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80px',
            backgroundColor: '#cbedfb',
          }}
          onClick={() => setCashOnDelivery(!cashOnDelivery)}
        >
          <CardContent>
            <Typography variant="h6">Cash on Delivery</Typography>
            <Typography variant="body2">{cashOnDelivery ? 'Selected' : 'Not Selected'}</Typography>
          </CardContent>
        </Card>
      </Box>

      
      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        sx={{ mt: 2 }}
        disabled={!cashOnDelivery}  
      >
        Payment
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Service Booked"
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

export default Cart;
