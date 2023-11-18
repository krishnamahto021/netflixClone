import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=d5200ccc3e16af9b0e22cc2ad03b52c4"
  );
  return data;
});
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
    });
  },
});
