
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
// import { OrderProvider } from "./context/OrderContext";
// import Join from "./pages/join"; // ✅ Changed from "./pages/join" to "./pages/Join"
// import Home from "./pages/Home";
// import ProductCollection from "./pages/ProductCollection";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import OrderHistory from "./pages/OrderHistory";
// import OrderDetails from "./pages/OrderDetails";
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminProducts from './pages/admin/AdminProducts';
// import AdminUsers from './pages/admin/AdminUsers';
// import AdminOrders from './pages/admin/AdminOrders';
// import UserProfile from './pages/UserProfile';

// function App() {
//   return (
//     <CartProvider>
//       <OrderProvider>
//         <Router>
//           <Routes>
//             <Route path="/admin" element={<AdminDashboard />} />
// <Route path="/admin/products" element={<AdminProducts />} />
// <Route path="/admin/users" element={<AdminUsers />} />
// <Route path="/admin/orders" element={<AdminOrders />} />
//             <Route path="/" element={<Join />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/collection/:category" element={<ProductCollection />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/orders" element={<OrderHistory />} />
//             <Route path="/order/:orderId" element={<OrderDetails />} />
//             <Route path="/profile" element={<UserProfile />} />
//           </Routes>
//         </Router>
//       </OrderProvider>
//     </CartProvider>
//   );
// }

//  export default App;
// // import React, { useEffect } from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import { CartProvider } from "./context/CartContext";
// // import { OrderProvider } from "./context/OrderContext";
// // import Join from "./pages/join";
// // import Home from "./pages/Home";
// // import ProductCollection from "./pages/ProductCollection";
// // import Cart from "./pages/Cart";
// // import Checkout from "./pages/Checkout";
// // import OrderHistory from "./pages/OrderHistory";
// // import OrderDetails from "./pages/OrderDetails";
// // import AdminDashboard from './pages/admin/AdminDashboard';
// // import AdminProducts from './pages/admin/AdminProducts';
// // import AdminUsers from './pages/admin/AdminUsers';
// // import AdminOrders from './pages/admin/AdminOrders';
// // import UserProfile from './pages/UserProfile';

// // function App() {
  
// //   // 🔄 MoEngage Lifecycle Callbacks Setup
// //   useEffect(() => {
// //     console.log('🔄 Setting up MoEngage lifecycle listeners...');
    
// //     const handleMoEngageLifecycle = (e) => {
// //       console.log("📡 MoEngage Lifecycle Event:", e.detail.name);
      
// //       if (e.detail.name === "SDK_INITIALIZATION_COMPLETED") {
// //         console.log("✅ MoEngage SDK fully initialized!", e.detail.data);
// //         handleSDKInitialized(e.detail.data);
// //       }
      
// //       if (e.detail.name === "SETTINGS_FETCHED") {
// //         console.log("📥 MoEngage settings fetched and cached for 24 hours", e.detail.data);
// //         handleSettingsFetched(e.detail.data);
// //       }
// //     };
    
// //     // Add the event listener
// //     window.addEventListener("MOE_LIFECYCLE", handleMoEngageLifecycle);
    
// //     // Cleanup function to remove listener when component unmounts
// //     return () => {
// //       window.removeEventListener("MOE_LIFECYCLE", handleMoEngageLifecycle);
// //     };
// //   }, []);

// //   // 🚀 Handle SDK Initialization Complete
// //   const handleSDKInitialized = (data) => {
// //     console.log("✅ MoEngage SDK is now fully ready for use!");
    
// //     // Check if user is already logged in
// //     const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
// //     if (currentUser.email && window.Moengage) {
// //       try {
// //         console.log("👤 Setting up MoEngage for existing user:", currentUser.email);
        
// //         // Set user ID and attributes safely
// //         window.Moengage.add_unique_user_id(currentUser.email);
        
// //         if (currentUser.email) window.Moengage.add_email(currentUser.email);
// //         if (currentUser.firstName) window.Moengage.add_first_name(currentUser.firstName);
// //         if (currentUser.lastName) window.Moengage.add_last_name(currentUser.lastName);
// //         if (currentUser.name) window.Moengage.add_user_attribute('u_n', currentUser.name);
// //         if (currentUser.mobile) window.Moengage.add_mobile(currentUser.mobile);
// //         if (currentUser.birthday) window.Moengage.add_birthday(currentUser.birthday);
// //         if (currentUser.gender) window.Moengage.add_gender(currentUser.gender);
        
// //         // Track SDK ready event
// //         window.Moengage.track_event('moengage_sdk_ready', {
// //           user_email: currentUser.email,
// //           login_method: currentUser.loginMethod || 'unknown',
// //           initialization_time: new Date().toISOString(),
// //           user_agent: navigator.userAgent.substring(0, 100), // Limit length
// //           page_url: window.location.href,
// //           app_version: '1.0.0'
// //         });
        
// //         // Track app startup
// //         window.Moengage.track_event('app_started', {
// //           user_email: currentUser.email,
// //           startup_time: new Date().toISOString(),
// //           referrer: document.referrer || 'direct',
// //           screen_resolution: `${screen.width}x${screen.height}`
// //         });
        
// //         console.log("✅ User setup completed in MoEngage after SDK initialization");
        
// //       } catch (error) {
// //         console.error("❌ Error setting up MoEngage user after SDK initialization:", error);
// //       }
// //     } else {
// //       console.log("ℹ️ No logged-in user found or MoEngage not available");
      
// //       // Track anonymous app startup
// //       if (window.Moengage) {
// //         try {
// //           window.Moengage.track_event('anonymous_app_started', {
// //             startup_time: new Date().toISOString(),
// //             page_url: window.location.href,
// //             referrer: document.referrer || 'direct'
// //           });
// //         } catch (error) {
// //           console.error("❌ Error tracking anonymous startup:", error);
// //         }
// //       }
// //     }
// //   };

// //   // 📥 Handle Settings Fetched
// //   const handleSettingsFetched = (data) => {
// //     console.log("📥 MoEngage settings loaded successfully!");
// //     console.log("💾 Settings are now cached in browser for 24 hours");
    
// //     // Track settings fetch event
// //     if (window.Moengage) {
// //       try {
// //         window.Moengage.track_event('moengage_settings_loaded', {
// //           settings_fetch_time: new Date().toISOString(),
// //           cached_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
// //           page_url: window.location.href,
// //           settings_data_available: !!data
// //         });
        
// //         console.log("✅ Settings fetch event tracked successfully");
// //       } catch (error) {
// //         console.error("❌ Error tracking settings fetch:", error);
// //       }
// //     }
// //   };

// //   return (
// //     <CartProvider>
// //       <OrderProvider>
// //         <Router>
// //           <Routes>
// //             <Route path="/admin" element={<AdminDashboard />} />
// //             <Route path="/admin/products" element={<AdminProducts />} />
// //             <Route path="/admin/users" element={<AdminUsers />} />
// //             <Route path="/admin/orders" element={<AdminOrders />} />
// //             <Route path="/" element={<Join />} />
// //             <Route path="/home" element={<Home />} />
// //             <Route path="/collection/:category" element={<ProductCollection />} />
// //             <Route path="/cart" element={<Cart />} />
// //             <Route path="/checkout" element={<Checkout />} />
// //             <Route path="/orders" element={<OrderHistory />} />
// //             <Route path="/order/:orderId" element={<OrderDetails />} />
// //             <Route path="/profile" element={<UserProfile />} />
// //           </Routes>
// //         </Router>
// //       </OrderProvider>
// //     </CartProvider>
// //   );
// // }

// // export default App;
import React from "react";
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

// ✅ MoEngage NPM SDK
import moengage from "@moengage/web-sdk";

// ✅ Initialize MoEngage SDK (do this ONCE in your app)
moengage.initialize({
  app_id: "ILHCGEFZ04ELWYTI71A01OW2", // Your actual App ID here
  cluster: "DC_3",            // e.g., "dc_3" for your data center
  debug_logs: 0               // Set 1 for debugging logs, 0 for production
});

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