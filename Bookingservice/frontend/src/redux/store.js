import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk } from 'redux-thunk'; // Named import for thunk
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk) // Apply thunk middleware
);

export default store;
