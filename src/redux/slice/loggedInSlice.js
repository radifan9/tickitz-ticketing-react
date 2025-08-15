import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  full_name: null,
  email: null,
  role: null, // Either "admin" or "user"
  phoneNumber: null,
};

const loggedInSlice = createSlice({
  initialState,
  name: "loggedIn",
  reducers: {
    // When user successfully login
    addLoggedIn: (state, { payload }) => {
      return payload;
    },

    // When user logged out
    removeLoggedIn: (state, { payload }) => {
      return initialState;
    },
  },
});

export default loggedInSlice.reducer;

export const { addLoggedIn, removeLoggedIn } = loggedInSlice.actions;
