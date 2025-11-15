 import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import Join from "./pages/join";
import Home from "./pages/Home";
import ProductCollection from "./pages/ProductCollection";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import OrderDetails from "./pages/OrderDetails";
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import AdminOrders from './pages/admin/AdminOrders';
import UserProfile from './pages/UserProfile';

// Import CSS to override MoEngage notification positioning
import './styles/leftMoeNotification.css';

// ✅ MoEngage NPM SDK
// import moengage from "@moengage/web-sdk";

// // ✅ Initialize MoEngage SDK (keep your existing settings)
// moengage.initialize({
//   app_id: "MYL4VOAV1ZAERHPDK9NV42XR",
//   cluster: "dc_1",
//   debug_logs: 0,
//   useLatest: true,
//   swPath: "",
//   cards: {
//     enable: true,
//     placeholder: '#cardIcon'
//   }
// });

function App() {

  return (
    <CartProvider>
      <OrderProvider>
        <Router>
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/" element={<Join />} />
            <Route path="/home" element={<Home />} />
            <Route path="/collection/:category" element={<ProductCollection />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/order/:orderId" element={<OrderDetails />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Router>
      </OrderProvider>
    </CartProvider>
  );

}
export default App;

