import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useData } from "../context/DataContext";
import Category from "./Category";
import VoltmartParallax from "./VoltmartParallax.jsx";

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

  useEffect(() => {
    const loadData = async () => {
      await fetchAllProducts();
    };
    loadData();
  }, []);

  useEffect(() => {
    if (data.length) {
      const cleaned = data.filter(
        (item) => Array.isArray(item.images) && isValidImage(item.images[0])
      );

      const shuffled = [...cleaned].sort(() => 0.5 - Math.random());
      setRandomItems(shuffled.slice(0, 7));

      const timer = setTimeout(() => {
        setShowExtras(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [data]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 4500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full bg-gray-50">
      <div className="w-full min-h-screen flex flex-col">
        {/* Carousel */}
        <div className="grow">
          <div className="max-w-7xl mx-auto py-6 sm:py-10 h-full">
            <Slider {...settings}>
              {randomItems.map((item) => (
                <div key={item.id} className="px-3 h-full">
                  <div className="bg-white rounded-3xl shadow-sm overflow-hidden h-full flex">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 sm:p-10 w-full">
                      <div className="space-y-4 text-center md:text-left">
                        <span className="text-xs font-medium text-gray-400 uppercase">
                          Featured Product
                        </span>

                        <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 leading-snug">
                          {item.title}
                        </h1>

                        <p className="text-gray-500 text-sm sm:text-base leading-snug line-clamp-2">
                          {item.description}
                        </p>

                        <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all cursor-pointer">
                          Shop Now
                        </button>
                      </div>

                      <div className="flex justify-center items-center">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="max-h-[260px] sm:max-h-[340px] w-auto object-contain hover:scale-105 duration-300"
                        />
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

      {showExtras && <VoltmartParallax />}
    </div>
  );
};

export default Carousel;
