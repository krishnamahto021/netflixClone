import React, { useDebugValue, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenres,
  getAllMovies,
  movieSelector,
  setInitialStatesOfMovies,
} from "../redux/reducer/movieReducer";
import homeImage from "../assets/home.jpg";
import homeTitle from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import { userSelector } from "../redux/reducer/userReducer";
import axios from "axios";
import { createPortal } from "react-dom";
import SearchResults from "../components/SearchResults";
const Home = () => {
  const dispatch = useDispatch();

  const { genresLoaded, moviesArray, genres, showSearchComponent } =
    useSelector(movieSelector);
  const { loggedInUser } = useSelector(userSelector);

  // fetch all the liked , disliked, fav movies from db
  const fetchAll = async () => {
    const email = loggedInUser.email;
    const { data } = await axios.post("/user/fetchAll", { email });
    const { likedMovies, favoriteMovies, disLikedMovies } = data;
    dispatch(
      setInitialStatesOfMovies({ likedMovies, favoriteMovies, disLikedMovies })
    );
  };

  useEffect(() => {
    dispatch(getGenres());
    fetchAll();
  }, []);
  useEffect(() => {
    if (genresLoaded) {
      dispatch(getAllMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);
  return (
    <>
      <div
        className="homeContainer  h-screen flex flex-col items-center justify-center bg-cover bg-center text-white p-2"
        style={{ backgroundImage: `url(${homeImage})` }}
      >
        <div className="container p-4">
          <div>
            <img src={homeTitle} alt="homeTitle"></img>
          </div>
          <div className="buttonsContainer m-2 text-lg  flex gap-4 items-center">
            <Link to="/user/player/66732/tv">
              <button className="playButton flex bg-gray-200 text-black rounded-md p-2 items-center gap-2 justify-between">
                <FaPlay /> Play
              </button>
            </Link>
            <Link to="/user/details/66732/tv">
              <button className="playButton flex bg-gray-500 text-black rounded-md p-2 items-center gap-2 justify-between">
                <CiCircleInfo /> More Info
              </button>
            </Link>
          </div>
        </div>
        {showSearchComponent &&
          createPortal(
            <SearchResults />,
            document.querySelector(".modalContainer")
          )}
      </div>
      <Slider movies={moviesArray} />
    </>
  );
};

export default Home;
