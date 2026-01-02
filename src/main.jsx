import { createRoot } from "react-dom/client";
import "./index.css";
import "rc-slider/assets/index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { DataProvider } from "./context/DataContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { Slide, ToastContainer } from "react-toastify";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
    <DataProvider>
      <CartProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <App />
          <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
          />
        </ClerkProvider>
      </CartProvider>
    </DataProvider>
);
