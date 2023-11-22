import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  genres: [],
  genresLoaded: false,
  moviesArray: [],
  likedMoviesArray: [],
  disLikedMoviesArray: [],
  favoriteMoviesArray: [],
  searchResultMoviesArray: [],
  showSearchComponent: false,
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
        type: movie.media_type,
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

// to get all movies series and all types
export const getAllMovies = createAsyncThunk(
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

export const getMoviesByGenre = createAsyncThunk(
  "netflix/genre",
  async ({ type, genre }, thunkApi) => {
    const { genres } = thunkApi.getState().movieReducer;
    const moviesArray = await getRawData(
      `https://api.themoviedb.org/3/discover/${type}?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&with_genres=${genre}`,
      genres
    );

    return moviesArray;
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setInitialStatesOfMovies: (state, action) => {
      return {
        ...state,
        likedMoviesArray: action.payload.likedMovies,
        disLikedMoviesArray: action.payload.disLikedMovies,
        favoriteMoviesArray: action.payload.favoriteMovies,
      };
    },
    addToLikedMovies: (state, action) => {
      return {
        ...state,
        likedMoviesArray: [action.payload, ...state.likedMoviesArray],
      };
    },
    removeFromLikedMovies: (state, action) => {
      const removedLikedMovie = state.likedMoviesArray.filter(
        (movie) => movie.id !== action.payload.id
      );
      return {
        ...state,
        likedMoviesArray: removedLikedMovie,
      };
    },
    addToDisLikedMovies: (state, action) => {
      return {
        ...state,
        disLikedMoviesArray: [action.payload, ...state.disLikedMoviesArray],
      };
    },
    addToFavoriteMovies: (state, action) => {
      return {
        ...state,
        favoriteMoviesArray: [action.payload, ...state.favoriteMoviesArray],
      };
    },
    removeFromDisLikedMovies: (state, action) => {
      const removedDislikedMovie = state.disLikedMoviesArray.filter(
        (movie) => movie.id !== action.payload.id
      );
      return {
        ...state,
        disLikedMoviesArray: removedDislikedMovie,
      };
    },
    removeFromFavoriteMovies: (state, action) => {
      const removedFavoriteMovie = state.favoriteMoviesArray.filter(
        (movie) => movie.id !== action.payload.id
      );
      return {
        ...state,
        favoriteMoviesArray: removedFavoriteMovie,
      };
    },
    performSearch: (state, action) => {
      const result = !state.showSearchComponent;
      if (action.payload === "") {
        return {
          ...state,
          showSearchComponent: result,
        };
      }
      const searchResults = state.moviesArray.filter((movie) =>
        movie.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        searchResultMoviesArray: searchResults,
        showSearchComponent: result,
      };
    },
    showSearchComponent:(state,action)=>{
      const result = !state.showSearchComponent;
      return {
        ...state,
        showSearchComponent:result
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGenres.fulfilled, (state, action) => {
        return {
          ...state,
          genres: [...action.payload],
          genresLoaded: true,
        };
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        return {
          ...state,
          moviesArray: [...action.payload],
        };
      })
      .addCase(getMoviesByGenre.fulfilled, (state, action) => {
        return {
          ...state,
          // moviesArray: [...action.payload],
        };
      });
  },
});

export const movieReducer = movieSlice.reducer;
export const {
  addToDisLikedMovies,
  addToFavoriteMovies,
  addToLikedMovies,
  setInitialStatesOfMovies,
  removeFromLikedMovies,
  removeFromDisLikedMovies,
  removeFromFavoriteMovies,
  performSearch,
  showSearchComponent
} = movieSlice.actions;
export const movieSelector = (state) => state.movieReducer;
