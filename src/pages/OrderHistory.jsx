// src/pages/OrderHistory.jsx - CORRECTED & ENHANCED VERSION ✨
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

export default function OrderHistory() {
  const navigate = useNavigate();
  const { orders } = useOrders();
  
  console.log('OrderHistory - Current orders:', orders); // Debug log

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return '⏳';
      case 'Shipped': return '🚚';
      case 'Delivered': return '✅';
      case 'Cancelled': return '❌';
      default: return '📦';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50">
      
      {/* Floating sparkles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <span className="text-2xl opacity-20">
              {['✨', '💎', '⭐'][i % 3]}
            </span>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b-2 border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/home')}
                className="text-purple-600 hover:text-purple-800 text-3xl font-bold transform hover:scale-110 transition-all duration-300"
              >
                ← 
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-pink-400 via-purple-500 to-yellow-400 p-3 rounded-full shadow-lg">
                  <span className="text-3xl">📋</span>
                </div>
                <div>
                  <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent">
                    Order History
                  </h1>
                  <p className="text-sm text-gray-500 font-medium">Your Sparkle & Co Orders</p>
                </div>
              </div>
            </div>
            
            {/* Order Count Badge */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full border border-purple-200">
              <span className="text-purple-700 font-semibold">
                {orders.length} Order{orders.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {orders.length === 0 ? (
          // Empty State
          <div className="text-center py-20">
            <div className="relative mb-8">
              <div className="text-8xl mb-4 animate-bounce">📦</div>
              <div className="absolute -top-4 -right-8 text-3xl animate-spin">✨</div>
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
              No Orders Yet
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Start shopping for some sparkling jewellery and create your first order!
            </p>
            <button 
              onClick={() => navigate('/home')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transform transition-all shadow-lg"
            >
              ✨ Start Shopping ✨
            </button>
          </div>
        ) : (
          // Orders List
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-2">
                Your Orders ({orders.length})
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
            </div>

            {orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-purple-100 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/order/${order.id}`)}
              >
                
                {/* Order Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                      <span className="text-white text-xl">💎</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-purple-800">
                        Order {order.orderNumber}
                      </h3>
                      <p className="text-gray-600">
                        Placed on {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(order.status)}`}>
                      <span className="text-lg">{getStatusIcon(order.status)}</span>
                      <span className="font-bold">{order.status}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ${order.pricing?.total?.toFixed(2) || '0.00'}
                      </p>
                      <p className="text-sm text-gray-500">{order.items?.length || 0} items</p>
                    </div>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                  {order.items?.slice(0, 6).map((item, index) => (
                    <div key={item.id || index} className="relative group">
                      <div 
                        className="w-full h-20 bg-cover bg-center rounded-xl shadow-md group-hover:shadow-lg transition-all"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                        {item.quantity}
                      </div>
                    </div>
                  )) || (
                    <p className="text-gray-500 col-span-full text-center">No items found</p>
                  )}
                  {order.items?.length > 6 && (
                    <div className="w-full h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center border-2 border-dashed border-purple-300">
                      <span className="text-purple-600 font-semibold text-sm">
                        +{order.items.length - 6} more
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Order Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  
                  {/* Shipping Info */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">🚚</span>
                      <span className="font-semibold text-gray-800">Shipping</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {order.shipping?.email || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.shipping?.city}, {order.shipping?.state}
                    </p>
                  </div>
                  
                  {/* Payment Info */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">💳</span>
                      <span className="font-semibold text-gray-800">Payment</span>
                    </div>
                    <p className="text-sm text-gray-600">**** {order.payment?.cardNumber || '****'}</p>
                    <p className="text-sm text-gray-600">{order.payment?.cardName || 'N/A'}</p>
                  </div>
                  
                  {/* Delivery Info */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">📅</span>
                      <span className="font-semibold text-gray-800">Delivery</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Est. {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-600">
                      {Math.ceil((new Date(order.estimatedDelivery) - new Date()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                  
                  {/* Gift Info */}
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">{order.gift?.isGift ? '🎁' : '📦'}</span>
                      <span className="font-semibold text-gray-800">Package</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.gift?.isGift ? 'Gift Order' : 'Regular Order'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.gift?.wrapping ? 'Gift Wrapped' : 'Standard Package'}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-between items-center pt-4 border-t border-purple-200">
                  <div className="text-sm text-gray-500">
                    Click to view full order details →
                  </div>
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-2xl font-semibold hover:scale-105 transform transition-all shadow-md">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Quick Actions */}
        {orders.length > 0 && (
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/home')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transform transition-all shadow-lg mr-4"
            >
              🛍️ Continue Shopping
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-4 rounded-full font-semibold transition-all"
            >
              🔄 Refresh Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
}