import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import api from '../api';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  const fetchProductById = async (productId) => {
    try {
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h5">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            {product.name}
          </Typography>
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography variant="body1">Price: ${product.price}</Typography>
            <Typography variant="body1">
              Availability: {product.availability}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProductDetails;
