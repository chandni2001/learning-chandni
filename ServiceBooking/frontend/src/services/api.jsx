

import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

export const register = async (data) => {
  console.log(data);
  return await axios.post(`${API_URL}/auth/register`, data);
};

export const login = async (data) => {
  return await axios.post(`${API_URL}/auth/login`, data);
};

export const fetchProviderBookings = async (providerId) => {
  return await axios.get(`${API_URL}/booking/provider/${providerId}`);
};
