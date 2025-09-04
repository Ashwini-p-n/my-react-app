// // src/context/OrderContext.jsx - MAKE SURE THIS FILE EXISTS
// import React, { createContext, useContext, useState } from 'react';

// const OrderContext = createContext();

// export const useOrders = () => {
//   const context = useContext(OrderContext);
//   if (!context) {
//     throw new Error('useOrders must be used within an OrderProvider');
//   }
//   return context;
// };

// export const OrderProvider = ({ children }) => {
//   const [orders, setOrders] = useState([]);

//   const addOrder = (orderData) => {
//     console.log('📝 Adding order with data:', orderData); // Debug log
    
//     const newOrder = {
//       id: Date.now().toString(),
//       orderNumber: `SPK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
//       date: new Date().toISOString(),
//       status: 'Processing',
//       ...orderData,
//       estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
//     };
    
//     console.log('✅ Final order object:', newOrder); // Debug log
    
//     setOrders(prev => {
//       const updated = [newOrder, ...prev];
//       console.log('📦 Updated orders array:', updated); // Debug log
//       return updated;
//     });
    
//     return newOrder;
//   };

//   console.log('🔄 OrderContext current orders:', orders); // Debug log

//   const value = {
//     orders,
//     addOrder
//   };

//   return (
//     <OrderContext.Provider value={value}>
//       {children}
//     </OrderContext.Provider>
//   );
// };
// src/context/CartContext.jsx - CREATE THIS FILE
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    console.log('🛒 Adding to cart:', product);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new item, add with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  };

  console.log('🛒 CartContext current items:', cartItems);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};