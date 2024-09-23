

export const setSelectedCategory = (category) => (dispatch) => {
  localStorage.setItem('selectedCategory', JSON.stringify(category));

  dispatch({
    type: 'SET_SELECTED_CATEGORY',
    payload: category,
  });
};

export const setSelectedService = (service) => (dispatch) => {
  localStorage.setItem('selectedService', JSON.stringify(service));

  dispatch({
    type: 'SET_SELECTED_SERVICE',
    payload: service,
  });
};
