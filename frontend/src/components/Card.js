import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegPlayCircle } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../redux/reducer/userReducer";
import { toast } from "react-toastify";
import {
  addToDisLikedMovies,
  addToFavoriteMovies,
  addToLikedMovies,
  movieSelector,
  removeFromDisLikedMovies,
  removeFromFavoriteMovies,
  removeFromLikedMovies,
} from "../redux/reducer/movieReducer";

const Card = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { loggedInUser } = useSelector(userSelector);
  const { likedMoviesArray, disLikedMoviesArray, favoriteMoviesArray } =
    useSelector(movieSelector);
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsLiked(likedMoviesArray.some((m) => m.id === movie.id));
    setIsDisliked(disLikedMoviesArray.some((m) => m.id === movie.id));
    setIsFavorite(favoriteMoviesArray.some((m) => m.id === movie.id));
  }, [loggedInUser, movie]);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
      toast.success("Removed From Liked list ");
    } else if (data.status === 201) {
      dispatch(addToLikedMovies(movie));
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
      toast.success("Removed From Disliked list");
    } else if (data.status === 201) {
      dispatch(addToDisLikedMovies(movie));
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
      toast.success(" Removed from Favorite list");
    } else if (data.status === 201) {
      dispatch(addToFavoriteMovies(movie));
      toast.success("Added To Favorite List");
    } else if (data.status === 202) {
      toast.error("Email not registered");
    } else {
      toast.error("Internal Server Error");
    }
  };

  return (
    <div
      className="slideContainer m-1 relative cursor-pointer " 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.image}`}
        alt="card"
        className="w-full h-auto"
      />

      {isHovered && (
        <div
          className="hoveredContainer absolute w-full h-full   rounded-md top-0  z-40 flex flex-col  justify-between"
          style={{
            backdropFilter: "blur(5px)",
          }}
        >
          <p className="title text-sm md:text-lg font-bold text-red-600 text-center">
            {movie.name}
          </p>
          <div className="buttonsContainer flex gap-4 items-center justify-evenly text-white text-lg ">
            <FaRegPlayCircle
              className="text-2xl  cursor-pointer  hover:scale-150 duration-300"
              onClick={() => navigate(`/user/player/${movie.id}/${movie.type}`)}
            />
            {!isLiked ? (
              <AiOutlineLike
                className="text-2xl cursor-pointer hover:scale-150 duration-300"
                onClick={() => handleLikedMovies(movie)}
              />
            ) : (
              <AiFillLike
                className="text-2xl cursor-pointer hover:scale-150 duration-300"
                onClick={() => handleLikedMovies(movie)}
              />
            )}

            {!isDisliked ? (
              <AiOutlineDislike
                className="text-2xl cursor-pointer hover:scale-150 duration-300"
                onClick={() => handleDisLikedMovies(movie)}
              />
            ) : (
              <AiFillDislike
                className="text-2xl cursor-pointer hover:scale-150 duration-300"
                onClick={() => handleDisLikedMovies(movie)}
              />
            )}

            {!isFavorite ? (
              <MdOutlinePlaylistAdd
                className="text-2xl cursor-pointer hover:scale-150 duration-300"
                onClick={() => handleAddToFavoriteMovies(movie)}
              />
            ) : (
              <MdOutlinePlaylistAddCheck
                className="text-2xl cursor-pointer hover:scale-150 duration-300"
                onClick={() => handleAddToFavoriteMovies(movie)}
              />
            )}
          </div>
          <div className="flex items-center justify-evenly gap-4  px-1">
            {movie.genres.map((mg, index) => (
              <div
                key={index}
                className="text-red-500 font-bold text-xs md:text-lg"
              >
                {mg}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
