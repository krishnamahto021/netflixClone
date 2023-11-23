import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { CgMoreO } from "react-icons/cg";
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
          className="hoveredContainer absolute w-full h-full rounded-md top-0 z-40 flex flex-col justify-evenly"
          style={{
            backdropFilter: "blur(0.75px)",
          }}
        >
          <p
            className="title text-[12px] sm:text-xs md:leading-4 xl:text-lg font-bold text-red-600 text-center"
            title={movie.name}
          >
            {movie.name}
          </p>
          <div className="buttonsContainer flex gap-1 md:gap-2 lg:gap-3 items-center justify-evenly text-[#EEEEEE] text-xl md:text-2xl lg:text-3xl ">
            <FaRegPlayCircle
              className=" cursor-pointer hover:scale-150 duration-300 bg-[#2b2d42] rounded-full p-1"
              onClick={() => navigate(`/user/player/${movie.id}/${movie.type}`)}
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
            <CgMoreO
              className=" p-1 cursor-pointer  hover:scale-150 duration-300 bg-[#2b2d42] rounded-full"
              onClick={() =>
                navigate(`/user/details/${movie.id}/${movie.type}`)
              }
            />
          </div>
          <div className="genresContainer flex items-center  justify-between px-1 ">
            {movie.genres.slice(0, 2).map((mg, index) => (
              <div
                key={index}
                className="text-red-500 text-[12px] sm:text-xs md:leading-4 xl:text-lg font-semibold"
                title={mg}
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
