import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, CardContent, Typography, TextField, Modal, Box } from '@mui/material';
import { setSelectedCategory, setSelectedService } from '../redux/actions/categoryActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import salon from '../images/salonimg.jpg';
import category2Img from '../images/electricianimg.jpg';
import category3Img from '../images/cleaning.jpg';
import category4Img from '../images/paintingimg.jpg';
import category5Img from '../images/spaimg.jpg';
import category6Img from '../images/plumberimg.jpg';


const serviceImages = [salon, category2Img, category3Img, category4Img, category5Img, category6Img];


const serviceImageMapping = {
  electrician: category2Img,
  cleaning: category3Img,
  painting: category4Img,
  spa: category5Img,
  plumber: category6Img,
};

const ConsumerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const categories = useSelector((state) => state.categories.categories || []);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const services = useSelector((state) => state.categories.selectedCategory?.services || []);

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        dispatch({ type: 'SET_CATEGORIES', payload: response.data });
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [dispatch]);

  
  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
    setOpenModal(true);
  };

  
  const handleServiceClick = (service) => {
    dispatch(setSelectedService(service));
    navigate(`/providers/${service._id}`);
  };

  
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h4" style={{ textAlign: 'center' }} gutterBottom>
          Categories
        </Typography>
        
        <TextField
          label="Search Categories"
          variant="outlined"
          margin="normal"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', maxWidth: '400px', marginBottom: '20px' }}
        />
      </div>

      <Grid container spacing={2}>
        {filteredCategories.map((category) => {
          const backgroundImage = serviceImageMapping[category.name.toLowerCase()] || salon;

          return (
            <Grid item xs={12} sm={6} md={4} key={category._id}>
              <Card
                variant="outlined"
                elevation={4}
                style={{
                  cursor: 'pointer',
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'white',
                  height: '250px',
                  transition: 'transform 0.3s',
                }}
                onClick={() => handleCategoryClick(category)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <CardContent
                  style={{
                    textAlign: 'left',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    padding: '10px',
                  }}
                >
                  <Typography variant="h5" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" style={{ marginTop: '8px', fontSize: '0.875rem' }}>
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%', 
            maxWidth: '600px', 
            bgcolor: '#e0f7fa', 
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
            outline: 'none',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Services in {selectedCategory?.name}
          </Typography>
          {services.length > 0 ? (
            services.map((service) => (
              <Card
                key={service._id}
                variant="outlined"
                style={{
                  margin: '10px 0',
                  backgroundColor: '#f0f0f0', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                    onClick={() => handleServiceClick(service)}
                  >
                    {service.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {service.description} 
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No services available
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ConsumerDashboard;
