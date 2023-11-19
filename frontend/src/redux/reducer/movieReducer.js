import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  genres: [],
  genresLoaded: false,
  trendingMovies: [],
};

const createArrayFromRawData = (resArray, moviesArray, genres) => {
  resArray.forEach((movie) => {
    const movieGenres = []; // store the movie genres of the genres we have fetched in first step
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });

    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.name ? movie.name : movie.title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const { data } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(data.results, moviesArray, genres);
  }
  return moviesArray;
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=d5200ccc3e16af9b0e22cc2ad03b52c4"
  );
  return data.genres;
});

export const getTrending = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkApi) => {
    const { genres } = thunkApi.getState().movieReducer;
    const moviesArray = await getRawData(
      `https://api.themoviedb.org/3/trending/${type}/week?api_key=d5200ccc3e16af9b0e22cc2ad03b52c4`,
      genres,
      true
    );
    return moviesArray;
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGenres.fulfilled, (state, action) => {
        return {
          ...state,
          genres: [...action.payload],
          genresLoaded: true,
        };
      })
      .addCase(getTrending.fulfilled, (state, action) => {
        return {
          ...state,
          trendingMovies: [...action.payload],
        };
      });
  },
});

export const movieReducer = movieSlice.reducer;

export const movieSelector = (state) => state.movieReducer;
