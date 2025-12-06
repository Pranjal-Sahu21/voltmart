import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NextArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-[#204A86]/90 hover:bg-[#204A86] p-2 sm:p-3 rounded-full cursor-pointer transition-all shadow-lg"
    >
      <ChevronRight className="text-white" size={20} />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-[#204A86]/90 hover:bg-[#204A86] p-2 sm:p-3 rounded-full cursor-pointer transition-all shadow-lg"
    >
      <ChevronLeft className="text-white" size={20} />
    </div>
  );
};

const Carousel = () => {
  const { data, fetchAllProducts } = useContext(DataContext);

  const [randomItems, setRandomItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (data && data.length) {
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setRandomItems(shuffled.slice(0, 7));
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (!randomItems.length) return;

    let loadedCount = 0;

    randomItems.forEach((item) => {
      const img = new Image();
      img.src = item?.images?.[0] || item?.image;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === randomItems.length) {
          setLoading(false);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === randomItems.length) {
          setLoading(false);
        }
      };
    });
  }, [randomItems]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {randomItems?.map((item, index) => (
          <div key={index} className="relative w-full overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220] via-[#102A4C] to-[#08101E]" />
            <div className="absolute inset-0 bg-[#204A86]/10" />

            {/* Content */}
            <div className="relative z-10 flex justify-center items-center py-8 sm:py-12 md:py-16">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-6 items-center">
                {/* LEFT: Text */}
                <div className="space-y-4 sm:space-y-5 md:space-y-6 text-center md:text-left">
                  <p className="text-[#7FA3D6] text-xs sm:text-sm tracking-wide uppercase font-medium">
                    Find what you love, faster
                  </p>
                  <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold text-white leading-snug line-clamp-3">
                    {item?.title}
                  </h1>
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg line-clamp-3">
                    {item?.description}
                  </p>
                  <button className="mt-2 sm:mt-3 md:mt-4 bg-[#204A86] hover:bg-[#204A86]/90 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-3 md:py-3 rounded-xl text-xs sm:text-sm md:text-sm font-semibold transition-all active:scale-95 shadow-lg">
                    Shop Now
                  </button>
                </div>

                {/* RIGHT: Image */}
                <div className="flex justify-center items-center">
                  <img
                    src={item?.images?.[0] || item?.image || "/fallback.png"}
                    alt={item?.title}
                    className="max-w-full max-h-[70vh] sm:max-h-[60vh] md:max-h-[500px] lg:max-h-[550px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
