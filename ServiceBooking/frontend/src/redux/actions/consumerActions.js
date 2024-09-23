
import axios from 'axios';

export const UPDATE_CONSUMER_ADDRESS = 'UPDATE_CONSUMER_ADDRESS';

export const updateConsumerAddress = (id, address) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/auth/consumer/${id}`,
      { address } 
    );
    dispatch({
      type: UPDATE_CONSUMER_ADDRESS,
      payload: response.data.consumer, 
    });
  } catch (error) {
    console.error('Error updating address:', error);
  }
};

export const fetchConsumerDetails = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/auth/consumer/${id}`);
    dispatch({ type: 'SET_CONSUMER_DETAILS', payload: response.data });
  } catch (error) {
    console.error('Error fetching consumer details:', error);
  }
};