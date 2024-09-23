

import { uploadImages, generateOtp, verifyOtp } from '../../services/verificationService';
import { updateBookingStatus } from '../../services/verificationService';


export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const GENERATE_OTP_SUCCESS = 'GENERATE_OTP_SUCCESS';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFICATION_FAILED = 'VERIFICATION_FAILED';
export const UPDATE_BOOKING_STATUS_SUCCESS = 'UPDATE_BOOKING_STATUS_SUCCESS';
export const UPDATE_BOOKING_STATUS_FAILURE = 'UPDATE_BOOKING_STATUS_FAILURE';


export const uploadImagesAction = (image1, image2, phoneNumber,bookingId) => async (dispatch) => {
    try {
        const response = await uploadImages(image1, image2, phoneNumber,bookingId);
        dispatch({ type: UPLOAD_IMAGES_SUCCESS, payload: response });
    } catch (error) {
        dispatch({ type: VERIFICATION_FAILED, payload: error.message });
    }
};

export const generateOtpAction = (phoneNumber) => async (dispatch) => {
    try {
        const response = await generateOtp(phoneNumber);
        dispatch({ type: GENERATE_OTP_SUCCESS, payload: response });
    } catch (error) {
        dispatch({ type: VERIFICATION_FAILED, payload: error.message });
    }
};

export const verifyOtpAction = (phoneNumber, otpCode) => async (dispatch) => {
    try {
        const response = await verifyOtp(phoneNumber, otpCode);
        dispatch({ type: VERIFY_OTP_SUCCESS, payload: response });
    } catch (error) {
        dispatch({ type: VERIFICATION_FAILED, payload: error.message });
    }
};
export const updateBookingStatusAction = (bookingId, status) => async (dispatch) => {
    try {
        const response = await updateBookingStatus(bookingId, status);
        dispatch({ type: UPDATE_BOOKING_STATUS_SUCCESS, payload: response });
    } catch (error) {
        dispatch({ type: UPDATE_BOOKING_STATUS_FAILURE, payload: error.message });
    }
};