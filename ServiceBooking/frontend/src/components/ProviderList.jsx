
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardActions, Button, Typography, Grid, Hidden } from '@mui/material';
import Rating from '@mui/material/Rating'; 
import providerImg from '../images/providerimg.jpg'; 

const ProviderList = () => {
  const { serviceId } = useParams();
  const [providers, setProviders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/providers?serviceId=${serviceId}`);
        setProviders(response.data);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, [serviceId]);

  const handleProviderSelect = (provider) => {
    navigate('/booking', { state: { provider } });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ 
      backgroundColor: '#e8f0f2',
      minHeight: '100vh',
      padding: '40px 0',
    }}>
      <Card 
        variant="outlined" 
        style={{ 
          padding: '20px', 
          maxWidth: '700px', 
          margin: '20px auto', 
          display: 'flex', 
          backgroundColor: '#f5f5f5',
          borderRadius: '10px', 
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>Providers</Typography>
            {providers.map((provider) => (
              <Card 
                key={provider._id} 
                variant="outlined" 
                style={{ 
                  marginBottom: '10px', 
                  maxWidth: '250px', 
                  width: '100%', 
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' 
                }}
                sx={{ 
                  width: { xs: '100%', sm: '300px' }, 
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {provider.username}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Phone: {provider.mobile}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: ₹{provider.services.length > 0 ? provider.services[0].price.toLocaleString('en-IN') : 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Started from: {formatDate(provider.createdAt)}
                  </Typography>
                  <Rating 
                    name="provider-rating" 
                    value={provider.averageRating || 0} 
                    readOnly 
                    precision={0.5}
                  />
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    variant="contained" 
                    style={{ backgroundColor: '#8cd7da', color: '#484b4b' }} 
                    onClick={() => handleProviderSelect(provider)}
                  >
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} sm={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Hidden smDown>
              <img 
                src={providerImg} 
                alt="Provider"
                style={{ width: '280%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            </Hidden>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default ProviderList;




