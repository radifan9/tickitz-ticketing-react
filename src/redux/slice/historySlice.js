import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [
    {
      orderId: null,
      movieId: null,
      movieTitle: null,
      date: null,
      cat: null, // PG-13
      time: null,
      cityLocation: null,
      cinema: null,
      seats: null,
      totalPayment: null,
      isTicketActive: null,
      isPaid: null,
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
