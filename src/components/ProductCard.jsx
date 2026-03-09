import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItem } = useCart();

  const cartProduct = cartItem.find((item) => item.id === product.id);

  return (
    <div className="h-[420px] border border-gray-200 rounded-2xl hover:shadow-lg transition-all bg-white p-4 flex flex-col justify-between">
      {/* Product Image */}
      <div className="h-48 overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
        <img
          src={product?.image}
          alt={product?.description}
          className="h-full object-contain p-4 cursor-pointer transition-all hover:scale-105"
          onClick={() => navigate(`/products/${product.id}`)}
        />
      </div>

      {/* Product Title */}
      <h1 className="line-clamp-2 mt-3 font-semibold text-gray-900 text-sm md:text-base">
        {product?.title}
      </h1>

      {/* Price */}
      <p className="text-xl font-bold text-black">${product?.price}</p>

      {/* Conditional Cart Section */}
      {!cartProduct ? (
        <button
          onClick={() => addToCart(product)}
          className="flex justify-center items-center gap-2 uppercase text-sm tracking-wide font-medium text-gray-700 bg-gray-100 px-5 py-3 rounded-lg border hover:border-gray-300 hover:text-gray-900 transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
        >
          <IoCartOutline className="w-5 h-5" />
          Add to cart
        </button>
      ) : (
        <div className="flex items-center justify-between bg-gray-100 border rounded-lg px-6 py-3">
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-lg text-gray-700 font-medium hover:opacity-60 cursor-pointer"
          >
            −
          </button>

          <span className="font-medium text-gray-700">
            {cartProduct.quantity}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="text-lg text-gray-700 font-medium hover:opacity-60 cursor-pointer"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
