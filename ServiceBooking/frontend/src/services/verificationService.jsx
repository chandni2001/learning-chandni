

import axios from 'axios';

export const uploadImages = async (image1, image2, phoneNumber,bookingId) => {
    const formData = new FormData();
    formData.append('image1', image1);
    formData.append('image2', image2);
    formData.append('phoneNumber', phoneNumber);
    formData.append('bookingId',bookingId)

    
    for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
        const response = await axios.post('http://localhost:3000/api/verify', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
    }
};

export const generateOtp = async (phoneNumber) => {
    try {
        const response = await axios.post('http://localhost:3000/api/verify', { phoneNumber });
        return response.data;
    } catch (error) {
        console.error('Error generating OTP:', error);
        throw error;
    }
};

export const verifyOtp = async (phoneNumber, otpCode) => {
    try {
        const response = await axios.post('http://localhost:3000/api/verify/validate', { phoneNumber, otpCode });
        return response.data;
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw error;
    }
};
export const updateBookingStatus = async (bookingId,status) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/booking/${bookingId}`, {
      status  
    });
    console.log("Booking updated:", response.data);
  } catch (error) {
    console.error("Error updating booking:", error);
  }
};