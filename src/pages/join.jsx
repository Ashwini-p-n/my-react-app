// src/pages/Join.jsx
import React, { useState } from "react";
// React hook to manage component state (like switching between login/register)
import { useNavigate } from 'react-router-dom';
// React Router hook to programmatically change pages (like redirecting after login)
export default function Join() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
// setIsLogin:function to toggle between login/register
  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would normally validate credentials
    navigate('/Home'); }

  const handleRegister = (e) => {
    e.preventDefault();
    // Here you would normally create account
    navigate('/Home'); // Navigate to home after registration too
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 p-6"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1599643478518-a784e5dc9f03?q=80&w=1470&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full border border-gray-200 transform hover:scale-[1.02] transition-transform duration-300">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">
            {isLogin ? "💍" : "✨"}
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-1">
            {isLogin ? "Welcome Back" : "Join Our Collection"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isLogin
              ? "Sign in to explore luxury jewellery"
              : "Create your sparkling account"}
          </p>
        </div>

        {/* Form - ✅ Fixed onSubmit handler */}
        <form 
          className="space-y-4"
          onSubmit={isLogin ? handleLogin : handleRegister} // ✅ Use correct handler
          key={isLogin ? 'login' : 'register'}
        >
          {/* Name */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200"
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Confirm Password */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200"
                required
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm mb-2">
            {isLogin ? "New here?" : "Already a member?"}
          </p>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 hover:text-purple-800 font-semibold text-sm border-b-2 border-transparent hover:border-purple-400 transition-all duration-200"
          >
            {isLogin ? "Create Account" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}