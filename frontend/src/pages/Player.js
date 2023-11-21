import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import ReactPlayer from "react-player";

const Player = () => {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const [videoSrc, setVideoSrc] = useState("");
  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=d5200ccc3e16af9b0e22cc2ad03b52c4`
    );
    const video = data.results.find((video) => video.type === "Trailer");
    if (video) {
      setVideoSrc(video.key);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

  return (
    <div>
      <div className="backButton fixed top-16 left-2 cursor-pointer rounded-full w-8 h-8 p-1 bg-gray-300 text-black z-10">
        <IoArrowBack
          className="text-2xl cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
      {videoSrc ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoSrc}`}
          controls
          width="100%"
          height="100%"
          style={{ position: "fixed" }}
          playing={true}
          loop={true}
          pip={true}
          config={{
            youtube: {
              playerVars: {
                controls: 1, // Show YouTube video controls
                modestbranding: 1, // Hide YouTube logo
                fs: 1, // Show fullscreen button
                playsinline: 1, // Enable inline playback on iOS
              },
            },
          }}
        />
      ) : (
        <p className="text-center bg-black text-red-500 text-3xl font-semibold h-screen w-full">
          No Trailer found
        </p>
      )}
    </div>
  );
};

export default Player;
