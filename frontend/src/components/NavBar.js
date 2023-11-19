import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, userSelector } from "../redux/reducer/userReducer";
import { FaPowerOff } from "react-icons/fa6";
import { FaAlignRight } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoMdLogOut } from "react-icons/io";
import { LuSearch } from "react-icons/lu";

const NavBar = () => {
  const { loggedInUser } = useSelector(userSelector);
  const [showCross, setShowCross] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const dispatch = useDispatch();

  const handleSearchFunction = () => {
    setSearchShow(!searchShow);
  };

  return (
    <>
      <nav className="flex fixed w-screen  bg-black h-14 p-0 md:p-2 items-center justify-between z-20">
        <div className="menuImageContainer flex text-white items-center gap-6">
          <Link to={"/"}>
            <img src={logo} alt="netflix" className="w-28"></img>
          </Link>
          {loggedInUser.jwtToken ? (
            <div className="menuContainer  gap-3 hidden md:flex">
              <Link to={"/user/home"}>Home</Link>
              <Link to={"/user/tvShows"}>Tv Shows</Link>
              <Link to={"/user/movies"}>Movies</Link>
              <Link to={"/user/myList"}>My List</Link>
            </div>
          ) : (
            <></>
          )}
        </div>

        {loggedInUser.jwtToken ? (
          <div className="middleContainer flex items-center gap-1 -ml-2 md:hidden">
            <input
              className="search focus:outline-none bg-transparent border-b-2 border-red-500 text-white"
              placeholder="Type....."
            ></input>
            <div onClick={handleSearchFunction}>
              <LuSearch className="text-red-600 text-xl cursor-pointer" />
            </div>
          </div>
        ) : (
          <></>
        )}

        {loggedInUser.jwtToken ? (
          <>
            <div className="rightContainer hidden md:flex md:items-center md:gap-6 mr-4">
              {searchShow ? (
                <>
                  <input
                    className="search focus:outline-none bg-transparent border-b-2 border-red-500 text-white"
                    placeholder="Type....."
                  ></input>
                  <div onClick={handleSearchFunction}>
                    <LuSearch className="text-red-600 text-xl cursor-pointer" />
                  </div>
                </>
              ) : (
                <div onClick={() => setSearchShow(!searchShow)}>
                  <LuSearch className="text-red-600 text-xl cursor-pointer" />
                </div>
              )}
              <FaPowerOff
                className="text-red-600 font-bold text-lg cursor-pointer "
                onClick={() => dispatch(logOutUser())}
              />
            </div>
            {/* mobile view */}
            <>
              <div
                onClick={() => setShowCross(!showCross)}
                className="font-semibold text-2xl text-red-600 z-20 md:hidden "
              >
                {showCross ? <ImCross className="text-lg" /> : <FaAlignRight />}
              </div>
              {showCross ? (
                <div
                  className="linksContainerMobile text-xl flex flex-col justify-center items-center gap-6 absolute top-0 left-0 right-0   w-full h-screen bg-gray-800 text-red-600 capitalize md:hidden"
                  onClick={() => setShowCross(!showCross)}
                >
                  <Link to={"/user/home"}>Home</Link>
                  <Link to={"/user/tvShows"}>Tv Shows</Link>
                  <Link to={"/user/movies"}>Movies</Link>
                  <Link to={"/user/myList"}>My List</Link>
                  <div
                    className="flex items-center gap-1"
                    onClick={() => dispatch(logOutUser())}
                  >
                    <p>Log Out</p> <IoMdLogOut />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </>
          </>
        ) : (
          <div className="rightContainer text-white bg-red-600  p-2  rounded-md mr-1 md:mr-0 ">
            <Link to={"/sign-in"}>Sign In</Link>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
