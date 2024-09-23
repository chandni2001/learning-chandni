import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/reducers/userSlice';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import RegisterConsumer from './components/RegisterConsumer';
import RegisterProvider from './components/RegisterProvider';
import Login from './components/Login';
import ProviderBookingsPage from './components/ProviderBookingsPage';
import VerificationForm from './components/VerificationForm';
import BookingDetailsPage from './components/BookingDetailsPage';
import ServiceDetailsPage from './components/ServiceDetailsPage';
import ConsumerDashboard from './components/ConsumerDashboard';
import ProviderList from './components/ProviderList';
import BookingComponent from './components/BookingComponent';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';

const App = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      dispatch(setUser({ user, token }));
      setIsLoggedIn(true);
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setUser({ user: null, token: null }));
    setIsLoggedIn(false);
    navigate('/'); // Redirect to homepage
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/consumer-dashboard" /> : <HomePage />} />
        <Route path="/register-consumer" element={<RegisterConsumer />} />
        <Route path="/register-provider" element={<RegisterProvider />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/provider-bookings" element={<ProviderBookingsPage />} />
        <Route path="/verification/:bookingId" element={<VerificationForm />} />
        <Route path="/booking/:id" element={<BookingDetailsPage />} />
        <Route path="/service/:id" element={<ServiceDetailsPage />} />
        <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
        <Route path="/booking" element={<BookingComponent />} />
        <Route path="/providers/:serviceId" element={<ProviderList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
