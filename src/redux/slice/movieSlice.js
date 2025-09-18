import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import fetchWithAuth from "../../utils/fetchWithAuth";
import getDetails from "../../utils/getDetails";
import getCredits from "../../utils/getCredits";
import apiFetch from "../../utils/apiFetch";
import apiFetchNoAuth from "../../utils/apiFetchNoAuth";

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
      // const urlMovie = `${import.meta.env.VITE_API_URL}/movie/${movieId}`;
      // const urlCredits = `${import.meta.env.VITE_API_URL}/movie/${movieId}/credits`;

      // console.log(`urlCredits : ${urlCredits}`);
      console.log("movie id : ");
      console.log(movieId);



      // Get Movie Details
      // const movieData = await fetchWithAuth(urlMovie);
      // const movieDetails = getDetails(movieData);
      const urlMovie = `${import.meta.env.VITE_BE_HOST}/api/v1/movies/${movieId}`;
      console.log("url movie : ");
      console.log(urlMovie);

      const movieData = await apiFetchNoAuth("GET", urlMovie);
 

      return movieData.data;
    } catch (err) {
      // const error = new Error(
      //   `Error fetching movie details\n${err.status}: ${err.statusText}`,
      // );
      // throw error;
      return rejectWithValue(err);
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
      }),
});

// Export reducer
export default movieSlice.reducer;

// Export actions
export const movieActions = {
  ...movieSlice.actions,
  getMovieThunk,
};
