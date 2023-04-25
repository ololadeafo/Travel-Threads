import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fields: {
    email: "",
    password: "",
  },
  isAuthenticated: false,
  errorMessage: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    handleEmailChange: (state, action) => {
      state.fields.email = action.payload;
    },
    handlePasswordChange: (state, action) => {
      state.fields.password = action.payload;
    },
    setAuthenticationStatus: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  handlePasswordChange,
  handleEmailChange,
  setAuthenticationStatus,
  reset,
} = loginSlice.actions;

export default loginSlice.reducer;
