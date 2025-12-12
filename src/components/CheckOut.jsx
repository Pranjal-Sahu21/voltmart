import Lottie from "lottie-react";
import React, { useEffect } from "react";
import delivery from "../assets/Delivery.json";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import empty from "../assets/EmptyBox.json"; 

const CheckOut = () => {
  const { cartItem } = useCart();
  useEffect(() => {
    window.scrollTo(0, 0);
  },[])

  if (cartItem.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10 text-center -mt-24">
        {/* Empty Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[300px] mb-6"
        >
          <Lottie animationData={empty} loop={true} />
        </motion.div>

        <h1 className="text-2xl font-bold text-black mb-3">No Order Found</h1>

        <p className="text-gray-700 text-base mb-6">
          Your cart is empty. Add items to proceed with checkout.
        </p>

        <button
          className="bg-black text-white px-6 py-2 rounded-md text-sm hover:bg-gray-900 transition-all active:scale-95 cursor-pointer"
          onClick={() => (window.location.href = "/products")}
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10 text-center -mt-40">
      {/* Lottie Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[380px] mb-6"
      >
        <Lottie animationData={delivery} loop={true} />
      </motion.div>

      {/* Checkout Text Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg"
      >
        <h1 className="text-3xl font-bold text-black tracking-tight mb-4 -mt-20">
          Your Order is on the Way!
        </h1>

        <p className="text-gray-700 text-base leading-relaxed mb-6">
          Thank you for shopping with us. Your items are being prepared and will
          be delivered to your address shortly.
        </p>

        <button
          className="w-[120px] py-2 bg-black text-white rounded-md text-sm hover:bg-gray-900 transition-all active:scale-95 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default CheckOut;
