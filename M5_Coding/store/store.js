import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postsReducer from './postSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postsReducer
  }
});