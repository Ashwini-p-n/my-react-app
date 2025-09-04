// src/pages/Checkout.jsx - LUXURY CHECKOUT PAGE ✨
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Gift Options
    isGift: false,
    giftMessage: '',
    giftWrap: false
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleStepNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };
  const handleStepBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
 // REPLACE your handlePlaceOrder function with this:
const [currentOrder, setCurrentOrder] = useState(null); // Add this state

const handlePlaceOrder = () => {
  console.log('🚀 Starting to place order...'); // Debug log
  
  // CREATE ORDER DATA
  const orderData = {
    items: cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      description: item.description
    })),
    shipping: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country
    },
    payment: {
      cardName: formData.cardName,
      cardNumber: formData.cardNumber.slice(-4), // Only store last 4 digits
      method: 'Credit Card'
    },
    gift: {
      isGift: formData.isGift,
      message: formData.giftMessage,
      wrapping: formData.giftWrap
    },
    pricing: {
      subtotal: getCartTotal(),
      tax: getCartTotal() * 0.08,
      giftWrap: formData.giftWrap ? 15 : 0,
      shipping: 0,
      total: getCartTotal() * 1.08 + (formData.giftWrap ? 15 : 0)
    }
  };

  console.log('📦 Order data created:', orderData); // Debug log

  // ADD ORDER TO CONTEXT
  const newOrder = addOrder(orderData);
  console.log('✅ Order added to context:', newOrder); // Debug log
  
  setCurrentOrder(newOrder);
  setOrderPlaced(true);
  
  setTimeout(() => {
    clearCart();
    navigate('/orders'); // Navigate to order history instead of home
  }, 5000);
};
  // Floating sparkles
  const FloatingSparkles = () => (
    <>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="fixed pointer-events-none z-10"
          style={{
            left: `${5 + i * 8}%`,
            top: `${10 + (i % 3) * 30}%`,
            animationDelay: `${i * 0.3}s`,
            animation: `sparkleFloat 4s ease-in-out infinite`,
          }}
        >
          <span className="text-xl opacity-20">
            {['✨', '💎', '⭐', '🌟', '💫', '💍'][i % 6]}
          </span>
        </div>
      ))}
      <style jsx>{`
        @keyframes sparkleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-25px) rotate(180deg); opacity: 0.4; }
        }
      `}</style>
    </>
  );
 // UPDATE your order success section:
if (orderPlaced && currentOrder) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 flex items-center justify-center relative overflow-hidden">
      <FloatingSparkles />
      
      {/* Success Animation */}
      <div className="text-center max-w-2xl px-4">
        <div className="relative">
          <div className="text-8xl mb-8 animate-bounce">🎉</div>
          <div className="absolute -top-4 -right-8 text-4xl animate-spin">✨</div>
          <div className="absolute -bottom-2 -left-8 text-3xl animate-pulse">💎</div>
        </div>
        
        <h1 className="text-6xl font-serif font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent mb-6">
          Order Placed Successfully! ✨
        </h1>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-purple-200 mb-8">
          <div className="text-4xl mb-4">💎</div>
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
            Thank You for Choosing Sparkle & Co!
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Your luxury jewellery will be carefully crafted and delivered within 3-5 business days.
          </p>
          
          {/* ORDER DETAILS FROM STORED DATA */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="font-bold text-purple-700">{currentOrder.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-bold text-purple-700">${currentOrder.pricing.total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-bold text-purple-700">{currentOrder.shipping.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Delivery</p>
                <p className="font-bold text-purple-700">
                  {new Date(currentOrder.estimatedDelivery).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/orders')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transform transition-all"
            >
              📋 View All Orders
            </button>
            <button 
              onClick={() => navigate('/home')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-2xl font-semibold transition-all"
            >
              🏠 Continue Shopping
            </button>
          </div>
        </div>
        
        <p className="text-gray-500 animate-pulse">
          Redirecting to order history in a few seconds...
        </p>
      </div>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 relative overflow-hidden">
      <FloatingSparkles />
      
      {/* Luxury Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b-2 border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/cart')}
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
                    Secure Checkout
                  </h1>
                  <p className="text-sm text-gray-500 font-medium">Complete Your Purchase</p>
                </div>
              </div>
            </div>
            
            {/* Security Badge */}
            <div className="hidden md:flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
              <span className="text-green-600">🔒</span>
              <span className="text-sm font-semibold text-green-700">256-bit SSL Secure</span>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            
            {/* Progress Steps */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-purple-100 mb-8">
              <div className="flex items-center justify-between mb-8">
                {[
                  { step: 1, title: "Shipping", icon: "🚚" },
                  { step: 2, title: "Payment", icon: "💳" },
                  { step: 3, title: "Gift Options", icon: "🎁" },
                  { step: 4, title: "Review", icon: "✨" }
                ].map((item) => (
                  <div key={item.step} className="flex flex-col items-center relative">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 ${
                      currentStep >= item.step 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {item.icon}
                    </div>
                    <span className={`text-sm font-semibold mt-2 ${
                      currentStep >= item.step ? 'text-purple-600' : 'text-gray-500'
                    }`}>
                      {item.title}
                    </span>
                    {item.step < 4 && (
                      <div className={`absolute top-8 left-16 w-20 h-1 ${
                        currentStep > item.step ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Step Content */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-purple-100">
              
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Shipping Information 🚚</h2>
                    <p className="text-gray-600">Where should we deliver your sparkles?</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                      placeholder="123 Main Street, Apt 4B"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                        placeholder="New York"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                        placeholder="NY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                        placeholder="10001"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-serif font-bol text-gray-800 mb-2">Payment Information 💳</h2>
                    <p className="text-gray-600">Secure payment processing</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name *</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                      placeholder="Name as it appears on card"
                      required
                    />
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🔒</span>
                      <div>
                        <p className="font-semibold text-gray-800">Secure Payment</p>
                        <p className="text-sm text-gray-600">Your payment information is encrypted and secure</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Step 3: Gift Options */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Gift Options 🎁</h2>
                    <p className="text-gray-600">Make it special for someone you love</p>
                  </div>
                  
                  <div className="space-y-6">
                    <label className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 cursor-pointer hover:border-purple-300 transition-all">
                      <input
                        type="checkbox"
                        name="isGift"
                        checked={formData.isGift}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-purple-600"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">This is a gift 💝</p>
                        <p className="text-sm text-gray-600">Add a personal message and gift options</p>
                      </div>
                    </label>
                    
                    {formData.isGift && (
                      <div className="space-y-4 bg-white/50 p-6 rounded-2xl border border-purple-200">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Gift Message</label>
                          <textarea
                            name="giftMessage"
                            value={formData.giftMessage}
                            onChange={handleInputChange}
                            className="w-full p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all h-32"
                            placeholder="Write your heartfelt message here..."
                          />
                        </div>
                        
                        <label className="flex items-center space-x-4 cursor-pointer">
                          <input
                            type="checkbox"
                            name="giftWrap"
                            checked={formData.giftWrap}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-purple-600"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">Premium Gift Wrapping (+$15)</p>
                            <p className="text-sm text-gray-600">Beautiful luxury gift box with ribbon</p>
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* Step 4: Review Order */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-gray-800 mb-2">Review Your Order ✨</h2>
                    <p className="text-gray-600">Please review your details before placing the order</p>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Shipping Summary */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                      <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                        <span className="text-xl mr-2">🚚</span>
                        Shipping Address
                      </h3>
                      <div className="text-gray-700">
                        <p>{formData.firstName} {formData.lastName}</p>
                        <p>{formData.address}</p>
                        <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                        <p>{formData.email}</p>
                      </div>
                    </div>
                    
                    {/* Payment Summary */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                      <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                        <span className="text-xl mr-2">💳</span>
                        Payment Method
                      </h3>
                      <p className="text-gray-700">**** **** **** {formData.cardNumber.slice(-4)}</p>
                      <p className="text-gray-700">{formData.cardName}</p>
                    </div>
                    
                    {/* Gift Options Summary */}
                    {formData.isGift && (
                      <div className="bg-gradient-to-r from-yellow-50 to-pink-50 rounded-2xl p-6 border border-yellow-200">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                          <span className="text-xl mr-2">🎁</span>
                          Gift Options
                        </h3>
                        <p className="text-gray-700">{formData.giftMessage}</p>
                        {formData.giftWrap && <p className="text-gray-700 mt-2">✨ Premium Gift Wrapping included</p>}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8 border-t border-purple-200">
                {currentStep > 1 && (
                  <button
                    onClick={handleStepBack}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-2xl font-semibold transition-all"
                  >
                    ← Back
                  </button>
                )}
                
                <div className="flex-1"></div>
                
                {currentStep < 4 ? (
                  <button
                    onClick={handleStepNext}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-2xl font-semibold transform hover:scale-105 transition-all shadow-lg"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-12 py-4 rounded-2xl font-bold text-lg transform hover:scale-105 transition-all shadow-xl"
                  >
                    ✨ Place Order ✨
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl p-8 shadow-2xl border-2 border-purple-100 sticky top-28">
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Your Order
                </h3>
              </div>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-white/70 rounded-2xl">
                    <div 
                      className="w-16 h-16 bg-cover bg-center rounded-xl"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between p-3 bg-white/70 rounded-xl">
                  <span>Subtotal</span>
                  <span className="font-semibold">${getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-3 bg-green-50 rounded-xl">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                {formData.giftWrap && (
                  <div className="flex justify-between p-3 bg-yellow-50 rounded-xl">
                    <span>Gift Wrapping</span>
                    <span className="font-semibold">$15</span>
                  </div>
                )}
                <div className="flex justify-between p-3 bg-blue-50 rounded-xl">
                  <span>Tax</span>
                  <span className="font-semibold">${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-2 border-purple-200">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-xl font-bold text-purple-600">
                    ${(getCartTotal() * 1.08 + (formData.giftWrap ? 15 : 0)).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="text-center space-y-3">
                <div className="flex justify-center space-x-4">
                  <span className="text-sm">🔒 Secure</span>
                  <span className="text-sm">💳 Protected</span>
                  <span className="text-sm">✅ Verified</span>
                </div>
                <p className="text-xs text-gray-500">
                  Your information is protected by 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}