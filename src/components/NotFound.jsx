import React from "react";
import notFound from "../assets/PageNotFound.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-[500px]">
        <Lottie animationData={notFound} loop={true} />
      </div>

      <Link to="/">
        <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-[#25241F] transition-all cursor-pointer mt-4 mb-24 active:scale-95">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
