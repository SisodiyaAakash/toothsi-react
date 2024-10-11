import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Cart = () => {
   const location = useLocation();
   const cartItems = location.state?.cartItems || [];
   const [cart, setCart] = useState(cartItems);

   const calculateSubtotal = (price, quantity) => {
      return (price * quantity).toFixed(2);
   };

   const calculateTotal = () => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
   };

   const updateQuantity = (productId, quantity) => {
      const updatedCart = cart.map((item) =>
         item.id === productId ? { ...item, quantity: parseInt(quantity) } : item
      );
      setCart(updatedCart);
   };

   return (
      <>
         <header>
            <div className="header">
               <h2 className="text-center">Your Cart</h2>
            </div>
         </header>

         <div className="cart-container">
            <div className={`cart-table-container ${cart.length === 0 ? 'full-width' : ''}`}>
               <table className="product-table">
                  <thead>
                     <tr>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                     </tr>
                  </thead>
                  <tbody>
                     {cart.length === 0 ? (
                        <tr>
                           <td colSpan="5" className="text-center">Your cart is empty.</td>
                        </tr>
                     ) : (
                        cart.map((item) => (
                           <tr key={item.id}>
                              <td><img src={item.image} alt={item.title} /></td>
                              <td>{item.title}</td>
                              <td>${item.price}</td>
                              <td>
                                 <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                                 />
                              </td>
                              <td>${calculateSubtotal(item.price, item.quantity)}</td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>

            {cart.length > 0 && (
               <div className="checkout-card">
                  <h3>Checkout Summary</h3>
                  <p>Total: <strong>${calculateTotal()}</strong></p>
                  <button className="checkout-button">Proceed to Checkout</button>
               </div>
            )}
         </div>
      </>
   );
};

export default Cart;
