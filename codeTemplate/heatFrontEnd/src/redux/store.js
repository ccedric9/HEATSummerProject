// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
