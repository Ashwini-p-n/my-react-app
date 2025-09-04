// src/pages/Home.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import myLogo from "../assets/image.png";
export default function Home() {
  const navigate = useNavigate();
  const { getCartCount } = useCart(); // Add cart functionality
  
  const categories = [
    {
      id: 1,
      name: "Necklaces",
      emoji: "📿",
      image: myLogo,
    },
    {
      id: 2,
      name: "Earrings", 
      emoji: "💎",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=500",
      count: "85+ Pieces"
    },
    {
      id: 3,
      name: "Rings",
      emoji: "💍", 
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=500",
      count: "95+ Pieces"
    },
    {
      id: 4,
      name: "Bracelets",
      emoji: "📿",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=500", 
      count: "60+ Pieces"
    },
    {
      id: 5,
      name: "Brooches",
      emoji: "✨",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500",
      count: "40+ Pieces"
    },
    {
      id: 6,
      name: "Anklets",
      emoji: "🌟",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6bi0Jks7pRlx8eyJqd-kT6jqrPvFW-4q95g&s",
      count: "30+ Pieces"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50">
      
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-pink-400 to-purple-600 p-2 rounded-full">
                <span className="text-2xl">💎</span>
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Sparkle & Co
                </h1>
                <p className="text-xs text-gray-500">Luxury Jewellery</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Collections</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Contact</a>
            </nav>

            {/* User Menu - Updated with Cart */}
            <div className="flex items-center space-x-4">
              {/* Cart Button with Counter */}
              <button 
                onClick={() => navigate('/cart')}
                className="text-gray-700 hover:text-purple-600 transform hover:scale-110 transition-all relative"
              >
                <span className="text-xl">🛍️</span>
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
              
              {/* Wishlist Button */}
              <button className="text-gray-700 hover:text-purple-600 transform hover:scale-110 transition-all">
                <span className="text-xl">❤️</span>
              </button>
              
              {/* User Profile */}
              <div className="bg-purple-100 p-2 rounded-full hover:bg-purple-200 transition-colors cursor-pointer">
                <span className="text-sm">👤</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-4">
            Welcome to Your
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Sparkling Collection ✨
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover handcrafted luxury jewellery that tells your unique story
          </p>
          <button 
            onClick={() => navigate('/collection/necklaces')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Explore Collection 💎
          </button>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center text-gray-800 mb-12">
            Shop by Category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div 
                key={category.id}
                className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 border border-pink-100"
              >
                <div 
                  className="h-64 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-3xl mb-2">{category.emoji}</div>
                    <h3 className="text-2xl font-serif font-bold">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all">
                      <span className="text-white text-lg">❤️</span>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <button 
                    onClick={() => {
                      console.log(`Navigating to: /collection/${category.name.toLowerCase()}`);
                      navigate(`/collection/${category.name.toLowerCase()}`);
                    }}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-semibold hover:scale-105 transform transition-all duration-200"
                  >
                    Shop {category.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center mt-12 space-x-4">
          <button 
            onClick={() => navigate('/cart')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transform transition-all"
          >
            View Cart ({getCartCount()}) 🛒
          </button>
          <button 
            onClick={() => navigate('/collection/rings')} 
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transform transition-all"
          >
            🧪 Browse Rings
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Logo & Description */}
            <div className="col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-pink-400 to-purple-600 p-2 rounded-full">
                  <span className="text-xl">💎</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Sparkle & Co</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Crafting timeless elegance since 2020. Your trusted partner for luxury jewellery.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button 
                    onClick={() => navigate('/home')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/collection/rings')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Collections
                  </button>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Care Instructions</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <span className="text-xl cursor-pointer hover:scale-110 transform transition-all">📱</span>
                <span className="text-xl cursor-pointer hover:scale-110 transform transition-all">📧</span>
                <span className="text-xl cursor-pointer hover:scale-110 transform transition-all">📞</span>
              </div>
              <p className="text-sm text-gray-400">
                📧 hello@sparkleandco.com<br/>
                📞 +1 (555) 123-4567
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 Sparkle & Co. All rights reserved. Made with 💎 for jewellery lovers.
          </div>
        </div>
      </footer>
    </div>
  )
}