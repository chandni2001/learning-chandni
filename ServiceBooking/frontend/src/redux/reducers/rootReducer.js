

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import cartReducer from './cartReducer';
import userSlice from './userSlice';
import verificationReducer from './verificationReducer';
import consumerReducer from './consumerReducer'; 

export const rootReducer = combineReducers({
  cart: cartReducer,
  user: userSlice,
  auth: authReducer,
  categories: categoryReducer,
  verificationReducer: verificationReducer,
  consumer: consumerReducer, 
});
