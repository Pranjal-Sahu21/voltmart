import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import notSignedIn from "../assets/Login.json";
import Lottie from "lottie-react";
import noOrders from "../assets/NoOrders.json";
import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, useAuth } from "@clerk/clerk-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [openOrder, setOpenOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
    window.scrollTo(0, 0);
  }, []);

  if (!orders.length) {
    return (
      <>
        <SignedOut>
          <div className="min-h-screen flex flex-col items-center justify-center px-6 py-14 text-center bg-linear-to-b from-gray-50 to-gray-100">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-[380px] mb-6"
            >
              <Lottie animationData={notSignedIn} loop={true} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-2xl p-6 sm:p-10 w-full max-w-md -mt-2"
            >
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-black -mt-15">
                You're not logged in
              </h1>

              <p className="text-gray-700 text-base sm:text-lg mb-8 leading-relaxed">
                Please sign in to see your past orders.
              </p>

              <SignInButton>
                <motion.button className="bg-black text-white px-6 py-3 rounded-full active:scale-95 cursor-pointer text-base font-medium shadow-lg hover:bg-gray-900 transition-all duration-200">
                  Sign In
                </motion.button>
              </SignInButton>
            </motion.div>
          </div>
        </SignedOut>
        <SignedIn>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 px-4 space-y-6"
          >
            {/* Lottie Animation */}
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
              <Lottie animationData={noOrders} loop={true} />
            </div>

            {/* Text */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-center">
              No orders yet
            </h2>
            <button
              onClick={() => navigate("/products")}
              className="mt-4 w-44 sm:w-52 bg-black text-white py-2.5 rounded-md text-sm 
               hover:bg-gray-900 transition-all tracking-wide cursor-pointer active:scale-95"
            >
              Start Shopping
            </button>
          </motion.div>
        </SignedIn>
      </>
    );
  }

  return (
    <>
      <SignedIn>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-semibold mb-10 text-center sm:text-left"
          >
            My Orders <span className="text-gray-500">({orders.length})</span>
          </motion.h1>

          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* ORDER HEADER */}
                <button
                  onClick={() =>
                    setOpenOrder(openOrder === order.id ? null : order.id)
                  }
                  className="w-full text-left px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm sm:text-base">
                      Order ID -{" "}
                      <span className="text-gray-500 ml-1.5">#{order.id}</span>
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-2">
                      {new Date(order.date).toLocaleString()}
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-600 mt-1">
                      <span>📦 {order.items.length} Item(s)</span>
                      <span>
                        💰 Payment:{" "}
                        <span className="font-medium">Cash on Delivery</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-0">
                    <p className="font-semibold text-sm sm:text-base">
                      ${order.totalAmount}
                    </p>
                    <motion.span
                      animate={{ rotate: openOrder === order.id ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-gray-600"
                    >
                      <FaChevronDown />
                    </motion.span>
                  </div>
                </button>

                {/* ORDER DETAILS */}
                <AnimatePresence>
                  {openOrder === order.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-6 pt-4 border-t space-y-4 sm:space-y-6">
                        {order.items.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5"
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-14 h-14 sm:w-16 sm:h-16 object-contain bg-gray-100 rounded-lg p-2 flex-shrink-0"
                            />

                            <div className="flex-1 space-y-1 min-w-0">
                              <p className="text-sm font-medium line-clamp-2">
                                {item.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                Quantity: {item.quantity}
                              </p>
                            </div>

                            <p className="text-sm font-semibold flex-shrink-0">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-14 text-center bg-linear-to-b from-gray-50 to-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[380px] mb-6"
          >
            <Lottie animationData={notSignedIn} loop={true} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-2xl p-6 sm:p-10 w-full max-w-md -mt-2"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-black -mt-15">
              You're not logged in
            </h1>

            <p className="text-gray-700 text-base sm:text-lg mb-8 leading-relaxed">
              Please sign in to see your past orders.
            </p>

            <SignInButton>
              <motion.button className="bg-black text-white px-6 py-3 rounded-full active:scale-95 cursor-pointer text-base font-medium shadow-lg hover:bg-gray-900 transition-all duration-200">
                Sign In
              </motion.button>
            </SignInButton>
          </motion.div>
        </div>
      </SignedOut>
    </>
  );
};

export default Orders;
