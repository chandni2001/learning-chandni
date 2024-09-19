import axios from 'axios';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Register User Action
export const registerUser = (userData) => {
    return async (dispatch) => {
        dispatch({ type: REGISTER_REQUEST });
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', userData);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: REGISTER_FAILURE,
                payload: error.response ? error.response.data.message : error.message,
            });
        }
    };
};

// Login User Action
export const loginUser = (credentials) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
            const { token } = response.data;
            localStorage.setItem('token', token); // Save the token to local storage
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: LOGIN_FAILURE,
                payload: error.response ? error.response.data.message : 'Login failed. Please check your credentials.',
            });
        }
    };
};
