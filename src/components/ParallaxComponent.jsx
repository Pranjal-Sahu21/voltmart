import React from "react";
import parallaxImg from "../assets/parallax-img.jpg";
import { Link } from "react-router-dom";

const ParallaxComponent = () => {
  return (
    <div className="bg-linear-to-b from-gray-50 to-gray-100 py-12 md:py-24 px-4">
      <div
        className="relative max-w-7xl mx-auto rounded-3xl h-[550px] md:h-[650px] bg-cover bg-center overflow-hidden shadow-2xl"
        style={{
          backgroundImage: `url(${parallaxImg})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/40 to-black/70 rounded-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6 md:px-12 lg:px-20 max-w-4xl">
            <div className="w-20 h-0.5 bg-linear-to-r from-transparent via-white/60 to-transparent mx-auto mb-8 md:mb-10" />
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight tracking-tight">
              Premium Products, Delivered Fast
            </h1>
            <div className="w-16 h-px bg-white/40 mx-auto mb-6 md:mb-8" />
            <p className="text-sm md:text-lg lg:text-xl mb-10 md:mb-12 text-gray-100 font-light leading-relaxed max-w-3xl mx-auto">
              Get the products you need, faster than ever. Curated for quality, style, and reliability, delivered straight to your door in no time.
            </p>
            <Link to="/products">
              <button className="bg-black text-white px-6 py-4 rounded-full hover:bg-[#25241F] transition-all cursor-pointer mt-4">
                Explore Products
              </button>
            </Link>
            <div className="w-20 h-0.5 bg-linear-to-r from-transparent via-white/60 to-transparent mx-auto mt-8 md:mt-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxComponent;
