import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { MapPin, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ location, getLocation, openDropDown, setOpenDropDown }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDropDown = () => {
    setOpenDropDown((prev) => !prev);
  };

  return (
    <>
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#0B1220] via-[#0F1C33] to-[#0B1220] border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-3">
          {/* Logo */}
          <div className="flex gap-6 items-center -ml-1">
            <Link to="/" className="text-white">
              <h1 className="font-semibold text-2xl tracking-tight">
                <span className="text-[#4A90E2] font-serif">V</span>oltmart
              </h1>
            </Link>

            {/* Location */}
            <div className="hidden md:flex gap-2 text-gray-300 items-center relative select-none">
              <MapPin className="text-[#4A90E2]" />
              <div className="leading-tight text-sm">
                {location ? (
                  <>
                    <p className="font-medium text-white">{location?.county}</p>
                    <p className="text-gray-400">{location?.state}</p>
                  </>
                ) : (
                  <p className="font-medium text-white">Add Address</p>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 items-center">
            <ul className="flex gap-6 items-center text-sm font-medium text-white">
              {["/", "/products", "/about", "/contact"].map((path, index) => {
                const labels = ["Home", "Products", "About", "Contact"];
                return (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#4A90E2] border-b-2 border-[#4A90E2] pb-1"
                        : "text-gray-300 hover:text-white transition-all"
                    }
                  >
                    <li>{labels[index]}</li>
                  </NavLink>
                );
              })}
            </ul>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-gray-300 hover:text-white transition-all"
            >
              <IoCartOutline className="h-6 w-6" />
              <span className="bg-[#204A86] text-white text-xs px-2 py-px rounded-full absolute -top-2 -right-3 shadow-md">
                0
              </span>
            </Link>

            {/* Auth */}
            <SignedOut>
              <SignInButton className="bg-[#204A86] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#204A86]/80 transition-all shadow-md cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-[#4A90E2]"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed top-0 right-0 w-52 h-full bg-[#0F1C33] z-50 shadow-2xl p-5 flex flex-col gap-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close Button */}
              <div className="flex justify-end">
                <X
                  className="text-gray-300 cursor-pointer"
                  onClick={() => setMobileOpen(false)}
                />
              </div>

              {/* Location Block */}
              <div className="flex items-center gap-2 text-gray-300 border-b border-white/10 pb-4">
                <MapPin className="text-[#4A90E2]" />
                <div className="text-sm leading-tight">
                  {location ? (
                    <>
                      <p className="font-medium text-white">
                        {location.county}
                      </p>
                      <p className="text-gray-400">{location.state}</p>
                    </>
                  ) : (
                    <p className="font-medium text-white">Add Address</p>
                  )}
                </div>
              </div>

              {/* Nav Links */}
              {["/", "/products", "/about", "/contact"].map((path, index) => {
                const labels = ["Home", "Products", "About", "Contact"];
                return (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#4A90E2] font-medium"
                        : "text-gray-300 hover:text-white transition-all"
                    }
                  >
                    {labels[index]}
                  </NavLink>
                );
              })}

              {/* Cart */}
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-gray-300 hover:text-white"
              >
                <IoCartOutline className="h-5 w-5" />
                Cart
              </Link>

              {/* Auth + Profile */}
              <div className="pt-4 border-t border-white/10">
                <SignedOut>
                  <SignInButton className="bg-[#204A86] text-white w-full py-2 rounded-lg hover:bg-[#204A86]/80 transition-all shadow-md cursor-pointer" />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
