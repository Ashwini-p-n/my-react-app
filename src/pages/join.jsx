// src/pages/Join.jsx - COMPLETE WITH GOOGLE OAUTH + MOENGAGE INTEGRATION
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

// 🎯 MoEngage Helper Function
const moEngageLogin = async (userId, userInfo = {}) => {
  if (window.Moengage) {
    await window.Moengage.add_unique_user_id(userId);
    if (userInfo.email) await window.Moengage.add_email(userInfo.email);
    if (userInfo.name) await window.Moengage.add_first_name(userInfo.name);
  }
};

// 🎯 Google JWT Decoder Function
const decodeGoogleJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding Google JWT:', error);
    return null;
  }
};

export default function Join() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  // 🎯 Form State Management
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🎯 Handle Email Login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Here you would normally validate credentials with your backend
      console.log('Login attempt:', { email: formData.email });
      
      // For demo purposes, assume login is successful
      const userId = formData.email;
      
      // 🎯 MoEngage Login
      await moEngageLogin(userId, { 
        email: formData.email,
        name: formData.fullName 
      });
      
      // Track login event
      if (window.Moengage) {
        window.Moengage.track_event('user_login', {
          source: 'email_form',
          login_method: 'email'
        });
      }
      
      // Store user data
      localStorage.setItem('currentUser', JSON.stringify({
        id: userId,
        email: formData.email,
        loginMethod: 'email'
      }));
      
      alert('Login successful! 🎉');
      navigate('/home');
      
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  // 🎯 Handle Email Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!formData.fullName || !formData.email || !formData.password) {
      alert('Please fill all required fields!');
      return;
    }
    
    try {
      // Here you would normally create account with your backend
      console.log('Registration attempt:', { 
        name: formData.fullName, 
        email: formData.email 
      });
      
      const userId = formData.email;
      
      // 🎯 MoEngage Registration
      await moEngageLogin(userId, { 
        email: formData.email,
        name: formData.fullName 
      });
      
      // Track registration event
      if (window.Moengage) {
        window.Moengage.track_event('user_registered', {
          source: 'email_form',
          registration_method: 'email'
        });
      }
      
      // Store user data
      localStorage.setItem('currentUser', JSON.stringify({
        id: userId,
        name: formData.fullName,
        email: formData.email,
        loginMethod: 'email'
      }));
      
      alert('Account created successfully! 🎉');
      navigate('/home');
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  // 🎯 Handle Google OAuth Success
  const handleGoogleSuccess = async (credentialResponse) => {
    console.log('Google login success:', credentialResponse);
    
    try {
      // ✅ DECODE the actual Google user data
      const googleUser = decodeGoogleJWT(credentialResponse.credential);
      
      if (googleUser) {
        console.log('Real Google user data:', googleUser);
        
        // ✅ Extract REAL user info from Google
        const realUserEmail = googleUser.email;
        const realUserName = googleUser.name;
        const realUserPicture = googleUser.picture;
        const realUserFirstName = googleUser.given_name;
        const realUserLastName = googleUser.family_name;
        
        // 🎯 MoEngage with REAL Google data
        await moEngageLogin(realUserEmail, { 
          email: realUserEmail,
          name: realUserName 
        });
        
        // Track Google login with real data
        if (window.Moengage) {
          window.Moengage.track_event('user_login', {
            login_method: 'google',
            source: 'google_oauth',
            user_email: realUserEmail,
            user_name: realUserName
          });
        }
        
        // Store real user data for your app
        localStorage.setItem('currentUser', JSON.stringify({
          id: realUserEmail,
          email: realUserEmail,
          name: realUserName,
          firstName: realUserFirstName,
          lastName: realUserLastName,
          picture: realUserPicture,
          loginMethod: 'google'
        }));
        
        alert('Google login successful! Redirecting... 🚀');
        navigate('/home');
        
      } else {
        throw new Error('Failed to decode Google user data');
      }
      
    } catch (error) {
      console.error('Google login processing error:', error);
      alert('Google login processing failed. Please try again.');
      
      // Track failed Google login
      if (window.Moengage) {
        window.Moengage.track_event('login_failed', {
          login_method: 'google',
          error_type: 'jwt_decode_error'
        });
      }
    }
  };

  const handleGoogleError = () => {
    console.log('Google login failed');
    
    // 🎯 MoEngage: Track failed login
    if (window.Moengage) {
      window.Moengage.track_event('login_failed', {
        login_method: 'google',
        error_type: 'google_oauth_error'
      });
    }
    
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
        >
          {/* Name - Only for Registration */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
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
              Email Address *
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              placeholder="you@example.com"
              className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              placeholder="••••••••"
              className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Confirm Password - Only for Registration */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                type="password"
                placeholder="••••••••"
                className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {isLogin ? "Sign In ✨" : "Create Account 💎"}
          </button>
        </form>

        {/* Toggle Between Login/Register */}
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