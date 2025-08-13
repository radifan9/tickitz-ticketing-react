import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [
    {
      // Create orderId randomly
      orderId: null,

      // From movie slice
      movieId: null,
      movieTitle: null,
      cat: null, // PG-13

      // From order slice
      date: null,
      time: null,
      cityLocation: null,
      cinema: null,
      seats: null,
      totalPayment: null,
      ticketStatus: {
        isActive: null,
        isPaid: null,
      },
    },
  ],
};

const historySlice = createSlice({
  initialState,
  name: "history",
  reducers: {
    addHistory: (state, { payload }) => {
      state.history.push(payload);
    },
  },
});

export default historySlice.reducer;

export const { addHistory } = historySlice.actions;
