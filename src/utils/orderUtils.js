import { generateOrderId } from "./generateOrderId";

export const saveOrder = (cartItems, address, totalAmount) => {
  const newOrder = {
    orderId: generateOrderId(),
    date: new Date().toISOString(),
    items: cartItems,
    deliveryAddress: address,
    totalAmount,
    paymentMethod: "COD",
    status: "Placed",
  };

  const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

  localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));

  return newOrder;
};

export const getOrders = () => {
  return JSON.parse(localStorage.getItem("orders")) || [];
};
