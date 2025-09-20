// This persistant data is for storing order information before the user pays

import { createSlice } from "@reduxjs/toolkit";

// Usefull in order & payment
const initialState = {
  order: {
    // Data inserted at movie detail
    scheduleID: null,
    movieId: null,
    date: null,
    timeID: null,
    time: null,
    cityLocationID: null,
    cityLocation: null,
    cinemaID: null,
    cinema: null,

    // Data inserted at order page
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
