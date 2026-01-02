import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import useLocation from "../hooks/useLocation";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useUser();
  const { totalCartQuantity } = useCart();

  const links = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Desktop Navbar sliding from top */}
      <motion.header
        className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          duration: 0.8,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-black font-bold text-2xl tracking-tight flex"
          >
            Voltmart
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center flex-1 justify-center gap-8 text-sm font-medium text-gray-700 md:ml-20 pr-4">
            {links.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-black font-semibold border-b-2 border-black pb-1"
                    : "hover:text-black transition border-b-2 border-transparent pb-1"
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <MapPin size={16} />
              <span>
                {location
                  ? `${location.city}, ${location.state}`
                  : "Set location"}
              </span>
            </div>

            <Link to="/cart" className="relative">
              <IoCartOutline className="h-6 w-6 text-gray-700 hover:text-black transition mr-1" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1.5 py-0.5 rounded-full">
                {totalCartQuantity}
              </span>
            </Link>

            <SignedOut>
              <SignInButton className="bg-black text-white px-4 py-2 rounded-full text-xs hover:bg-gray-800 transition cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Cart + Menu */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile Cart Icon */}
            <Link to="/cart" className="relative">
              <IoCartOutline className="h-6 w-6 text-gray-700 hover:text-black transition" />
              <span className="absolute -top-2 -right-3 bg-black text-white text-xs px-1.5 py-0.5 rounded-full">
                {totalCartQuantity}
              </span>
            </Link>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="text-gray-800"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Mobile Drawer */}
            <motion.div
              className="fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-xl p-6 flex flex-col gap-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close */}
              <div className="flex justify-end">
                <X
                  className="text-gray-600 cursor-pointer"
                  onClick={() => setMobileOpen(false)}
                />
              </div>

              {/* Auth */}
              <div className="-mt-8 flex items-center gap-3">
                <SignedOut>
                  <SignInButton className="bg-black text-white w-[80%] py-2 rounded-full text-sm hover:bg-gray-800 transition cursor-pointer" />
                </SignedOut>

                <SignedIn>
                  <UserButton />
                  <div className="flex flex-col gap-0.5">
                    <span className="mt-2 text-gray-600">
                      Hello, {user?.firstName}
                    </span>
                    <span className="text-gray-400 text-[12px]">
                      Premium user
                    </span>
                  </div>
                </SignedIn>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 text-sm border-b pb-4">
                <MapPin size={16} />
                <span>
                  {location
                    ? `${location.city}, ${location.state}`
                    : "Set location"}
                </span>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-3 pb-5 border-b">
                {links.map(({ path, label }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-black font-semibold pb-1"
                        : "text-gray-700 hover:text-black transition pb-1"
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
              <SignedIn>
                <div>
                  <NavLink
                    to="/orders"
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-black font-semibold pb-1"
                        : "text-gray-700 hover:text-black transition pb-1"
                    }
                  >
                    My Orders 📦
                  </NavLink>
                </div>
              </SignedIn>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
