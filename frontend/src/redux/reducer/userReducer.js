import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  loggedInUser: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authorizeUser: (state, action) => {
      return {
        ...state,
        loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")) || {},
      };
    },
    logOutUser: (state, action) => {
      localStorage.removeItem("loggedInUser");
      toast.success("Logged out Successfully");
      return {
        ...state,
        loggedInUser: {},
      };
    },
  },
});

export const userReducer = userSlice.reducer;
export const { authorizeUser, logOutUser } = userSlice.actions;
export const userSelector = (state) => state.userReducer;
