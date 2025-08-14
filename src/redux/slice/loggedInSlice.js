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
      // state.loggedIn = payload;
      return payload;
    },

    // When user logged out
    removeLoggedIn: (state, { payload }) => {
      // state.loggedIn = null;
      return initialState;
    },
  },
});

export default loggedInSlice.reducer;

export const { addLoggedIn, removeLoggedIn } = loggedInSlice.actions;
