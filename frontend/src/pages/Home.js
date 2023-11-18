import React, { useDebugValue, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGenres } from "../redux/reducer/movieReducer";
import homeImage from "../assets/home.jpg";
import homeTitle from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { Link } from "react-router-dom";
import { authorizeUser } from "../redux/reducer/userReducer";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
  }, []);

  return (
    <>
      <div
        className="homeContainer  h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${homeImage})` }}
      >
        <div className="container p-4">
          <div>
            <img src={homeTitle} alt="homeTitle"></img>
          </div>
          <div className="buttonsContainer m-2 text-lg  flex gap-4 items-center">
            <Link to="/user/player">
              <button className="playButton flex bg-gray-200 text-black rounded-md p-2 items-center gap-2 justify-between">
                <FaPlay /> Play
              </button>
            </Link>
            <button className="playButton flex bg-gray-500 text-black rounded-md p-2 items-center gap-2 justify-between">
              <CiCircleInfo /> More Info
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
