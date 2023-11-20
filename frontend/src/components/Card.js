import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegPlayCircle } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { MdOutlinePlaylistAdd } from "react-icons/md";

const Card = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
            <AiOutlineLike className="text-2xl cursor-pointer hover:scale-150 duration-300" />
            <AiOutlineDislike className="text-2xl cursor-pointer hover:scale-150 duration-300" />
            <MdOutlinePlaylistAdd className="text-2xl cursor-pointer hover:scale-150 duration-300" />
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
