// This persistant data is for storing order information before the user pays

import { createSlice } from "@reduxjs/toolkit";

// Usefull in order & payment
const initialState = {
  order: {
    movieId: null,
    date: null,
    time: null,
    cityLocation: null,
    cinema: null,
    seats: null,
    totalPayment: null,
  },
};

const orderSlice = createSlice({
  initialState,
  name: "order",
  reducers: {
    addOrder: (state, { payload }) => {
      state.order = payload;
    },

    addSeats: (state, { payload }) => {
      state.order.seats = payload.seats;
    },

    addTotalPayment: (state, { payload }) => {
      state.order.totalPayment = payload.totalPayment;
    },
  },
});

export default orderSlice.reducer;
export const { addOrder, addSeats, addTotalPayment } = orderSlice.actions;
