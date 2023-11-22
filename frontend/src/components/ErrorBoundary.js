import React, { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
  const [errorState, setErrorState] = useState({
    hasError: false,
    error: null,
    errorInfo: null,
  });

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      setErrorState({
        hasError: true,
        error,
        errorInfo,
      });
      console.error(error, errorInfo);
    };

    window.addEventListener("error", handleError);
    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (errorState.hasError) {
    // Render fallback UI
    return (
      <div className="w-full h-screen bg-black text-red-500 flex flex-col items-center justify-around">
        <h1 className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold m-1 p-2">
          Something went wrong!
        </h1>
        <div className="flex justify-around m-2">
          <button className="bg-white text-black p-4  rounded-md text-2xl font-semibold hover:scale-110 duration-200">
            <a href="/user/home">Back to safety</a>
          </button>
        </div>
      </div>
    );
  }

  // Render children if no error occurred
  return children;
};

export default ErrorBoundary;
