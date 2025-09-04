// src/pages/OrderDetails.jsx - SIMPLE TEST VERSION
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center bg-white/90 rounded-3xl p-8 shadow-2xl border border-purple-200 max-w-md">
        <div className="text-6xl mb-6">📋</div>
        <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Order Details
        </h1>
        <p className="text-gray-600 mb-6">
          ✨ Order details page is working! ✨
        </p>
        <div className="space-y-4">
          <button 
            onClick={() => navigate('/orders')}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-105 transform transition-all"
          >
            📋 Back to Orders
          </button>
          <button 
            onClick={() => navigate('/home')}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-2xl font-semibold transition-all"
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}