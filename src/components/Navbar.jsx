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
      <div className="backdrop-blur-md bg-white/70 border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-3">
          {/* Logo */}
          <div className="flex gap-6 items-center -ml-1">
            <Link to="/" className="text-gray-900">
              <h1 className="font-semibold text-2xl tracking-tight">
                <span className="text-[#204A86] font-serif">V</span>oltmart
              </h1>
            </Link>

            {/* Location - hidden on small screens */}
            <div className="hidden md:flex gap-2 text-gray-700 items-center relative select-none">
              <MapPin className="text-[#204A86]" />
              <div className="leading-tight text-sm">
                {location ? (
                  <>
                    <p className="font-medium">{location?.county}</p>
                    <p className="text-gray-500">{location?.state}</p>
                  </>
                ) : (
                  <p className="font-medium">Add Address</p>
                )}
              </div>
              <FaCaretDown
                onClick={toggleDropDown}
                className="text-gray-600 cursor-pointer"
              />

              {openDropDown && (
                <div className="absolute top-10 left-0 w-64 shadow-xl bg-white border border-gray-100 rounded-xl p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="font-semibold text-gray-900 text-sm">
                      Change Location
                    </h1>
                    <CgClose
                      onClick={toggleDropDown}
                      className="cursor-pointer text-gray-500 hover:text-gray-700"
                    />
                  </div>
                  <button
                    onClick={getLocation}
                    className="bg-[#204A86] text-white w-full py-2 rounded-lg hover:bg-[#204A86]/80 transition-all text-sm cursor-pointer active:scale-95"
                  >
                    Detect my location
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 items-center text-gray-700">
            <ul className="flex gap-6 items-center text-base font-medium">
              {["/", "/products", "/about", "/contact"].map((path, index) => {
                const labels = ["Home", "Products", "About", "Contact"];
                return (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#204A86] border-b-2 border-[#204A86] pb-1"
                        : "text-gray-700 hover:text-[#204A86] transition-all"
                    }
                  >
                    <li>{labels[index]}</li>
                  </NavLink>
                );
              })}
            </ul>

            <Link
              to="/cart"
              className="relative text-gray-800 hover:text-[#204A86] transition-all"
            >
              <IoCartOutline className="h-7 w-7" />
              <span className="bg-[#204A86] text-white text-xs px-2 py-px rounded-full absolute -top-2 -right-3 font-semibold shadow-md">
                0
              </span>
            </Link>

            <SignedOut>
              <SignInButton className="bg-[#204A86] text-white text-sm px-3 py-2 rounded-lg hover:bg-[#204A86]/80 transition-all shadow-sm cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-[#204A86]"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sliding Panel */}
            <motion.div
              className="fixed top-0 right-0 w-52 h-full bg-white z-50 shadow-xl p-5 flex flex-col gap-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-end items-center">
                <X
                  className="cursor-pointer"
                  onClick={() => setMobileOpen(false)}
                />
              </div>

              {/* Mobile Links */}
              {["/", "/products", "/about", "/contact"].map((path, index) => {
                const labels = ["Home", "Products", "About", "Contact"];
                return (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#204A86] font-medium"
                        : "text-gray-700 hover:text-[#204A86] transition-all"
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
                className="flex items-center gap-2 text-gray-800 hover:text-[#204A86]"
              >
                <IoCartOutline className="h-6 w-6" />
                Cart
              </Link>

              {/* Auth */}
              <div className="pt-4 border-t">
                <SignedOut>
                  <SignInButton className="bg-[#204A86] text-white w-full py-2 rounded-lg hover:bg-[#204A86]/80 transition-all shadow-sm cursor-pointer active:scale-95" />
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
