import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import bookingImg from '../images/bookingimg.jpg';
import electricianImg from '../images/electricianimg.jpg';
import salonImg from '../images/salonimg.jpg';
import spaImg from '../images/spaimg.jpg';
import plumberImg from '../images/plumberimg.jpg';
import paintingImg from '../images/paintingimg.jpg';

const images = [
  bookingImg,
  electricianImg,
  salonImg,
  spaImg,
  plumberImg,
  paintingImg,
];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <Box
      sx={{
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        minHeight: '100vh',
        overflowX: 'hidden', 
      }}
    >
      <Grid
        container
        direction="row"
        sx={{
          height: '100%', 
          flexDirection: { xs: 'column', md: 'row' }, 
        }}
      >
        
        <Grid
          item
          xs={12}
          md={6} 
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            bgcolor: '#f4f6f8',
          }}
        >
          <Container>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{
                fontWeight: '600',
                color: '#06354a',
                fontSize: { xs: '2rem', md: '3rem' }, 
              }}
            >
              Welcome to My App
            </Typography>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{
                fontWeight: '500',
                color: '#06354a',
                fontSize: { xs: '1.2rem', md: '1.5rem' }, 
              }}
            >
              Our Services
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{
                color: '#555',
                textAlign: 'center',
                mb: 4,
                lineHeight: 1.6,
                fontSize: { xs: '0.9rem', md: '1rem' }, 
              }}
            >
              We offer a range of high-quality services tailored to meet your needs. Our experienced professionals are dedicated to delivering exceptional results and ensuring customer satisfaction.
            </Typography>

            
            <Grid container spacing={4}>
              {[
                { title: 'Home Services', description: 'We provide various home services including cleaning, plumbing, and electrical repairs.', color: '#e3f2fd' },
                { title: 'Beauty Services', description: 'Pamper yourself with our salon services, ranging from haircuts to spa treatments.', color: '#fce4ec' },
                { title: 'Painting Services', description: 'Our professional painters ensure a flawless finish for your home or office.', color: '#ffe0b2' },
                { title: 'Event Bookings', description: 'We help you plan and book your special events, ensuring everything runs smoothly.', color: '#e1bee7' },
              ].map((service, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: '10px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      bgcolor: service.color,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: '600', color: '#333', fontSize: { xs: '1rem', md: '1.2rem' } }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#555', mt: 1, fontSize: { xs: '0.8rem', md: '0.9rem' } }}
                    >
                      {service.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>

        
        <Grid
          item
          xs={12}
          md={6} 
          sx={{
            position: 'relative',
            height: '110vh', 
            width: '100%', 
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {images.map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              alt={`Image ${index + 1}`}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: index === currentImageIndex ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
              }}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
