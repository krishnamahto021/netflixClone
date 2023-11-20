import React, { useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { getMoviesByGenre } from "../redux/reducer/movieReducer";

const SelectGenre = ({ genres, type }) => {
  const [genreOfSelected, setGenreOfSelected] = useState("");
  const dispatch = useDispatch();

  const handleGenreChange = (selectedOption) => {
    if (selectedOption) {
      setGenreOfSelected(selectedOption.value);
      dispatch(getMoviesByGenre({ genre: selectedOption.value, type }));
    }
  };

  const options = genres.map((g) => ({ value: g.id, label: g.name }));

  return (
    <div className="fixed top-16 px-4 z-50">
      <Select
        value={options.find((option) => option.value === genreOfSelected)}
        onChange={handleGenreChange}
        options={options}
        placeholder="Select Genre"
      />
    </div>
  );
};

export default SelectGenre;
