import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const addToCart = (product) => {
    const itemIncart = cartItem.find((item) => item.id === product.id);
    if (itemIncart) {
      const updatedCart = cartItem.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItem(updatedCart);
    } else {
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product successfully added to cart.");
    }
  };

  const updateQuantity = (cartItem, productId, action) => {
    setCartItem(
      cartItem
        .map((item) => {
          if (item.id === productId) {
            let newUnit = item.quantity;
            if (action === "increase") {
              newUnit = newUnit + 1;
            } else if (action === "decrease") {
              if (newUnit == 1) {
                const confirmDelete = window.confirm(
                  "Are you sure you want to remove this product?"
                );

                if (confirmDelete) {
                  setCartItem(cartItem.filter((item) => item.id !== productId));
                  toast.success("Product removed.");
                }
              }
              newUnit = newUnit - 1;
            }
            return newUnit > 0 ? { ...item, quantity: newUnit } : null;
          }
          return item;
        })
        .filter((item) => item != null)
    );
  };

  const deleteItem = (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (confirmDelete) {
      setCartItem(cartItem.filter((item) => item.id !== productId));
      toast.success("Product removed.");
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
