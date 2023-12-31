// SignIn.js
import React, { useEffect, useState } from "react";
import bgImage from "../assets/login.jpg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { authorizeUser} from "../redux/reducer/userReducer";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authorizeUser());
  }, [dispatch]);

  async function submitHandler() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      if (!email || !password) {
        toast.error("Please fill all the details");
      }
      const data = await axios.post(
        "/user/sign-in",
        { email, password },
        config
      );
      if (data.status === 200) {
        toast.success("Signed In Successfully! ");
        localStorage.setItem("loggedInUser", JSON.stringify(data.data.data));
        navigate("/user/home");
      } else if (data.status === 201) {
        toast.error("Invalid Password ");
        navigate("/sign-in");
      } else if (data.status === 202) {
        toast.error("User not registered");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error in Signing up");
      navigate("/");
    }
  }
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container mx-auto textFormContainer text-center">
        <div className="textContainer text-4xl md:text-6xl font-bold mb-6">
          Laughter. Tears. Thrills. Find it all on Netflix.
        </div>
        <div className="benefitContainer text-xl md:text-2xl font-semibold mb-6">
          Endless entertainment starts at just ₹ 149. Cancel anytime.
        </div>
        <div className="ctaContainer text-xl md:text-2xl font-semibold mb-6">
          Ready to watch? Enter your email to create or restart your membership.
        </div>
        <div className="formContainer flex flex-col md:flex-row gap-2 justify-center p-2">
          <input
            type="text"
            className="passwordContainer h-14 w-auto md:w-72 p-2 border border-gray-600 rounded bg-gray-800 focus:outline-none"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="passwordContainer ">
            <input
              type={showPassword ? "text" : "password"}
              className=" w-full md:w-72 h-14 p-2 border border-gray-600 rounded bg-gray-800 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="flex justify-end -mt-9 px-3 cursor-pointer text-lg"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>

          <button
            className="w-auto mt-4 h-14 md:mt-0 md:w-64 bg-red-600 hover:bg-red-800 duration-200 text-white p-2 rounded text-lg md:text-2xl font-bold"
            onClick={submitHandler}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
