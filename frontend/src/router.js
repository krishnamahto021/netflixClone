import { Navigate, createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { userSelector } from "./redux/reducer/userReducer";
import NavBar from "./components/NavBar";
import Player from "./pages/Player";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import MyList from "./pages/MyList";

export const ProtectedRouteHome = ({ element }) => {
  const { loggedInUser } = useSelector(userSelector);
  return loggedInUser.jwtToken ? element : <Navigate to="/" />;
};

export const ProtectedRoute = ({ element }) => {
  const { loggedInUser } = useSelector(userSelector);
  return loggedInUser.jwtToken ? <Navigate to="/user/home" /> : element;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { index: true, element: <ProtectedRoute element={<SignUp />} /> },
      { path: "/sign-in", element: <ProtectedRoute element={<SignIn />} /> },
      {
        path: "/user/home",
        element: <ProtectedRouteHome element={<Home />} />,
      },
      {
        path: "/user/movies",
        element: <ProtectedRouteHome element={<Movies />} />,
      },
      {
        path: "/user/tvShows",
        element: <ProtectedRouteHome element={<TvShows />} />,
      },
      {
        path: "/user/myList",
        element: <ProtectedRouteHome element={<MyList />} />,
      },
    ],
  },
  {
    path: "/user/player/:id/:type",
    element: <ProtectedRouteHome element={<Player />} />,
  },
]);
