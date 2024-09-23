
import { UPDATE_CONSUMER_ADDRESS } from '../actions/consumerActions';

const initialState = {
  address: null,
};

const consumerReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CONSUMER_ADDRESS:
      return { ...state, address: action.payload.address }; 
    case 'SET_CONSUMER_DETAILS':
      return { ...state, address: action.payload.address};
    default:
      return state;
  }
};


export default consumerReducer;
