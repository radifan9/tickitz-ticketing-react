import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: null,
};

const authSlice = createSlice({
  initialState,
  reducers: {
    // If user loggin correctly
    addLoggedUser: (state, { payload }) => {
      state.loggedInUser = payload.loggedInUser;
    },

    // If user logout
    removeLoggedUser: (state, _) => {
      state.loggedInUser = null;
    },
  },
});

// Export reducer
export default authSlice.reducer;

// Export actions
export const { addLoggedUser, removeLoggedUser } = authSlice.actions;
