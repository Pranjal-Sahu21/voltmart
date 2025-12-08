import React, { useRef, useEffect, useState } from "react";
import parallaxImg from "../assets/parallax-img.jpg";
import { Link } from "react-router-dom";

const ParallaxComponent = () => {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [containerTop, setContainerTop] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const updateContainerPosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerTop(rect.top + window.scrollY);
      }
    };

    updateContainerPosition();
    window.addEventListener("resize", updateContainerPosition);
    return () => window.removeEventListener("resize", updateContainerPosition);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const scrollPos = Math.max(scrollTop - containerTop, 0);
        setScrollY(scrollPos);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [containerTop]);

  const imageBlur = Math.min(scrollY / 100, 10);
  const textY = Math.min(scrollY / 2, 200);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[150vh] overflow-hidden"
    >
      {/* Background Image */}
      <div
        style={{
          filter: `blur(${imageBlur}px)`,
          transform: `translateZ(0)`,
          willChange: "filter",
        }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <img
          src={parallaxImg}
          alt="Parallax"
          className="w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      </div>

      {/* Overlay Text */}
      <div
        style={{
          transform: `translate(-50%, calc(-50% + ${textY}px)) translateZ(0)`,
          willChange: "transform",
        }}
        className="absolute top-1/2 left-1/2 text-center px-6 pointer-events-none"
      >
        <h1 className="text-white text-4xl sm:text-6xl font-semibold drop-shadow-xl">
          Experience Premium Quality
        </h1>
        <p className="text-white text-base sm:text-lg mt-10 drop-shadow-lg max-w-xl mx-auto font-thin">
          Experience products that transform everyday living, handpicked for
          quality and delivered flawlessly.
        </p>

        <Link to="/products">
          <button className="mt-6 bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-black/30 pointer-events-auto cursor-pointer">
            Explore
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ParallaxComponent;
