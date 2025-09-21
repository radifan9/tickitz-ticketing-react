import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [
    {
      // Create orderId randomly
      orderId: 0,

      // email, user who buys the ticket
      email: null,

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
  ],

  // UI/Loading states
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  error: null,
};

const getHistoriesThunk = createAsyncThunk(
  "user/history",
  async ({ token }, { rejectWithValue }) => {
    try {
      const request = new Request(
        `${import.meta.env.VITE_BE_HOST}/api/v1/orders/histories`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const response = await fetch(request);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const historySlice = createSlice({
  initialState,
  name: "history",
  reducers: {
    addHistory: (state, { payload }) => {
      state.push(payload);
    },

    // Change from Not Paid to Paid
  },

  // Async Thunk
  extraReducers: (builder) =>
    builder
      .addCase(getHistoriesThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })

      .addCase(getHistoriesThunk.fulfilled, (state, { payload }) => {
        // Save histories
        state.history = payload.data;

        // Update UI states
        state.isLoading = false;
        state.isSuccess = true;
      })

      .addCase(getHistoriesThunk.rejected, (state, action) => {
        // Clear history data
        state.history = null;

        // Update UI states
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.payload;
      }),
});

export default historySlice.reducer;

// export const { addHistory } = historySlice.actions;
export const historyActions = {
  ...historySlice.actions,
  getHistoriesThunk,
};
