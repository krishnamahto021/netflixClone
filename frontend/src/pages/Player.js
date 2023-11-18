import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import sampleVideo from "../assets/sampleVideo.mp4";

const Player = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="backButton fixed top-16 left-2 cursor-pointer rounded-full w-8 h-8 p-1 bg-gray-300 text-black z-10">
        <IoArrowBack
          className="text-2xl cursor-pointer"
          onClick={() => {
            navigate(-1)
          }}
        />
      </div>
      <video
        src={sampleVideo}
        autoPlay
        loop
        muted
        controls
        className="h-screen w-screen  object-cover"
      ></video>
    </div>
  );
};

export default Player;
