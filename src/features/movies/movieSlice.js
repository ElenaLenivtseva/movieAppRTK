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
const initialState = {
  movies: {},
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
  }

});

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export default movieSlice.reducer;
