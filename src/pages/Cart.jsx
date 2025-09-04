// src/pages/Cart.jsx - SPARKLY & EXTRAORDINARY VERSION ✨
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  // Floating sparkles animation
  const FloatingSparkles = () => (
    <>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="fixed pointer-events-none z-10"
          style={{
            left: `${10 + i * 12}%`,
            animationDelay: `${i * 0.5}s`,
            animation: `float 3s ease-in-out infinite ${i % 2 === 0 ? 'alternate' : 'alternate-reverse'}`,
          }}
        >
          <span className="text-2xl opacity-20">
            {['✨', '💎', '⭐', '🌟', '💫'][i % 5]}
          </span>
        </div>
      ))}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }
      `}</style>
    </>
  );

  // Empty cart with extra sparkle
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 relative overflow-hidden">
        <FloatingSparkles />
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 left-5 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-25 animate-ping"></div>

        {/* Luxury Header */}
        <header className="bg-white/95 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b-2 border-gradient-to-r from-pink-200 to-purple-200">
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
                  <div className="bg-gradient-to-br from-pink-400 via-purple-500 to-yellow-400 p-3 rounded-full shadow-lg animate-pulse">
                    <span className="text-3xl">💎</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent">
                      Sparkle Cart
                    </h1>
                    <p className="text-sm text-gray-500 font-medium">Your Luxury Collection</p>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Free Shipping</div>
                  <div className="text-xs text-purple-600 font-semibold">Always ✨</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Extraordinary Empty State */}
        <div className="flex items-center justify-center min-h-[75vh] px-4 relative">
          <div className="text-center max-w-2xl">
            {/* Animated Cart Icon */}
            <div className="relative mb-8">
              <div className="text-9xl mb-4 animate-bounce">🛒</div>
              <div className="absolute -top-4 -right-4 text-3xl animate-spin">✨</div>
              <div className="absolute -bottom-2 -left-4 text-2xl animate-pulse">💎</div>
            </div>
            
            <h2 className="text-5xl font-serif font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent mb-6">
              Your Cart Awaits Magic ✨
            </h2>
            <p className="text-xl text-gray-600 mb-4 leading-relaxed">
              Your luxury jewellery collection is waiting to sparkle! 
            </p>
            <p className="text-lg text-gray-500 mb-10">
              Discover handcrafted pieces that tell your unique story.
            </p>
            
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/home')}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white px-12 py-5 rounded-full font-bold text-xl hover:scale-110 transform transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 animate-pulse"
              >
                ✨ Start Shopping ✨
              </button>
              <div className="flex justify-center space-x-4 mt-6">
                <button 
                  onClick={() => navigate('/collection/rings')}
                  className="bg-white/80 backdrop-blur-sm text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition-all border border-purple-200"
                >
                  💍 Rings
                </button>
                <button 
                  onClick={() => navigate('/collection/necklaces')}
                  className="bg-white/80 backdrop-blur-sm text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition-all border border-purple-200"
                >
                  📿 Necklaces
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Cart with items - EXTRAORDINARY VERSION
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 relative overflow-hidden">
      <FloatingSparkles />
      
      {/* Luxury Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b-2 border-gradient-to-r from-pink-200 to-purple-200">
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
                  <span className="text-3xl">💎</span>
                </div>
                <div>
                  <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent">
                    Sparkle Cart ({cartItems.length})
                  </h1>
                  <p className="text-sm text-gray-500 font-medium">Your Luxury Selection</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-center">
                <div className="text-sm text-gray-500">Total Value</div>
                <div className="text-lg font-bold text-purple-600">${getCartTotal().toLocaleString()}</div>
              </div>
              <button 
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-all"
              >
                🗑️ Clear All
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-8xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
          
          {/* Cart Items - Luxury Design */}
          <div className="xl:col-span-3 space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-2">
                Your Sparkling Selection ✨
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
            </div>

            {cartItems.map((item, index) => (
              <div key={item.id} className="group">
                <div 
                  className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border-2 border-pink-100 hover:border-purple-200 transform hover:scale-[1.02] transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative">
                      <div 
                        className="w-full lg:w-40 h-40 bg-cover bg-center rounded-2xl shadow-lg"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        ✨ Premium
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                            {item.name}
                          </h3>
                          <div className="flex items-center mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-400 text-sm">⭐</span>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-2xl transform hover:scale-125 transition-all duration-300"
                        >
                          🗑️
                        </button>
                      </div>
                      
                      <p className="text-gray-600 text-base mb-6 leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-700 font-medium">Quantity:</span>
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 w-12 h-12 rounded-full flex items-center justify-center font-bold text-purple-600 text-xl transform hover:scale-110 transition-all"
                            >
                              -
                            </button>
                            <span className="font-bold text-2xl text-purple-600 bg-purple-50 w-16 h-12 rounded-xl flex items-center justify-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-xl transform hover:scale-110 transition-all shadow-lg"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="text-right">
                          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ${(item.price * item.quantity).toLocaleString()}
                          </div>
                          <div className="text-base text-gray-500">
                            ${item.price.toLocaleString()} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary - Luxury Design */}
          <div className="xl:col-span-1">
            <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl p-8 shadow-2xl border-2 border-purple-100 sticky top-28">
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Order Summary
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto mt-2 rounded-full"></div>
              </div>
              
              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center p-4 bg-white/70 rounded-2xl">
                  <span className="text-gray-700 font-medium">Subtotal</span>
                  <span className="text-xl font-bold text-gray-800">${getCartTotal().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">Shipping</span>
                  <span className="font-bold text-green-600 text-lg">FREE ✨</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">Insurance</span>
                  <span className="font-bold text-blue-600">Included 🛡️</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-2xl">
                  <span className="text-gray-700 font-medium">Tax</span>
                  <span className="font-semibold text-gray-800">${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="border-t-2 border-purple-200 pt-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
                    <span className="text-xl font-bold text-gray-800">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ${(getCartTotal() * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                // In Cart.jsx, find this button and update the onClick:
<button 
  onClick={() => navigate('/checkout')}
  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-purple-500/50"
>
  ✨ Proceed to Checkout ✨
</button>
                
                {showCheckout && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center animate-pulse">
                    <div className="text-2xl mb-2">🎉</div>
                    <p className="text-green-700 font-semibold">Checkout feature coming soon!</p>
                  </div>
                )}
                
                <button 
                  onClick={() => navigate('/home')}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-2xl font-semibold transition-all border-2 border-gray-200 hover:border-gray-300"
                >
                  🛍️ Continue Shopping
                </button>
                
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">Secure Payment Guaranteed</p>
                  <div className="flex justify-center space-x-2">
                    <span className="text-sm">🔒</span>
                    <span className="text-sm">💳</span>
                    <span className="text-sm">✅</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Footer */}
      <div className="text-center py-8 border-t border-purple-200 bg-white/50 backdrop-blur-sm">
        <p className="text-gray-600">
          ✨ Thank you for choosing <span className="font-bold text-purple-600">Sparkle & Co</span> ✨
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Your luxury jewellery destination since 2024
        </p>
      </div>
    </div>
  );
}