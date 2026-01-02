import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from "../assets/Delivery.json";

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const access = sessionStorage.getItem("checkoutAccess");

    if (!access) {
      navigate("/cart");
      return;
    }

    sessionStorage.removeItem("checkoutAccess");

    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      navigate("/orders");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 space-y-6 -mt-24">
      {/* Animation */}
      <div className="w-64 sm:w-72 md:w-96">
        <Lottie animationData={successAnimation} loop={false} />
      </div>

      {/* Thank You Text */}
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-2 -mt-12">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Your order has been placed successfully.
        </p>
        <p className="text-gray-400 text-xs sm:text-sm">
          Redirecting to your orders page...
        </p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
