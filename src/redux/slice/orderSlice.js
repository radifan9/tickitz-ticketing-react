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
  },
};

// navigate("/order", {
//   state: {
//     movieId: id,
//     date: e.target.date.value,
//     time: e.target.time.value,
//     cityLocation: e.target.cityLocation.value,
//     cinema: e.target.cinema.value,
//   },
// });

const orderSlice = createSlice({
  initialState,
  name: "order",
  reducers: {
    addOrder: (state, { payload }) => {
      console.log("Payload dari order");
      console.log(payload);
      state.order = payload;
    },

    addSeats: (state, { payload }) => {
      state.order.seats = payload;
    },
  },
});

export default orderSlice.reducer;
export const { addOrder, addSeats } = orderSlice.actions;
