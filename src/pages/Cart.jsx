import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { GiShoppingBag } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import notFound from "../assets/EmptyBox.json";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const Cart = ({ location }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const navigate = useNavigate();
  const totalPrice = cartItem
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const { user } = useUser();

  // DELIVERY FORM (LOCAL STORAGE)
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("deliveryAddress");
    if (saved) {
      setAddress(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    setAddress((prev) => ({
      ...prev,
      fullName: prev.fullName || user?.fullName || "",
      country: prev.country || location?.country || "",
    }));
  }, [user, location]);

  const saveAddress = () => {
    localStorage.setItem("deliveryAddress", JSON.stringify(address));
    toast.success('Address saved successfully.');
  };

  const updateField = (field, value) => {
    setAddress({ ...address, [field]: value });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 py-10 flex justify-center">
      <div className="w-full max-w-5xl">
        {cartItem.length > 0 ? (
          <>
            {/* PAGE TITLE */}
            <h1 className="text-xl sm:text-2xl font-semibold text-black mb-6 tracking-tight">
              My Cart <span className="text-gray-500">({cartItem.length})</span>
            </h1>

            {/* FULL-WIDTH CART ITEMS */}
            <div className="space-y-3 mb-10">
              {cartItem.map((item, index) => (
                <div
                  key={index}
                  className="w-full bg-white border border-black/10 rounded-lg p-4 shadow-sm 
                  flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-md transition-all"
                >
                  {/* LEFT: IMAGE + TEXT */}
                  <div className="flex items-center gap-4 w-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain bg-gray-100 rounded-md p-2 border border-black/10 cursor-pointer shrink-0"
                      onClick={() => navigate(`/products/${item.id}`)}
                    />

                    <div className="flex flex-col justify-center w-full">
                      <h2 className="text-[15px] font-medium text-black max-w-full sm:max-w-[260px] line-clamp-2 leading-tight wrap-break-word">
                        {item.title}
                      </h2>

                      <p className="text-[17px] font-semibold text-black mt-4 leading-snug">
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT SIDE: QTY + DELETE */}
                  <div className="flex items-center gap-3 sm:ml-auto self-end sm:self-center">
                    {/* Quantity */}
                    <div className="flex items-center gap-2 border border-black rounded-md px-2 py-1 text-[14px]">
                      <button
                        className="text-black font-semibold hover:opacity-60 cursor-pointer"
                        onClick={() =>
                          updateQuantity(cartItem, item.id, "decrease")
                        }
                      >
                        -
                      </button>
                      <span className="font-semibold text-black">
                        {item.quantity}
                      </span>
                      <button
                        className="text-black font-semibold hover:opacity-60 cursor-pointer"
                        onClick={() =>
                          updateQuantity(cartItem, item.id, "increase")
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      className="p-2 border border-black rounded-md hover:bg-black hover:text-white cursor-pointer transition"
                      onClick={() => deleteItem(item.id)}
                    >
                      <FaRegTrashAlt className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* TWO-COLUMN: RESPONSIVE FORM + BILL */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* DELIVERY FORM */}
              <div className="bg-white border border-black/10 rounded-lg p-6 shadow-sm h-full">
                <h2 className="text-xl font-semibold text-black mb-5 tracking-tight">
                  Delivery Info
                </h2>

                <div className="flex flex-col gap-3 text-sm">
                  <div>
                    <label className="font-medium text-black mb-1 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black/20 rounded-md text-sm 
                      focus:ring-1 focus:ring-black outline-none"
                      placeholder="John Doe"
                      value={address.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="font-medium text-black mb-1 block">
                      Address
                    </label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => updateField("street", e.target.value)}
                      placeholder="Your address"
                      className="w-full p-2 border border-black/20 rounded-md text-sm 
                      focus:ring-1 focus:ring-black outline-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="w-full">
                      <label className="font-medium text-black mb-1 block">
                        State
                      </label>
                      <input
                        type="text"
                        value={address.state}
                        onChange={(e) => updateField("state", e.target.value)}
                        placeholder="State"
                        className="w-full p-2 border border-black/20 rounded-md text-sm 
                        focus:ring-1 focus:ring-black outline-none"
                      />
                    </div>
                    <div className="w-full">
                      <label className="font-medium text-black mb-1 block">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={address.pincode}
                        onChange={(e) => updateField("pincode", e.target.value)}
                        className="w-full p-2 border border-black/20 rounded-md text-sm 
                        focus:ring-1 focus:ring-black outline-none"
                        placeholder="Pincode"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="w-full">
                      <label className="font-medium text-black mb-1 block">
                        Country
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-black/20 rounded-md text-sm 
                        focus:ring-1 focus:ring-black outline-none"
                        placeholder="Country"
                        value={address.country}
                        onChange={(e) => updateField("country", e.target.value)}
                      />
                    </div>
                    <div className="w-full">
                      <label className="font-medium text-black mb-1 block">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={address.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="w-full p-2 border border-black/20 rounded-md text-sm 
                        focus:ring-1 focus:ring-black outline-none"
                        placeholder="Phone"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => saveAddress()}
                    className="w-full bg-black text-white py-2 mt-6 rounded-md text-sm 
                  hover:bg-gray-900 cursor-pointer active:scale-95 transition-all"
                  >
                    Save Address
                  </button>
                </div>
              </div>

              {/* BILL SUMMARY */}
              <div className="bg-white border border-black/10 rounded-lg p-6 shadow-sm h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-black mb-5 tracking-tight">
                    Bill Summary
                  </h2>

                  {/* Order Breakdown */}
                  <div className="space-y-3 text-sm text-black mb-6">
                    <div className="flex justify-between">
                      <p className="flex items-center gap-1">
                        <LuNotebookText /> Items Total
                      </p>
                      <span className="font-semibold">${totalPrice}</span>
                    </div>

                    <div className="flex justify-between">
                      <p className="flex items-center gap-1">
                        <MdDeliveryDining /> Delivery Charge
                      </p>
                      <div className="flex gap-1">
                        <span
                          className="line-through font-semibold"
                          style={{ textDecorationThickness: "2px" }}
                        >
                          $6
                        </span>

                        <span className="font-semibold text-green-600 text-[13px]">
                          FREE
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <p className="flex items-center gap-1">
                        <GiShoppingBag /> Handling Fee
                      </p>
                      <span className="font-semibold">
                        ${(totalPrice / 200).toFixed(2)}
                      </span>
                    </div>

                    {/* Estimated Taxes */}
                    <div className="flex justify-between">
                      <p className="flex items-center gap-1">
                        🧾 Estimated Taxes
                      </p>
                      <span className="font-semibold">
                        ${(totalPrice * 0.06).toFixed(2)}
                      </span>
                    </div>

                    <hr className="border-black/10 my-4" />

                    <div className="flex justify-between text-base font-semibold">
                      <p>Grand Total</p>
                      <span>
                        $
                        {(
                          Number(totalPrice) +
                          totalPrice / 200 +
                          totalPrice * 0.06
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mt-4">
                    <label className="font-semibold mb-1 block text-sm">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="w-full p-2 border border-black/20 rounded-md text-sm 
          focus:ring-1 focus:ring-black outline-none"
                        placeholder="Enter promo"
                      />
                      <button
                        className="border border-black px-3 py-1 rounded-md text-sm 
          hover:bg-black hover:text-white transition-all cursor-pointer active:scale-95"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  className="w-full bg-black text-white py-2 rounded-md mt-6 text-sm 
      hover:bg-gray-900 cursor-pointer active:scale-95 transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center py-16">
            {/* Animation */}
            <div className="w-56 sm:w-72 md:w-80">
              <Lottie animationData={notFound} />
            </div>

            {/* Text */}
            <p className="text-gray-700 text-base sm:text-lg text-center px-6 mt-6 leading-relaxed">
              Your cart feels a little empty right now.
            </p>

            {/* Button */}
            <button
              onClick={() => navigate("/products")}
              className="mt-8 w-44 sm:w-52 bg-black text-white py-2.5 rounded-md text-sm 
               hover:bg-gray-900 transition-all tracking-wide cursor-pointer active:scale-95"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
