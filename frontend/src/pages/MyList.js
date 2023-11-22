import React from "react";
import { useSelector } from "react-redux";
import { movieSelector } from "../redux/reducer/movieReducer";
import CardSlider from "../components/CardSlider";

const MyList = () => {
  const { likedMoviesArray, disLikedMoviesArray, favoriteMoviesArray } =
    useSelector(movieSelector);
  console.log(likedMoviesArray, disLikedMoviesArray, favoriteMoviesArray);
  return (
    <div className="bg-black pt-14 min-h-screen lg:h-full w-full">
      <h1 className="text-red-500   text-lg p-3">Liked List</h1>
      {likedMoviesArray.length > 0 ? (
        <CardSlider data={likedMoviesArray} />
      ) : (
        <p className="text-red-500  text-center">No any liked shows</p>
      )}
      <hr className="text-black"></hr>
      <h1 className="text-red-500   text-lg p-3">Dis-Liked List</h1>
      {disLikedMoviesArray.length > 0 ? (
        <CardSlider data={disLikedMoviesArray} />
      ) : (
        <p className="text-red-500  text-center">No any Disliked shows</p>
      )}
      <hr></hr>
      <h1 className="text-red-500   text-lg p-3">Favourite List</h1>
      {favoriteMoviesArray.length > 0 ? (
        <CardSlider data={favoriteMoviesArray} />
      ) : (
        <p className="text-red-500  text-center">No any Favorite shows</p>
      )}
    </div>
  );
};

export default MyList;
