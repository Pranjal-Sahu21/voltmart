import React from "react";
import { IoCartOutline } from "react-icons/io5";

const ProductCard = ({ product }) => {
  return (
    <div className="border relative border-gray-200 rounded-2xl cursor-pointer hover:shadow-xl transition-all bg-white p-4 h-[380px] flex flex-col justify-between">
      <div className="overflow-hidden rounded-xl bg-gray-100">
        <img
          src={product?.image}
          alt={product?.description}
          className="w-full aspect-square object-contain p-4 transition-all"
        />
      </div>
      <h1 className="line-clamp-2 mt-3 mb-1 font-semibold text-gray-900 text-sm md:text-base">
        {product?.title}
      </h1>
      <p className="text-xl font-bold text-black">${product.price}</p>
      <button className="flex items-center justify-center gap-2 bg-[#25241F] text-white w-full py-2 rounded-md hover:bg-black active:scale-95 transition-all mt-auto shadow-md cursor-pointer">
        <IoCartOutline className="w-5 h-5" />
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
