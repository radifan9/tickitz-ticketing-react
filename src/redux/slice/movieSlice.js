import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiFetchNoAuth from "../../utils/apiFetchNoAuth";
import apiFetch from "../../utils/apiFetch";

// Movie information
const initialState = {
  movie: {
    originalTitle: null,
    image: null, // url
    genres: null,
    releaseDate: null,
    directedBy: null,
    duration: null,
    casts: null,
    synopsis: null,
  },

  // schedule
  schedules: [],

  // status
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  error: null,
};

const getMovieThunk = createAsyncThunk(
  "movie/get_data",
  async ({ movieId }, { rejectWithValue }) => {
    try {
      // Get Movie Details
      const urlMovie = `${import.meta.env.VITE_BE_HOST}/api/v1/movies/${movieId}`;
      const movieData = await apiFetchNoAuth("GET", urlMovie);

      return movieData.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const getSchedulesBasedOnMovieID = createAsyncThunk(
  "schedules/get_data",
  async ({ movieID, token }, { rejectWithValue }) => {
    try {
      // Get Schedules
      const urlSchedules = `/api/v1/schedules?movie_id=${movieID}`;
      const schedulesData = await apiFetch(urlSchedules, "GET", token);
      return schedulesData;
    } catch (err) {
      return rejectWithValue({
        status: err.status || 500,
        message: err.message || "Unknown error",
      });
    }
  },
);

const movieSlice = createSlice({
  initialState,
  name: "movie",

  reducers: {
    clearMovie(state) {
      state.movie = initialState.movie;
      state.isLoading = false;
      state.isSuccess = false;
      state.isFailed = false;
      state.error = null;
    },
  },

  extraReducers: (builder) =>
    builder
      // Get Movie Details
      .addCase(getMovieThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getMovieThunk.fulfilled, (state, { payload }) => {
        state.movie = payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getMovieThunk.rejected, (state, { payload, error }) => {
        state.error = {
          payload,
          error,
        };

        state.isLoading = false;
        state.isFailed = true;
      })

      // Get Schedules
      .addCase(getSchedulesBasedOnMovieID.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getSchedulesBasedOnMovieID.fulfilled, (state, { payload }) => {
        state.schedules = payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(
        getSchedulesBasedOnMovieID.rejected,
        (state, { payload, error }) => {
          state.error = {
            payload,
            error,
          };

          state.isLoading = false;
          state.isFailed = true;
        },
      ),
});

// Export reducer
export default movieSlice.reducer;

// Export actions
export const movieActions = {
  ...movieSlice.actions,
  getMovieThunk,
  getSchedulesBasedOnMovieID,
};
