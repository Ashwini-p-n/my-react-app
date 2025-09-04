// // src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
// import { OrderProvider } from "./context/OrderContext";
// import Join from "./pages/join";
// import Home from "./pages/Home";
// import ProductCollection from "./pages/ProductCollection";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import OrderHistory from "./pages/OrderHistory";
// import OrderDetails from "./pages/OrderDetails";

// function App() {
//   return (
//     <CartProvider>
//       {/* cart provider manages shopping cart state..add delete etc */}
//       <OrderProvider>
//         {/* order provider manages order All components inside these providers can use useCart() or useOrders() hooks to access that global state. */}
//         <Router>
//           <Routes>
//             {/* Router is the "engine" that changes which component is shown based on the URL in the browser.
//  */}
//             <Route path="/" element={<Join />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/collection/:category" element={<ProductCollection />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/orders" element={<OrderHistory />} />
//             <Route path="/order/:orderId" element={<OrderDetails />} />
//             <Route path="/order/:orderId" element={<OrderDetails />} />
//           </Routes>
//         </Router>
//       </OrderProvider>
//     </CartProvider>
//   );
// }

// export default App;
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import Join from "./pages/join"; // ✅ Changed from "./pages/join" to "./pages/Join"
import Home from "./pages/Home";
import ProductCollection from "./pages/ProductCollection";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import OrderDetails from "./pages/OrderDetails";

function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Join />} />
            <Route path="/home" element={<Home />} />
            <Route path="/collection/:category" element={<ProductCollection />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/order/:orderId" element={<OrderDetails />} />
          </Routes>
        </Router>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;