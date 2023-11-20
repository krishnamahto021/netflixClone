import React, { useState } from "react";
import CardSlider from "./CardSlider";

const Slider = ({ movies }) => {
  const getAllMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  return (
    <div className="bg-black text-white max-w-full pt-4">
      <CardSlider data={getAllMoviesFromRange(0, 10)} title="Trending Now" />
      <CardSlider data={getAllMoviesFromRange(10, 20)} title="New Releases" />
      <CardSlider
        data={getAllMoviesFromRange(20, 30)}
        title="Blockbuster Movies"
      />
      <CardSlider
        data={getAllMoviesFromRange(30, 40)}
        title="Popular on Netflix"
      />
      <CardSlider data={getAllMoviesFromRange(40, 50)} title="Action Movies" />
      <CardSlider data={getAllMoviesFromRange(50, 60)} title="Epics" />
    </div>
  );
};

export default Slider;
