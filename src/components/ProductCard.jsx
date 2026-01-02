import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItem } = useCart();

  const cartProduct = cartItem.find((item) => item.id === product.id);

  return (
    <div className="border relative border-gray-200 rounded-2xl hover:shadow-lg transition-all bg-white p-4 flex flex-col justify-around">
      <div className="overflow-hidden rounded-xl bg-gray-100">
        <img
          src={product?.image}
          alt={product?.description}
          className="w-full aspect-square object-contain p-4 cursor-pointer transition-all"
          onClick={() => navigate(`/products/${product.id}`)}
        />
      </div>

      <h1 className="line-clamp-2 mt-3 mb-1 font-semibold text-gray-900 text-sm md:text-base">
        {product?.title}
      </h1>

      <p className="text-xl font-bold text-black mb-4">${product.price}</p>

      {/* CONDITIONAL BUTTON */}
      {!cartProduct ? (
        <button
          onClick={() => addToCart(product)}
          className="flex justify-center gap-2 uppercase text-sm tracking-wide font-medium text-gray-700 bg-gray-100 px-5 py-3 rounded-lg border hover:border-gray-300 hover:text-gray-900 transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
        >
          <IoCartOutline className="w-5 h-5" />
          Add to cart
        </button>
      ) : (
        <div className="flex items-center justify-around bg-gray-100 border rounded-lg px-4 py-2 ">
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-lg text-gray-700 font-medium hover:opacity-60"
          >
            −
          </button>

          <span className="font-medium text-gray-700 -mx-24">{cartProduct.quantity}</span>

          <button
            onClick={() => addToCart(product)}
            className="text-lg text-gray-700 font-medium hover:opacity-60"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
