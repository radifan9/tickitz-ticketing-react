import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSearchParams } from "react-router";

//
import fetchWithAuth from "../../utils/fetchWithAuth";
import getDetails from "../../utils/getDetails";
import getCredits from "../../utils/getCredits";

// const [searchParams] = useSearchParams();
// const id = useSearchParams.get("id");

// const urlMovie = `${import.meta.env.VITE_API_URL}/movie/${id}`;
// const urlCredits = `${import.meta.env.VITE_API_URL}/movie/${id}/credits`;
const urlMovie = `${import.meta.env.VITE_API_URL}/movie/1106289`;
const urlCredits = `${import.meta.env.VITE_API_URL}/movie/1106289/credits`;

// Movie information
const initialState = {
  movie: {
    // movieId: null,
    // movieTitle: null,
    // image: null, // encoded in base64
    // genres: null,
    // releaseDate: null,
    // directedBy: null,
    // duration: null,
    // casts: null,
    // synopsis: null,
  },

  // status
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  error: null,
};

const getMovieThunk = createAsyncThunk(
  "movie/get_data",
  async (_, { rejectWithValue }) => {
    try {
      const obj = {};

      // Get Movie Details
      const movieData = await fetchWithAuth(urlMovie);
      const movieDetails = getDetails(movieData);
      Object.assign(obj, movieDetails);

      // Get Credits Information
      const movieCredits = await fetchWithAuth(urlCredits);
      const creditsInfo = getCredits(movieCredits);
      Object.assign(obj, creditsInfo);

      // console.log(obj);
      return obj;
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
  // reducers: {
  //   addMovie: (state, { payload }) => {
  //     Object.assign(state.movie, {
  //       movieId: payload.movieId,
  //       movieTitle: payload.movieTitle,
  //       image: payload.image, // encoded in base64
  //       genres: payload.genres,
  //       releaseDate: payload.releaseDate,
  //       directedBy: payload.directedBy,
  //       duration: payload.duration,
  //       casts: payload.casts,
  //       synopsis: payload.synopsis,
  //     });
  //   },

  //   removeMovie: (state, { _ }) => {
  //     Object.assign(state.movie, {
  //       initialState,
  //     });
  //   },
  // },

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
// export const { addMovie, removeMovie } = movieSlice.actions;
export const movieActions = {
  ...movieSlice.actions,
  getMovieThunk,
};
