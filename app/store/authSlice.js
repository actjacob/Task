import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   token: null,
   userData: null,
   didTryAutoLogin: false,
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
      setDidTryAutoLogin: (state, action) => {
         state.didTryAutoLogin = true;
      },
   },
});

export const setDidTryAutoLogin = authSlice.actions.setDidTryAutoLogin;
export const authenticate = authSlice.actions.authenticate;
export const authReducer = authSlice.reducer;
