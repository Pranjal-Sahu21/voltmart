import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-8 border border-gray-200">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-black tracking-tight">
          About Us
        </h1>

        {/* Intro */}
        <p className="text-neutral-700 text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-black">Voltmart</span>,
          your fast, reliable, and modern destination for everyday essentials.
          From trending products to daily must-haves, we bring you a smooth,
          quick-commerce shopping experience designed for speed, quality, and
          trust.
        </p>

        {/* Mission */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">Our Mission</h2>
          <p className="text-neutral-700 text-base leading-relaxed">
            At Voltmart, our mission is simple: deliver high-quality products to
            your doorstep with speed and reliability. We focus on convenience,
            affordability, and a seamless experience that makes shopping
            effortless for everyone.
          </p>
        </div>

        {/* Why Choose Us */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">
            Why Shop With Us?
          </h2>
          <ul className="list-disc pl-6 text-neutral-700 space-y-2">
            <li>
              Wide collection of trending products
            </li>
            <li>Fast delivery and secure checkout</li>
            <li>Friendly, responsive customer support</li>
            <li>Quality-tested items from trusted suppliers</li>
            <li>Simple returns for hassle-free shopping</li>
          </ul>
        </div>

        {/* Vision */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">Our Vision</h2>
          <p className="text-neutral-700 text-base leading-relaxed">
            We aim to build a future where shopping is instant, effortless, and
            accessible to everyone. Voltmart continues to expand and evolve,
            offering modern solutions for your everyday needs.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold text-black mb-2">
            Join the Voltmart Community
          </h3>
          <p className="text-neutral-600 mb-6">
            Discover thousands of products — all in one place, all delivered
            fast.
          </p>

          <Link to="/products">
            <button className="bg-black text-white px-6 py-4 mt-8 rounded-full hover:bg-neutral-800 transition duration-300 cursor-pointer">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
