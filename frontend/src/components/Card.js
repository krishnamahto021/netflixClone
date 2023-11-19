import React, { useState } from "react";
import { FaRegPlayCircle } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { MdOutlinePlaylistAdd } from "react-icons/md";

const Card = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // id ,name,image,genre(array)

  return (
    <div
      className="m-1 relative group"
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.image}`}
        alt="card"
        className="w-full h-auto"
      />

      {isHovered && (
        <div className="hoveredContainer w-full h-full z-10 absolute top-0 p-2 bg-gray-950 scale-x-100 rounded-md flex flex-col gap-2 overflow-hidden justify-evenly">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.image}`}
            alt={movie.name}
            className="w-full h-1/2 object-cover rounded-sm "
          ></img>
          <p className="title text-lg font-semibold text-red-600 text-center">
            {movie.name}
          </p>
          <div className="buttonsContainer flex gap-4 items-center justify-evenly text-white text-lg ">
            <FaRegPlayCircle className="text-2xl cursor-pointer" />
            <AiOutlineLike className="text-2xl cursor-pointer" />
            <AiOutlineDislike className="text-2xl cursor-pointer" />
            <MdOutlinePlaylistAdd className="text-2xl cursor-pointer" />
          </div>
          <div className="">
            {movie.genres.map((mg) => (
              <span className="text-white">{mg}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
