import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Category from "./Category";

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full cursor-pointer shadow-md transition-all"
  >
    <ChevronRight className="text-gray-700" size={18} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full cursor-pointer shadow-md transition-all"
  >
    <ChevronLeft className="text-gray-700" size={18} />
  </div>
);

const Carousel = () => {
  const [data, setData] = useState([]);
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (data.length) {
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setRandomItems(shuffled.slice(0, 7));
    }
  }, [data]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full bg-gray-50">
      {/* Slider */}
      <div className="max-w-7xl mx-auto py-6 sm:py-10">
        <Slider {...settings}>
          {randomItems.map((item) => (
            <div key={item.id} className="px-3">
              <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 sm:p-10">
                  {/* Text */}
                  <div className="space-y-4 text-center md:text-left">
                    <span className="inline-block text-xs font-medium text-gray-400 tracking-widest uppercase">
                      Featured Product
                    </span>

                    <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 leading-tight line-clamp-2">
                      {item.title}
                    </h1>

                    <p className="text-sm sm:text-base text-gray-500 line-clamp-2">
                      {item.description}
                    </p>

                    <button className="mt-2 bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-900 transition active:scale-95">
                      Shop Now
                    </button>
                  </div>

                  {/* Image */}
                  <div className="flex justify-center items-center">
                    <img
                      src={item.images?.[0] || "/fallback.png"}
                      alt={item.title}
                      className="max-h-[260px] sm:max-h-[340px] w-auto object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Categories */}
      <div className="hidden border-t border-gray-100 md:block">
        <Category />
      </div>
    </div>
  );
};

export default Carousel;
