import React from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { GiShoppingBag } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem } = useCart();
  const navigate = useNavigate();

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
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain bg-gray-100 rounded-md p-2 border border-black/10 cursor-pointer"
                      onClick={() => navigate(`/products/${item.id}`)}
                    />

                    <div>
                      <h2 className="text-[15px] font-medium text-black w-[220px] sm:w-[260px] line-clamp-2 p-2">
                        {item.title}
                      </h2>
                      <p className="text-[17px] font-semibold text-black mt-1 p-2">
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT SIDE: QTY + DELETE */}
                  <div className="flex items-center gap-3 sm:ml-auto self-end sm:self-center">
                    {/* Quantity */}
                    <div className="flex items-center gap-2 border border-black rounded-md px-2 py-1 text-[14px]">
                      <button className="text-black font-semibold hover:opacity-60">
                        -
                      </button>
                      <span className="font-semibold text-black">1</span>
                      <button className="text-black font-semibold hover:opacity-60">
                        +
                      </button>
                    </div>

                    {/* Delete */}
                    <button className="p-2 border border-black rounded-md hover:bg-black hover:text-white transition">
                      <FaRegTrashAlt className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* TWO-COLUMN: RESPONSIVE FORM + BILL */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* DELIVERY FORM */}
              <div className="bg-white border border-black/10 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-black mb-5 tracking-tight">
                  Delivery Info
                </h2>

                <div className="flex flex-col gap-3 text-sm">
                  {/* Detect Location */}
                  <button
                    className="w-full mb-2 border border-black py-2 rounded-md text-sm cursor-pointer 
                    hover:bg-black hover:text-white transition active:scale-95"
                  >
                    Detect My Location
                  </button>

                  <div>
                    <label className="font-medium text-black mb-1 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-black/20 rounded-md text-sm 
                      focus:ring-1 focus:ring-black outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-black mb-1 block">
                      Address
                    </label>
                    <input
                      type="text"
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
                        className="w-full p-2 border border-black/20 rounded-md text-sm 
                        focus:ring-1 focus:ring-black outline-none"
                        placeholder="State"
                      />
                    </div>
                    <div className="w-full">
                      <label className="font-medium text-black mb-1 block">
                        Pincode
                      </label>
                      <input
                        type="text"
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
                      />
                    </div>
                    <div className="w-full">
                      <label className="font-medium text-black mb-1 block">
                        Phone
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-black/20 rounded-md text-sm 
                        focus:ring-1 focus:ring-black outline-none"
                        placeholder="Phone"
                      />
                    </div>
                  </div>

                  <button
                    className="w-full bg-black text-white py-2 mt-2 rounded-md text-sm 
                  hover:bg-gray-900 cursor-pointer active:scale-95 transition-all"
                  >
                    Save Address
                  </button>
                </div>
              </div>

              {/* BILL SUMMARY */}
              <div className="bg-white border border-black/10 rounded-lg p-6 shadow-sm h-max">
                <h2 className="text-xl font-semibold text-black mb-5 tracking-tight">
                  Bill Summary
                </h2>

                <div className="space-y-3 text-sm text-black">
                  <div className="flex justify-between">
                    <p className="flex items-center gap-1">
                      <LuNotebookText /> Items Total
                    </p>
                    <span className="font-semibold">${/* total */}</span>
                  </div>

                  <div className="flex justify-between">
                    <p className="flex items-center gap-1">
                      <MdDeliveryDining /> Delivery Charge
                    </p>
                    <span className="font-semibold text-green-600 text-[13px]">
                      FREE
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <p className="flex items-center gap-1">
                      <GiShoppingBag /> Handling Fee
                    </p>
                    <span className="font-semibold">$5</span>
                  </div>

                  <hr className="border-black/10" />

                  <div className="flex justify-between text-base font-semibold">
                    <p>Grand Total</p>
                    <span>${/* total + 5 */}</span>
                  </div>

                  {/* Promo */}
                  <div className="mt-4">
                    <label className="font-semibold mb-1 block">
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

                  <button
                    className="w-full bg-black text-white py-2 rounded-md mt-4 text-sm 
                  hover:bg-gray-900 cursor-pointer active:scale-95 transition-all"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-lg text-gray-600">
            Your cart is empty.
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
