import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { ApiKey } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => { 
    const movieText = "Harry";   
      const response = await movieApi
        .get(`?ApiKey=${ApiKey}&s=${movieText}&type=movie`)
        

      return response.data;
    }
  
);
export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async () => { 
    const seriesText = "Friends";   
      const response = await movieApi
        .get(`?ApiKey=${ApiKey}&s=${seriesText}&type=series`)
        

      return response.data;
    }
  
);
const initialState = {
  movies: {},
  shows: {},
};
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncMovies.pending, () => {
        console.log('loading')
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, action) => {
        console.log('succeeded')
        return {...state, movies: action.payload}
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        console.log('failed')
        
      })
      .addCase(fetchAsyncShows.fulfilled, (state, action) => {
        console.log('succeeded')
        return {...state, shows: action.payload}
      })
  }

});

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export default movieSlice.reducer;
