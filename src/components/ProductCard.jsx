import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  return (
    <div className="border relative border-gray-200 rounded-2xl cursor-pointer hover:shadow-lg transition-all bg-white p-4 h-[380px] flex flex-col justify-between" onClick={() => navigate(`/products/${product.id}`)}>
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
      <button className="flex justify-center gap-2 uppercase text-xs sm:text-sm tracking-wide font-medium text-gray-700 bg-gray-100 px-5 py-2.5 rounded-lg border hover:border-gray-300 hover:text-gray-900 transition-all duration-200 shadow-sm active:scale-95 cursor-pointer">
        <IoCartOutline className="w-5 h-5" />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
