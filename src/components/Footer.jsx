import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#25241F] text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between md:flex-wrap gap-8">
        {/* Logo & Info */}
        <div className="mb-6 md:mb-0">
          <Link to="/">
            <h1 className="text-white text-2xl font-bold">Voltmart</h1>
          </Link>
          <p className="mt-2 text-sm text-gray-400">
            Your One-Stop Shop for Quality Products, Fast & Convenient
          </p>
          <p className="mt-2 text-sm text-gray-400">
            123 Quickmart St, Fast City, NY 10001
          </p>
          <p className="text-sm text-gray-400">Email: support@voltmart.com</p>
          <p className="text-sm text-gray-400">Phone: (123) 456-7890</p>
        </div>

        {/* Customer Service */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold text-white">Customer Service</h3>
          <ul className="mt-2 text-sm space-y-2 text-gray-400">
            <Link to="/contact">
              <li className="hover:text-white cursor-pointer transition mb-2">
                Contact Us
              </li>
            </Link>
            <li className="hover:text-white cursor-pointer transition">
              Shipping & Returns
            </li>
            <li className="hover:text-white cursor-pointer transition">FAQs</li>
            <li className="hover:text-white cursor-pointer transition">
              Order Tracking
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Size Guide
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4 mt-2 text-gray-400">
            <FaFacebook className="hover:text-white transition cursor-pointer" />
            <FaInstagram className="hover:text-white transition cursor-pointer" />
            <FaTwitterSquare className="hover:text-white transition cursor-pointer" />
            <FaPinterest className="hover:text-white transition cursor-pointer" />
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex-1 min-w-[220px]">
          <h3 className="text-xl font-semibold text-white">Stay in the Loop</h3>
          <p className="mt-2 text-sm text-gray-400">
            Subscribe for exclusive offers, new arrivals, and quick delivery
            updates
          </p>
          <form action="" className="mt-4 flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-l-md bg-black text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 rounded-r-md hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-white">Voltmart</span>. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
