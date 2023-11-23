import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import {
  MdOutlinePlaylistAdd,
  MdOutlinePlaylistAddCheck,
} from "react-icons/md";
import {
  addToDisLikedMovies,
  addToFavoriteMovies,
  addToLikedMovies,
  movieSelector,
  removeFromDisLikedMovies,
  removeFromFavoriteMovies,
  removeFromLikedMovies,
} from "../redux/reducer/movieReducer";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../redux/reducer/userReducer";
import { toast } from "react-toastify";

const SingleMoviePage = () => {
  const { id, type } = useParams();
  const [movieData, setMovieData] = useState("");
  const { loggedInUser } = useSelector(userSelector);
  const { likedMoviesArray, disLikedMoviesArray, favoriteMoviesArray } =
    useSelector(movieSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let movie = movieData;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsLiked(likedMoviesArray.some((m) => m.id === movie.id));
    setIsDisliked(disLikedMoviesArray.some((m) => m.id === movie.id));
    setIsFavorite(favoriteMoviesArray.some((m) => m.id === movie.id));
  }, [loggedInUser, movie]);

  const fetchDataAboutShow = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=d5200ccc3e16af9b0e22cc2ad03b52c4`
    );
    setMovieData(data);
  };

  const handleLikedMovies = async (movie) => {
    const data = await axios.post(
      "/user/movies/addToLikedMovies",
      {
        data: movie,
        email: loggedInUser.email,
      },
      config
    );
    if (data.status === 200) {
      dispatch(removeFromLikedMovies(movie));
      setIsLiked(!isLiked);
      toast.success("Removed From Liked list ");
    } else if (data.status === 201) {
      dispatch(addToLikedMovies(movie));
      setIsLiked(!isLiked);
      toast.success("Added To Liked list");
    } else if (data.status === 202) {
      toast.error("Email not registered");
    } else {
      toast.error("Internal Server Error");
    }
  };

  const handleDisLikedMovies = async (movie) => {
    const data = await axios.post(
      "/user/movies/addToDisLikedMovies",
      {
        data: movie,
        email: loggedInUser.email,
      },
      config
    );
    if (data.status === 200) {
      dispatch(removeFromDisLikedMovies(movie));
      setIsDisliked(!isDisliked);
      toast.success("Removed From Disliked list");
    } else if (data.status === 201) {
      dispatch(addToDisLikedMovies(movie));
      setIsDisliked(!isDisliked);
      toast.success("Added To DisLiked List");
    } else if (data.status === 202) {
      toast.error("Email not registered");
    } else {
      toast.error("Internal Server Error");
    }
  };

  const handleAddToFavoriteMovies = async (movie) => {
    const data = await axios.post(
      "/user/movies/addToFavoriteMovies",
      {
        data: movie,
        email: loggedInUser.email,
      },
      config
    );
    if (data.status === 200) {
      dispatch(removeFromFavoriteMovies(movie));
      setIsFavorite(!isFavorite);
      toast.success(" Removed from Favorite list");
    } else if (data.status === 201) {
      dispatch(addToFavoriteMovies(movie));
      setIsFavorite(!isFavorite);
      toast.success("Added To Favorite List");
    } else if (data.status === 202) {
      toast.error("Email not registered");
    } else {
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    fetchDataAboutShow();
  }, []);

  // Calculate star count and nearest filled star
  let starCount = movieData.vote_average / 2;
  let nearestFilledStar = Math.floor(starCount);
  let hasHalfStar = starCount % 1 !== 0;

  // Create an array to store the star components
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < nearestFilledStar) {
      return <FaStar key={index} />;
    } else if (index === nearestFilledStar && hasHalfStar) {
      return <FaStarHalfAlt key={index} />;
    } else {
      return <FaRegStar key={index} />;
    }
  });

  let typeOfShow = movieData.release_date ? "movie" : "tv";

  return movieData ? (
    <div className="movieDataContainer  h-screen bg-cover bg-center  flex  flex-col lg:flex-row md:items-center items-center justify-center p-2 bg-gradient-to-tr from-gray-400 to-gray-700">
      <div className="imageContainer w-[90vw] lg:w-[30vw] rounded p-2 ">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`}
          alt={movieData.original_title}
          className=""
        ></img>
      </div>
      <div className="infoContainer w-[80vw] flex flex-col p-1 gap-2">
        <div className="titleAndDateContainer flex items-center gap-2">
          <p className="text-lg hover:scale-105 duration-200 font-bold cursor-pointer">
            {movieData.original_title}
          </p>
          <p>
            (
            {movieData.release_date
              ? movieData.release_date.substring(0, 4)
              : movieData.first_air_date.substring(0, 4)}
            )
          </p>
        </div>
        <div className="adultContainer flex items-center gap-1">
          <div className="bg-transparent border-slate-50 border p-1 rounded text-black font-bold">
            U/A{movieData.adult ? <span>18+</span> : <span>16+</span>}
          </div>
          <div className="genresContainer flex items-center gap-1 ">
            {movieData.genres.map((mg) => (
              <p key={mg.id} className="">
                {mg.name}
              </p>
            ))}
          </div>
        </div>
        <div className="taglineContainer">
          <p className="text-gray-400 ">{movieData.tagline}</p>
        </div>
        <div className="ratingContainer flex items-center gap-1 text-orange-500">
          {stars}
          <span className="text-black font-semibold">
            {movieData.vote_count} voted
          </span>
        </div>
        <div className="overviewContainer">
          <p className="text-black font-normal  text-lg">
            {movieData.overview}
          </p>
        </div>
        <div className="buttonsContainer mt-3 py-3  flex gap-1  items-center justify-evenly text-[#EEEEEE] text-xl md:text-2xl lg:text-3xl max-w-[30vw] ">
          <FaRegPlayCircle
            className=" cursor-pointer hover:scale-150 duration-300 bg-[#2b2d42] rounded-full p-1"
            onClick={() => navigate(`/user/player/${movie.id}/${typeOfShow}`)}
          />
          {!isLiked ? (
            <AiOutlineLike
              className=" p-1 cursor-pointer hover:scale-150 duration-300 bg-[#2b2d42] rounded-full"
              onClick={() => handleLikedMovies(movie)}
            />
          ) : (
            <AiFillLike
              className=" p-1 cursor-pointer text-red-500 hover:scale-150 duration-300 bg-[#2b2d42] rounded-full"
              onClick={() => handleLikedMovies(movie)}
            />
          )}

          {!isDisliked ? (
            <AiOutlineDislike
              className=" p-1 cursor-pointer hover:scale-150 duration-300 bg-[#2b2d42] rounded-full"
              onClick={() => handleDisLikedMovies(movie)}
            />
          ) : (
            <AiFillDislike
              className=" p-1 cursor-pointer text-red-500 hover:scale-150 duration-300 bg-[#2b2d42] rounded-full"
              onClick={() => handleDisLikedMovies(movie)}
            />
          )}

          {!isFavorite ? (
            <MdOutlinePlaylistAdd
              className=" p-1 cursor-pointer  hover:scale-150 duration-300 bg-[#2b2d42] rounded-full"
              onClick={() => handleAddToFavoriteMovies(movie)}
            />
          ) : (
            <MdOutlinePlaylistAddCheck
              className=" p-1 cursor-pointer text-red-500 hover:scale-150 duration-300 bg-[#2b2d42] rounded-full"
              onClick={() => handleAddToFavoriteMovies(movie)}
            />
          )}
        </div>
      </div>
    </div>
  ) : (
    <p>No data found</p>
  );
};

export default SingleMoviePage;
