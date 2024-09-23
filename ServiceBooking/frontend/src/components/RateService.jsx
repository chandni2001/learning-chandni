import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Snackbar, TextField, Button, Alert, Box, Typography, Rating } from '@mui/material';
import { setUser } from '../redux/reducers/userSlice'; 

const RateService = ({ bookingId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/booking/${bookingId}`, {
        rating,
        feedback,
      });

      setSuccess('Rating submitted successfully!');
      setRating(0);
      setFeedback('');
      if (onClose) onClose(); 
    } catch (error) {
      setError('Failed to submit rating. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        position: 'relative', 
        top: '30px', 
        margin: '0 auto', 
         
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Rate Service
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            precision={0.5}
            sx={{ marginBottom: 2 }}
            size="large"
          />
          <TextField
            label="Feedback"
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            fullWidth
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#437b92', 
            '&:hover': {
              backgroundColor: '#356679', 
            },
          }}
        >
          Submit
        </Button>
      </form>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success">{success}</Alert>
      </Snackbar>
    </Box>
  );
};

export default RateService;
