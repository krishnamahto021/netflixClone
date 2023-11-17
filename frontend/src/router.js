import { createBrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp";

export const router = createBrowserRouter([{ path: "/", element: <SignUp /> }]);
