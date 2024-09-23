
const initialState = {
  categories: [],
  loading: false,
  error: null,
  selectedCategory: JSON.parse(localStorage.getItem('selectedCategory')) || null, 
  selectedService: JSON.parse(localStorage.getItem('selectedService')) || null,   
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'SET_CATEGORIES':
          return {
              ...state,
              categories: action.payload,
          };
      case 'SET_SELECTED_CATEGORY':
          
          localStorage.setItem('selectedCategory', JSON.stringify(action.payload));
          return {
              ...state,
              selectedCategory: action.payload,
          };
      case 'SET_SELECTED_SERVICE':
          
          localStorage.setItem('selectedService', JSON.stringify(action.payload));
          return {
              ...state,
              selectedService: action.payload,
          };
      default:
          return state;
  }
};

export default categoryReducer;
