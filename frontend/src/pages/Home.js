import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/reducer/userReducer";

const Home = () => {
  const { loggedInUser } = useSelector(userSelector);
  console.log(loggedInUser);
  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
};

export default Home;
