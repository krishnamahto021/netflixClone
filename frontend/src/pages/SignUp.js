// SignUp.js
import React, { useState } from "react";
import bgImage from "../assets/login.jpg";
import axios from "axios";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showSubmitButton, setShowSubmitButtton] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

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
        "/user/sign-up",
        { email, password },
        config
      );
      console.log(data.status);
      if (data.status === 200) {
        toast.success("User Already Exists !");
        // navigate("/sign-in");
      } else if (data.status === 201) {
        toast.success("Created Account Successfully ");
        // navigate("/sign-in");
      }
    } catch (error) {
      toast.error("Error in Signing up");
      // navigate("/");
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
        <div className="formContainer flex flex-row gap-2 justify-center">
          {showSubmitButton ? (
            <>
              <input
                className="passwordContainer w-auto md:w-72 p-2 border border-gray-600 rounded bg-gray-800 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                className="w-auto md:w-64 bg-red-600 hover:bg-red-800 duration-200 text-white p-2 rounded text-lg md:text-2xl font-bold"
                onClick={submitHandler}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <input
                className="emailContainer w-auto md:w-72 p-2 border border-gray-600 rounded bg-gray-800 focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="w-auto md:w-64 bg-red-600 hover:bg-red-800 duration-200 text-white p-2 rounded text-lg md:text-2xl font-bold"
                onClick={() => setShowSubmitButtton(!showSubmitButton)}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
