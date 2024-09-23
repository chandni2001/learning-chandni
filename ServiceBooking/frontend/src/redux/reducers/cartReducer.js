


const initialState = {
  count: 0,
  bookingDetails: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'UPDATE_CART_COUNT':
          return { ...state, count: action.payload };
      case 'RESET_CART_COUNT':
          return { ...state, count: 0 }; 
      case 'ADD_BOOKING_DETAILS':
          return { ...state, bookingDetails: action.payload };
      default:
          return state;
  }
};

export default cartReducer;
