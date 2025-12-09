import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useData } from "../context/DataContext";
import Category from "./Category";
import ParallaxComponent from "./ParallaxComponent";

const isValidImage = (url) => {
  if (!url) return false;
  return (
    typeof url === "string" &&
    url.startsWith("http") &&
    !url.includes("undefined") &&
    !url.includes("null")
  );
};

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="flex absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow cursor-pointer"
  >
    <ChevronRight size={18} className="text-gray-700" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="flex absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow cursor-pointer"
  >
    <ChevronLeft size={18} className="text-gray-700" />
  </div>
);

const Carousel = () => {
  const { data, fetchAllProducts } = useData();
  const [randomItems, setRandomItems] = useState([]);
  const [showExtras, setShowExtras] = useState(false);

  const [dotsOnDesktop, setDotsOnDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 768;
  });

  const resizeTimer = useRef(null);

  useEffect(() => {
    function handleResize() {
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => {
        setDotsOnDesktop(window.innerWidth >= 768);
      }, 100);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      setDotsOnDesktop(window.innerWidth >= 768);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
    };
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (data.length) {
      const cleaned = data.filter((item) => isValidImage(item.image));
      const shuffled = [...cleaned].sort(() => 0.5 - Math.random());
      setRandomItems(shuffled.slice(0, 7));

      const timer = setTimeout(() => setShowExtras(true), 500);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const settings = {
    dots: dotsOnDesktop,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: false,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full bg-gray-50">
      <div className="w-full min-h-screen flex flex-col">
        <div className="grow">
          <div className="max-w-7xl mx-auto py-6 sm:py-10 h-full">
            <Slider {...settings}>
              {randomItems.map((item) => (
                <div key={item.id} className="px-3 h-full">
                  <div className="bg-white rounded-3xl shadow-sm overflow-hidden h-full flex">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 sm:p-10 w-full">
                      {/* TEXT SECTION */}
                      <div className="space-y-4 text-center md:text-left">
                        <span className="text-xs font-medium text-gray-400 uppercase">
                          {item.category}
                        </span>

                        <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 leading-snug line-clamp-2 mt-8">
                          {item.title}
                        </h1>

                        <p className="text-gray-500 text-sm sm:text-base leading-snug line-clamp-2 mt-10">
                          {item.description}
                        </p>

                        {/* DESKTOP BUTTON */}
                        <button className="hidden md:inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all cursor-pointer">
                          Shop Now
                        </button>
                      </div>

                      {/* IMAGE SECTION + MOBILE BUTTON */}
                      <div className="flex flex-col justify-center items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-h-[260px] sm:max-h-[340px] w-auto object-contain transform hover:rotate-1 hover:scale-105 duration-300 drop-shadow-[0_10px_35px_rgba(0,0,0,0.15)]"
                        />

                        {/* MOBILE BUTTON BELOW IMAGE */}
                        <div className="md:hidden mt-4">
                          <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all cursor-pointer mt-4">
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {showExtras && (
            <div className="hidden md:block border-t border-gray-100">
              <Category />
            </div>
          )}
        </div>
      </div>

      {showExtras && <ParallaxComponent />}
    </div>
  );
};

export default Carousel;
