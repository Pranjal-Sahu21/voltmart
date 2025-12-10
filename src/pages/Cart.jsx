import React from 'react'
import { useCart } from '../context/CartContext'

const Cart = () => {

  const {cartItem} = useCart();

  return (
    <div>Cart</div>
  )
}

export default Cart