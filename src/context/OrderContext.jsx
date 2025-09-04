// // src/context/OrderContext.jsx
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
//     const newOrder = {
//       id: Date.now().toString(),
//       orderNumber: `SPK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
//       date: new Date().toISOString(),
//       status: 'Processing',
//       ...orderData,
//       estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days from now
//     };
    
//     setOrders(prev => [newOrder, ...prev]);
//     return newOrder;
//   };

//   const getOrderById = (orderId) => {
//     return orders.find(order => order.id === orderId);
//   };

//   const updateOrderStatus = (orderId, status) => {
//     setOrders(prev => prev.map(order => 
//       order.id === orderId ? { ...order, status } : order
//     ));
//   };

//   const value = {
//     orders,
//     addOrder,
//     getOrderById,
//     updateOrderStatus
//   };

//   return (
//     <OrderContext.Provider value={value}>
//       {children}
//     </OrderContext.Provider>
//   );
// };
// src/context/OrderContext.jsx - CREATE THIS FILE TOO
import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (orderData) => {
    console.log('📝 Adding order with data:', orderData);
    
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: `SPK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toISOString(),
      status: 'Processing',
      ...orderData,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    console.log('✅ Final order object:', newOrder);
    
    setOrders(prev => {
      const updated = [newOrder, ...prev];
      console.log('📦 Updated orders array:', updated);
      return updated;
    });
    
    return newOrder;
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const value = {
    orders,
    addOrder,
    getOrderById,
    updateOrderStatus
  };

  console.log('🔄 OrderContext current orders:', orders);

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};