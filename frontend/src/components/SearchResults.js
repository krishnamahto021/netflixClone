import React from "react";
import CardSlider from "./CardSlider";
import { useDispatch, useSelector } from "react-redux";
import {
  movieSelector,
  showSearchComponent,
} from "../redux/reducer/movieReducer";

const SearchResults = () => {
  const { searchResultMoviesArray } = useSelector(movieSelector);
  const dispatch = useDispatch();
  console.log(searchResultMoviesArray);
  return (
    <>
      <div className="modalWrapper fixed top-0 left-0 right-0  bg-black z-30 h-screen "></div>
      <div className="resultContainer flex flex-col items-center justify-around w-fit h-1/2 text-red-500 fixed top-[10vh]  z-40">
        <p
          className="text-center text-red-500 text-4xl font-bold cursor-pointer"
          onClick={() => dispatch(showSearchComponent())}
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
          <p className="text-center text-red-600 text-xl">
            No search results .... try typing full name of show
          </p>
        )}
      </div>
    </>
  );
};

export default SearchResults;
