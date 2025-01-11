import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   token: null,
   userData: null,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      authenticate: (state, action) => {
         const { payload } = action;
         state.token = payload.token;
         state.userData = payload.userData;
      },
   },
});

export const authenticate = authSlice.actions.authenticate;
export const authReducer = authSlice.reducer;
