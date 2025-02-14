import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './store/authSlice';
import { boardReducer } from './store/boardSlice';

export const store = configureStore({
   reducer: {
      auth: authReducer,
      board: boardReducer,
   },
});
