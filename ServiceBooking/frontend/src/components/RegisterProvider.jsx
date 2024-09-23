
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/authActions';
import axios from 'axios';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Container,
  Grid,
  Card,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import registerImg from '../images/registerimg.jpg';


const validationSchema = Yup.object({
  username: Yup.string()
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  mobile: Yup.string()
    .length(10, 'Mobile number must be exactly 10 digits')
    .required('Mobile number is required')
    .matches(/^[0-9]+$/, 'Mobile number must be digits only'),
  services: Yup.array()
    .of(
      Yup.object().shape({
        service: Yup.string().required('Service is required'),
        price: Yup.number().required('Price is required').positive().integer(),
      })
    )
    .required('At least one service is required'),
});

const RegisterProvider = () => {
  const [categories, setCategories] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategoriesAndServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        const categoryData = response.data;
        const extractedCategories = categoryData.map(cat => ({
          id: cat._id,
          name: cat.name,
          services: cat.services.map(service => ({
            id: service._id,
            name: service.name,
          })),
        }));

        setCategories(extractedCategories);
      } catch (error) {
        console.error('Error fetching categories and services:', error);
      }
    };

    fetchCategoriesAndServices();
  }, []);

  return (
    <Container component="main" maxWidth="md" style={{ paddingTop: '64px' }}>
      <Card
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#dbf0f9',
          margin: 'auto',
          overflow: 'hidden',
          padding: '20px',
          minHeight: '80vh', 
        }}
      >
        <Grid container>
          
          <Grid item xs={false} sm={6} style={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            <img src={registerImg} alt="Register" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Grid>

          <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px' }}>
            <div style={{ width: '100%' }}>
              <Typography variant="h5" align="center" gutterBottom style={{ fontSize: '24px' }}>
                Register as Provider
              </Typography>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  mobile: '',
                  services: [{ service: '', price: '' }],
                  categories: [],
                  role: 'provider',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  try {
                    await dispatch(register(values));
                    navigate('/login');
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field name="username" as={TextField} label="Username" variant="outlined" fullWidth required helperText={<ErrorMessage name="username" />} error={Boolean(<ErrorMessage name="username" />)} />
                      </Grid>
                      <Grid item xs={12}>
                        <Field name="password" as={TextField} type="password" label="Password" variant="outlined" fullWidth required helperText={<ErrorMessage name="password" />} error={Boolean(<ErrorMessage name="password" />)} />
                      </Grid>
                      <Grid item xs={12}>
                        <Field name="mobile" as={TextField} label="Mobile" variant="outlined" fullWidth required helperText={<ErrorMessage name="mobile" />} error={Boolean(<ErrorMessage name="mobile" />)} />
                      </Grid>

                      
                      <Grid item xs={12}>
                        <FormControl fullWidth margin="normal">
                          <InputLabel>Category</InputLabel>
                          <Select
                            value={values.categories[0] || ''}
                            onChange={(e) => {
                              const selectedCategoryId = e.target.value;
                              const selectedServices = categories.find(category => category.id === selectedCategoryId)?.services || [];
                              setAvailableServices(selectedServices);
                              setFieldValue('categories', [selectedCategoryId]);
                              setFieldValue('services', [{ service: '', price: '' }]); 
                            }}
                          >
                            {categories.map((category) => (
                              <MenuItem key={category.id} value={category.id}>
                                {category.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      
                      {values.services.map((serviceData, index) => (
                        <Grid item xs={12} key={index}>
                          <FormControl fullWidth margin="normal">
                            <InputLabel>Service</InputLabel>
                            <Select
                              value={serviceData.service}
                              onChange={(e) => {
                                const updatedServices = [...values.services];
                                updatedServices[index].service = e.target.value;
                                setFieldValue('services', updatedServices);
                              }}
                            >
                              {availableServices.map((service) => (
                                <MenuItem key={service.id} value={service.id}>
                                  {service.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <Field name={`services.${index}.price`} as={TextField} type="number" label="Price (INR)" variant="outlined" fullWidth required helperText={<ErrorMessage name={`services.${index}.price`} />} error={Boolean(<ErrorMessage name={`services.${index}.price`} />)} />
                          <Button type="button" onClick={() => {
                            const updatedServices = [...values.services, { service: '', price: '' }];
                            setFieldValue('services', updatedServices);
                          }}>Add Service</Button>
                          {index > 0 && (
                            <Button type="button" onClick={() => {
                              const updatedServices = values.services.filter((_, i) => i !== index);
                              setFieldValue('services', updatedServices);
                            }}>Remove Service</Button>
                          )}
                        </Grid>
                      ))}

                      <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                          Register as Provider
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="text" color="primary" fullWidth onClick={() => navigate('/register-consumer')}>
                          Switch to Register as Consumer
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </div>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default RegisterProvider;
