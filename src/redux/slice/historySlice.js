import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    // Create orderId randomly
    orderId: 0,

    // User ID correspond who buys the ticket

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
    virtualAccount: null,
    paymentDue: null, // June 23 2024
    totalPayment: null,
    ticketStatus: {
      isActive: null,
      isPaid: null,
    },
  },
];

const historySlice = createSlice({
  initialState,
  name: "history",
  reducers: {
    addHistory: (state, { payload }) => {
      state.push(payload);
    },
  },
});

export default historySlice.reducer;

export const { addHistory } = historySlice.actions;
