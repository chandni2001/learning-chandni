

import { UPDATE_CART_COUNT, RESET_CART_COUNT } from '../actionTypes/cartActionTypes';


export const updateCartCount = (count) => ({
    type: UPDATE_CART_COUNT,
    payload: count,
});


export const resetCartCount = () => ({
    type: RESET_CART_COUNT,
});


export const addBookingDetails = (details) => ({
    type: 'ADD_BOOKING_DETAILS',
    payload: details,
});
