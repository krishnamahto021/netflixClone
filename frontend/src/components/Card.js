import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegPlayCircle } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../redux/reducer/userReducer";
import { toast } from "react-toastify";
import {
  addToDisLikedMovies,
  addToFavoriteMovies,
  addToLikedMovies,
} from "../redux/reducer/movieReducer";

const Card = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { loggedInUser } = useSelector(userSelector);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLikedMovies = async (movie) => {
    const data = await axios.post("/user/movies/addToLikedMovies", {
      data: movie,
      email: loggedInUser.email,
    });
    if (data.status === 200) {
      toast.success("Already Liked ");
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
    const data = await axios.post("/user/movies/addToDisLikedMovies", {
      data: movie,
      email: loggedInUser.email,
    });
    if (data.status === 200) {
      toast.success("Already DisLiked ");
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
    const data = await axios.post("/user/movies/addToFavoriteMovies", {
      data: movie,
      email: loggedInUser.email,
    });
    if (data.status === 200) {
      toast.success(" Already Added to Favorite list");
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
      className="slideContainer m-1 relative cursor-pointer"
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
          className="hoveredContainer absolute w-full h-full   rounded-md top-0  z-40 flex flex-col gap-2 justify-evenly"
          style={{
            backdropFilter: "blur(5px)",
          }}
        >
          <p className="title text-lg font-semibold text-red-600 text-center  overflow-hidden">
            {movie.name}
          </p>
          <div className="buttonsContainer flex gap-4 items-center justify-evenly text-white text-lg ">
            <FaRegPlayCircle
              className="text-2xl  cursor-pointer  hover:scale-150 duration-300"
              onClick={() => navigate("/user/player")}
            />
            <AiOutlineLike
              className="text-2xl cursor-pointer hover:scale-150 duration-300"
              onClick={() => handleLikedMovies(movie)}
            />
            <AiOutlineDislike
              className="text-2xl cursor-pointer hover:scale-150 duration-300"
              onClick={() => handleDisLikedMovies(movie)}
            />
            <MdOutlinePlaylistAdd
              className="text-2xl cursor-pointer hover:scale-150 duration-300"
              onClick={() => handleAddToFavoriteMovies(movie)}
            />
          </div>
          <div className="flex gap-2 items-center content-evenly ml-3">
            {movie.genres.map((mg, index) => (
              <div
                key={index}
                className="text-red-500 font-bold max-h-[30px] overflow-hidden"
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
