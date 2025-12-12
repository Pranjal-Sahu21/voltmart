import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import axios from "axios";
import Footer from "./components/Footer";
import SingleProduct from "./pages/SingleProduct";
import NotFound from "./components/NotFound";
import { useCart } from "./context/CartContext";

const App = () => {
  const [location, setLocation] = useState();
  const [openDropDown, setOpenDropDown] = useState(false);

  const { cartItem, setCartItem } = useCart();

  const getLocation = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

          const response = await axios.get(url);
          const data = response.data;

          if (data && data.name && data.sys) {
            setLocation({
              city: data.name,
              country: data.sys.country,
            });
          }

          setOpenDropDown(false);
        } catch (error) {
          console.error("Failed to fetch location from OpenWeather:", error);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItem");
    if (storedCart) {
      console.log("Getting it");

      setCartItem(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
    console.log("Saving", cartItem);
  }, [cartItem]);

  return (
    <BrowserRouter>
      <Navbar
        location={location}
        getLocation={getLocation}
        openDropDown={openDropDown}
        setOpenDropDown={setOpenDropDown}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={<Cart location={location} getLocation={getLocation} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
