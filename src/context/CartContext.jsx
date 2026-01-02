import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext({
  cartItem: [],
  totalCartQuantity: 0,
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  clearCart: () => {},
  deleteItem: (productId) => {},
});

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItem"));
    return storedCart ?? [];
  });

  const totalCartQuantity = cartItem.reduce((acc, curr) => {
    acc += curr.quantity;
    return acc;
  }, 0);

  const clearCart = () => {
    setCartItem([]);
  };

  const addToCart = (product) => {
    const cartItems = structuredClone(cartItem);
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    const existingItem = cartItems[existingItemIndex];

    if (existingItem) {
      existingItem.quantity += 1;
      cartItems.splice(existingItemIndex, 1, existingItem);
      setCartItem(cartItems);
    } else setCartItem((prev) => [...prev, { ...product, quantity: 1 }]);

    toast.success("Product successfully added to cart.");
  };

  const removeFromCart = (productId) => {
    const cartItems = structuredClone(cartItem);
    const existingItemIndex = cartItems.findIndex(
      (item) => item?.id === productId
    );
    const existingItem = cartItems[existingItemIndex];
    // if quantity is 1 then remove it
    if (existingItem.quantity === 1) deleteItem(productId);
    // else, decrease quantity by 1
    else {
      existingItem.quantity -= 1;
      cartItems.splice(existingItemIndex, 1, existingItem);
      setCartItem(cartItems);
    }
  };

  const deleteItem = (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (confirmDelete) {
      const cartItems = structuredClone(cartItem);
      const existingItemIndex = cartItems.findIndex(
        (item) => item.id === productId
      );
      cartItems.splice(existingItemIndex, 1);
      setCartItem(cartItems);
      toast.success("Product removed successfully.");
    }
  };

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addToCart,
        removeFromCart,
        deleteItem,
        clearCart,
        totalCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
