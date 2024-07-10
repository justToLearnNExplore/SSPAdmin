// src/redux/store.js
import { combineReducers } from 'redux';
import authReducer from './auth'; // Adjust the path based on your project structure

export const reducers = combineReducers({auth: authReducer}); 
