import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { setUser } from '../redux/reducers/userSlice';
import { TextField, Button, Typography, Container, Card, Grid } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import loginImage from '../images/loginimg.jpg'; 

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const res = await login(values);
      const userDetails = res.data.userDetails;
      const token = res.data.token;

      dispatch(setUser({ user: userDetails, token }));
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userDetails));

      setIsLoggedIn(true);

      if (userDetails.role === 'consumer') {
        navigate('/consumer-dashboard');
      } else if (userDetails.role === 'provider') {
        navigate('/provider-bookings');
      }
    } catch (err) {
      console.error('Invalid credentials');
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
          height: '450px', 
        }}
      >
        <Grid container>
          <Grid item xs={false} sm={6} style={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            <img src={loginImage} alt="Login" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Grid>

          <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div style={{ width: '100%' }}>
              <Typography variant="h5" align="center" gutterBottom style={{ fontSize: '24px' }}>
                Login
              </Typography>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {() => (
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
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                          Login
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

export default Login;
