import React from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { TextField, Button, Typography, Container, Card, Grid } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import registerImg from '../images/registerimg.jpg'; 

const RegisterConsumer = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
    mobile: '',
    role: 'consumer',
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be at most 20 characters')
      .required('Username is required'),
    mobile: Yup.string()
      .length(10, 'Mobile number must be exactly 10 digits')
      .matches(/^[0-9]+$/, 'Mobile number must only contain numbers')
      .required('Mobile number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await register(values);
      navigate('/login');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="lg" style={{ paddingTop: '64px' }}>
      <Card
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '800px',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          border: '5px solid transparent',
          backgroundColor: '#dbf0f9',
          position: 'relative',
          overflow: 'hidden',
          margin: 'auto',
        }}
      >
        <Grid container>
          
          <Grid item xs={false} sm={6} style={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            <img src={registerImg} alt="Register" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Grid>

          <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div style={{ width: '100%' }}>
              <Typography variant="h5" align="center" gutterBottom style={{ fontSize: '24px' }}>
                Register as Consumer
              </Typography>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          name="username"
                          as={TextField}
                          label="Username"
                          variant="outlined"
                          fullWidth
                          required
                          helperText={<ErrorMessage name="username" style={{ color: 'red' }} />}
                          error={Boolean(<ErrorMessage name="username" />)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          name="password"
                          as={TextField}
                          type="password"
                          label="Password"
                          variant="outlined"
                          fullWidth
                          required
                          helperText={<ErrorMessage name="password" style={{ color: 'red' }} />}
                          error={Boolean(<ErrorMessage name="password" />)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          name="mobile"
                          as={TextField}
                          label="Mobile"
                          variant="outlined"
                          fullWidth
                          required
                          helperText={<ErrorMessage name="mobile" style={{ color: 'red' }} />}
                          error={Boolean(<ErrorMessage name="mobile" />)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                          Register as Consumer
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="text"
                          color="primary"
                          fullWidth
                          onClick={() => navigate('/register-provider')}
                        >
                          Switch to Register as Provider
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

export default RegisterConsumer;
