import React from "react";
import CardSlider from "./CardSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  movieSelector,
  setShowSearchComponent,
} from "../redux/reducer/movieReducer";

const SearchResults = () => {
  const { searchResultMoviesArray } = useSelector(movieSelector);
  const dispatch = useDispatch();
  function handleShowComponent() {
    dispatch(setShowSearchComponent());
  }
  return (
    <>
      <div
        className="modalWrapper fixed top-0 left-0 right-0  bg-[rgba(0,0,0,0.7)] z-30 h-screen "
        onClick={handleShowComponent}
      ></div>
      <div className="resultContainer flex flex-col items-center justify-around w-fit h-1/2 text-red-500 fixed top-[10vh]  z-40">
        <p
          className="text-center text-red-500 text-xl font-bold cursor-pointer fixed right-0 top-0 p-2 "
          onClick={handleShowComponent}
        >
          X
        </p>
        {searchResultMoviesArray.length > 0 ? (
          <div className="w-screen">
            <CardSlider
              data={searchResultMoviesArray}
              title={"Searched Results.."}
            />
          </div>
        ) : (
          <p className="text-center text-red-600 text-xl block m-auto px-5">
            No search results .... try typing full name of show
          </p>
        )}
      </div>
    </>
  );
};

export default SearchResults;
