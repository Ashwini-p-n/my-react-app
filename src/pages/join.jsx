// src/pages/Join.jsx - WITH GOOGLE OAUTH INTEGRATION
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function Join() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would normally validate credentials
    navigate('/home'); // Fixed: lowercase 'h'
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Here you would normally create account
    navigate('/home'); // Fixed: lowercase 'h'
  };

  // Handle Google OAuth Success
  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google login success:', credentialResponse);
    
    // Here you would:
    // 1. Send the credential to your backend
    // 2. Verify the token
    // 3. Create/login user
    // 4. Store auth token
    // 5. Redirect to home
    
    // For now, just navigate to home
    alert('Google login successful! Redirecting...');
    navigate('/home');
  };

  const handleGoogleError = () => {
    console.log('Google login failed');
    alert('Google login failed. Please try again.');
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
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full border border-gray-200 transform hover:scale-[1.02] transition-transform duration-300">
        
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

        {/* Google OAuth Button */}
        <div className="mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="large"
            width="100%"
            text={isLogin ? "signin_with" : "signup_with"}
            shape="rectangular"
          />
        </div>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink-0 px-4 text-gray-500 text-sm">or continue with email</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Regular Form */}
        <form 
          className="space-y-4"
          onSubmit={isLogin ? handleLogin : handleRegister}
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

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}