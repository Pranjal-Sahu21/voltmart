import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

const SingleProduct = () => {
  const params = useParams();
  const [singleProduct, setSingleProduct] = useState("");

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/${params.id}`
      );
      setSingleProduct(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <>
      {singleProduct ? (
        <div className="px-4 pb-10 md:px-0 bg-white pt-10">
          <div className="max-w-6xl p-4 mx-auto md:p-10 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl border border-gray-200">
            {/* IMAGE SECTION */}
            <div className="w-full flex justify-center items-center">
              <div className="p-6 rounded-2xl drop-shadow-2xl ">
                <img
                  src={singleProduct.image}
                  alt={singleProduct.title}
                  className="w-full max-h-[420px] object-contain drop-shadow-xl"
                />
              </div>
            </div>

            {/* PRODUCT DETAILS */}
            <div className="flex flex-col gap-6">
              {/* TITLE */}
              <h1 className="md:text-4xl text-2xl font-bold text-black leading-tight">
                {singleProduct.title}
              </h1>

              {/* CATEGORY */}
              <div className="text-gray-500 uppercase tracking-wide text-sm font-medium">
                {singleProduct.category}
              </div>

              {/* PRICE (ONLY API PRICE) */}
              <p className="text-2xl font-semibold text-black">
                ${singleProduct.price}
              </p>

              {/* DESCRIPTION */}
              <p className="text-gray-700 leading-relaxed">
                {singleProduct.description}
              </p>

              {/* RATING */}
              <div className="flex items-center gap-2">
                <span className="text-black text-xl">★</span>
                <span className="text-black font-semibold">
                  {singleProduct.rating.rate}
                </span>
                <span className="text-gray-500 text-sm">
                  ({singleProduct.rating.count} reviews)
                </span>
              </div>

              {/* QUANTITY */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="w-20 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* ADD TO CART BUTTON */}
              <div className="mt-4 flex justify-center md:justify-start">
                <button
                  onClick={() => addToCart(singleProduct)}
                  className="flex gap-1 bg-black text-white px-6 py-3 rounded-md hover:bg-[#25241F] transition-all cursor-pointer mt-4 active:scale-95"
                >
                  <IoCartOutline className="w-6 h-6" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default SingleProduct;
