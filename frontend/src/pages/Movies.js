import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMovies,
  getGenres,
  movieSelector,
} from "../redux/reducer/movieReducer";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";

const Movies = () => {
  const dispatch = useDispatch();

  const { genresLoaded, moviesArray, genres } = useSelector(movieSelector);

  useEffect(() => {
    dispatch(getGenres());
  }, []);


  useEffect(() => {
    if (genresLoaded) {
      dispatch(getAllMovies({genres, type: "movie" }));
    }
  }, [genresLoaded]);
  return (
    <>
      <SelectGenre genres={genres} type="movie" />
      {moviesArray.length ? <Slider movies={moviesArray} /> : <p>Not Found</p>}
    </>
  );
};

export default Movies;
