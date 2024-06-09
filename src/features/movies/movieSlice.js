import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { ApiKey } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieText = "Harry";
    const response = await movieApi.get(
      `?ApiKey=${ApiKey}&s=${movieText}&type=movie`
    );

    return response.data;
  }
);
export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async () => {
    const seriesText = "Friends";
    const response = await movieApi.get(
      `?ApiKey=${ApiKey}&s=${seriesText}&type=series`
    );

    return response.data;
  }
);
export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${ApiKey}&i=${id}&Plot=full`);

    return response.data;
  }
);
const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncMovies.pending, () => {
        console.log("loading");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, action) => {
        console.log("succeeded");
        return { ...state, movies: action.payload };
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        console.log("failed");
      })
      .addCase(fetchAsyncShows.fulfilled, (state, action) => {
        console.log("succeeded");
        return { ...state, shows: action.payload };
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, action) => {
        console.log("succeeded");
        return { ...state, selectMovieOrShow: action.payload };
      });
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
