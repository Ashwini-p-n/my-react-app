// src/pages/ProductCollection.jsx
import React, { useState, useEffect } from 'react'; // ✅ Add missing imports
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import myLogo from "../assets/download.jpeg";
import moengage from "@moengage/web-sdk";
export default function ProductCollection() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart, getCartCount } = useCart();
  
  // ✅ Add useState for showPushPrompt
  const [showPushPrompt, setShowPushPrompt] = useState(false);

  // Smart triggers for push opt-in
  useEffect(() => {
    const shouldShowPushOptIn = () => {
      // Check if user already gave permission
      if (Notification.permission === 'granted') return false;
      if (Notification.permission === 'denied') return false;
      
      // Check if user already saw prompt recently
      const lastShown = localStorage.getItem('push_optIn_last_shown');
      if (lastShown) {
        const daysSince = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
        if (daysSince < 7) return false; // Don't show again for 7 days
      }
      
      return true;
    };

    // Trigger scenarios
    const triggers = {
      // After user adds item to cart
      onAddToCart: () => {
        if (shouldShowPushOptIn()) {
          setTimeout(() => setShowPushPrompt(true), 2000);
        }
      },
      
      // After viewing engagement rings
      onEngagementRingView: () => {
        if (shouldShowPushOptIn() && category === 'rings') {
          setTimeout(() => setShowPushPrompt(true), 5000);
        }
      },
      
      // After adding to wishlist
      onWishlistAdd: () => {
        if (shouldShowPushOptIn()) {
          setShowPushPrompt(true);
        }
      },
      
      // On second page visit
      onReturnVisit: () => {
        const visitCount = parseInt(localStorage.getItem('visit_count') || '0');
        if (visitCount >= 2 && shouldShowPushOptIn()) {
          setTimeout(() => setShowPushPrompt(true), 3000);
        }
      }
    };

    // Track visits
    const visitCount = parseInt(localStorage.getItem('visit_count') || '0');
    localStorage.setItem('visit_count', (visitCount + 1).toString());
    
    // Check for return visit trigger
    triggers.onReturnVisit();
    
  }, [category]);

  // Handle push opt-in
  const handlePushOptIn = (allow = true) => {
    setShowPushPrompt(false);
    
    // Mark as shown
    localStorage.setItem('push_optIn_last_shown', Date.now().toString());
    
    if (allow && window.Moengage) {
      // Show browser's native permission request
      window.Moengage.call_web_push();
      
      // Track event
      // window.Moengage.track_event('push_optIn_accepted', {
      //   source: 'custom_soft_ask',
      //   page: window.location.pathname,
      //   user_email: JSON.parse(localStorage.getItem('currentUser') || '{}').email
      // });
      moengage.track_event("Add_to_Cart", {
      product_id: product.id,
      product_name: product.name,
      product_category: category,
      product_price: product.price,
      product_original_price: product.originalPrice,
  product_discount: product.originalPrice - product.price,
  product_discount_percentage: Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100),
  product_rating: product.rating,
  product_stock: product.inStock,
  product_description: product.description,
  has_discount: product.originalPrice > product.price,
  currency: "USD",
  user_email: currentUser.email || 'unknown',
  user_name: currentUser.name || 'unknown',
  user_login_method: currentUser.loginMethod || 'unknown',
  current_cart_count: getCartCount() + 1,
  category_viewed: category,
  page_url: window.location.href,
  timestamp: new Date().toISOString(),
  is_sale_item: product.originalPrice > product.price,
  price_range: product.price < 1000 ? 'budget' :
               product.price < 3000 ? 'mid_range' : 'luxury',
  product_availability: product.inStock > 10 ? 'high' :
                         product.inStock > 0 ? 'low' : 'out_of_stock'
});
    } else {
      // Track dismissal
      if (window.Moengage) {
        window.Moengage.track_event('push_optIn_dismissed', {
          source: 'custom_soft_ask',
          page: window.location.pathname
        });
      }
    }
  };

  // Sample products data for different categories
  const productsData = {
    rings: [
      {
        id: 1,
        name: "Diamond Solitaire Ring",
        price: 2999,
        originalPrice: 3500,
        image: myLogo,
        description: "Elegant 14k white gold solitaire ring with 1-carat diamond. Perfect for engagements and special occasions.",
        rating: 4.8,
        inStock: 12
      },
      {
        id: 2,
        name: "Rose Gold Vintage Ring",
        price: 1899,
        originalPrice: 2200,
        image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=500",
        description: "Vintage-inspired rose gold ring with intricate detailing and antique finish.",
        rating: 4.6,
        inStock: 8
      },
      {
        id: 3,
        name: "Emerald Cut Engagement",
        price: 4299,
        originalPrice: 5000,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500",
        description: "Stunning emerald cut diamond in platinum setting with side stones.",
        rating: 4.9,
        inStock: 5
      },
      {
        id: 4,
        name: "Sapphire Halo Ring",
        price: 2199,
        originalPrice: 2600,
        image: "https://images.unsplash.com/photo-1588444650700-6c4d64ddc9b7?q=80&w=500",
        description: "Blue sapphire surrounded by diamond halo in white gold setting.",
        rating: 4.7,
        inStock: 15
      }
    ],
    necklaces: [
      {
        id: 5,
        name: "Diamond Tennis Necklace",
        price: 5999,
        originalPrice: 7200,
        image: "https://diaidesigns.in/cdn/shop/files/Diamond_Dazzler_Necklace.jpg?v=1751370449",
        description: "Classic tennis necklace with 50 brilliant cut diamonds in white gold.",
        rating: 4.9,
        inStock: 6
      },
      {
        id: 6,
        name: "Pearl & Gold Chain",
        price: 899,
        originalPrice: 1100,
        image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=500",
        description: "Elegant freshwater pearl necklace with 18k gold chain and clasp.",
        rating: 4.5,
        inStock: 20
      },
      {
        id: 7,
        name: "Heart Pendant Necklace",
        price: 1299,
        originalPrice: 1500,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500",
        description: "18k gold heart pendant with diamond accent on delicate chain.",
        rating: 4.6,
        inStock: 10
      },
      {
        id: 8,
        name: "Layered Gold Necklace",
        price: 799,
        originalPrice: 950,
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR78oIGaVSrt28T8BnBB_-_RElK7ZAtbpf_p0YQ3GIbd13d30vNvMzp5Q-CQ8QefQA6XznqvDIzWTdo15Yx6iw3KPMA1EGH1dXcN735MBI",
        description: "Trendy layered necklace set with different chain styles in gold.",
        rating: 4.4,
        inStock: 25
      }
    ],
    earrings: [
      {
        id: 9,
        name: "Diamond Stud Earrings",
        price: 1799,
        originalPrice: 2100,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=500",
        description: "Classic diamond stud earrings in white gold with screw-back posts.",
        rating: 4.8,
        inStock: 25
      },
      {
        id: 10,
        name: "Pearl Drop Earrings",
        price: 699,
        originalPrice: 850,
        image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=500",
        description: "Elegant pearl drop earrings with gold setting and crystal accents.",
        rating: 4.4,
        inStock: 18
      },
      {
        id: 11,
        name: "Hoop Earrings",
        price: 999,
        originalPrice: 1200,
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSy73HMvfYtkXWS5cqBKEmn3k-O1Lg92NUXpVp1Kf9gUkMnatGyEe81lE6Fszb2r7z7bAPKI8L5Qq19_WXVrxnqTGswCrj242fO2l1e0yNrCnUXSX0md_NFtg",
        description: "Medium-sized gold hoop earrings with textured finish.",
        rating: 4.5,
        inStock: 30
      },
      {
        id: 12,
        name: "Chandelier Earrings",
        price: 1599,
        originalPrice: 1900,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500",
        description: "Statement chandelier earrings with crystals and gold plating.",
        rating: 4.7,
        inStock: 12
      }
    ],
    bracelets: [
      {
        id: 13,
        name: "Tennis Bracelet",
        price: 3499,
        originalPrice: 4200,
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=500",
        description: "Diamond tennis bracelet in white gold with secure clasp.",
        rating: 4.7,
        inStock: 7
      },
      {
        id: 14,
        name: "Gold Chain Bracelet",
        price: 1299,
        originalPrice: 1600,
        image: "https://images.unsplash.com/photo-1588444650700-6c4d64ddc9b7?q=80&w=500",
        description: "14k gold chain bracelet with charm attachment option.",
        rating: 4.5,
        inStock: 12
      },
      {
        id: 15,
        name: "Bangle Set",
        price: 899,
        originalPrice: 1100,
        image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=500",
        description: "Set of 3 rose gold bangles with different textures.",
        rating: 4.3,
        inStock: 20
      }
    ],
    brooches: [
      {
        id: 16,
        name: "Vintage Rose Brooch",
        price: 799,
        originalPrice: 950,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500",
        description: "Antique-style rose brooch with crystals and gold plating.",
        rating: 4.6,
        inStock: 8
      },
      {
        id: 17,
        name: "Butterfly Brooch",
        price: 599,
        originalPrice: 750,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyX92svyZscDRINKaPFLKBAiACKrvgDpvObw&s",
        description: "Colorful butterfly brooch with enamel and crystal details.",
        rating: 4.4,
        inStock: 15
      }
    ],
    anklets: [
      {
        id: 18,
        name: "Gold Chain Anklet",
        price: 499,
        originalPrice: 600,
        image: "https://images.unsplash.com/photo-1588444650700-6c4d64ddc9b7?q=80&w=500",
        description: "Delicate gold chain anklet with adjustable length.",
        rating: 4.2,
        inStock: 25
      },
      {
        id: 19,
        name: "Pearl Anklet",
        price: 399,
        originalPrice: 500,
        image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=500",
        description: "Beach-style anklet with freshwater pearls and beads.",
        rating: 4.0,
        inStock: 30
      }
    ]
  };

  const categoryInfo = {
    rings: { 
      title: "Rings Collection", 
      emoji: "💍", 
      description: "Find your perfect ring for any occasion" 
    },
    necklaces: { 
      title: "Necklaces Collection", 
      emoji: "📿", 
      description: "Elegant necklaces to complement your style" 
    },
    earrings: { 
      title: "Earrings Collection", 
      emoji: "💎", 
      description: "Beautiful earrings to complete your look" 
    },
    bracelets: { 
      title: "Bracelets Collection", 
      emoji: "✨", 
      description: "Stunning bracelets and bangles for your wrist" 
    },
    brooches: { 
      title: "Brooches Collection", 
      emoji: "🌹", 
      description: "Vintage and modern brooches for elegant accents" 
    },
    anklets: { 
      title: "Anklets Collection", 
      emoji: "🌟", 
      description: "Delicate anklets for a touch of elegance" 
    }
  };

  const products = productsData[category] || [];
  const info = categoryInfo[category] || { 
    title: "Collection", 
    emoji: "💎", 
    description: "Luxury jewellery collection" 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50">
      
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Back Button & Logo */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/home')}
                className="text-purple-600 hover:text-red-600 text-2xl font-bold transition-colors"
              >
                ← 
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-pink-400 to-purple-600 p-2 rounded-full">
                  <span className="text-2xl">💎</span>
                </div>
                <div>
                  <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Sparkle & Co
                  </h1>
                  <p className="text-xs text-gray-500">Luxury Jewellery</p>
                </div>
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/cart')}
                className="text-gray-700 hover:text-purple-600 transform hover:scale-110 transition-all relative"
              >
                <span className="text-xl">🛍️</span>
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              </button>
              <button className="text-gray-700 hover:text-purple-600 transform hover:scale-110 transition-all">
                <span className="text-xl">❤️</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Hero */}
      <section className="py-12 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-6xl mb-4">{info.emoji}</div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4 capitalize">
            {info.title}
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            {info.description}
          </p>
          <div className="text-sm text-gray-500">
            {products.length} Products Available
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-pink-100"
                >
                  {/* Product Image */}
                  <div 
                    className="h-64 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${product.image})` }}
                  >
                    <div className="absolute top-4 right-4">
                      <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all">
                        <span className="text-red-500">❤️</span>
                      </button>
                    </div>
                    {product.originalPrice > product.price && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          SALE
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-bold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 h-10 overflow-hidden">
                      {product.description}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-purple-600">
                          ${product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Stock Info */}
                    <div className="mb-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.inStock > 10 
                          ? 'bg-green-100 text-green-800' 
                          : product.inStock > 0 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock > 0 ? `${product.inStock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                    
                    {/* Add to Cart Button */}
<div className="flex space-x-2">
  <button 
    onClick={() => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      
      // Add to cart first
      addToCart(product);
      
      // ✅ NPM SDK Add to Cart Event Tracking
      try {
        moengage.track_event("Add_to_Cart", {
          // Product Details
          product_id: product.id,
          product_name: product.name,
          product_category: category,
          product_price: product.price,
          product_original_price: product.originalPrice,
          product_discount: product.originalPrice - product.price,
          product_discount_percentage: Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100),
          product_rating: product.rating,
          product_stock: product.inStock,
          product_description: product.description,
          has_discount: product.originalPrice > product.price,
          currency: "USD",
          
          // User Context
          user_email: currentUser.email || 'unknown',
          user_name: currentUser.name || 'unknown',
          user_login_method: currentUser.loginMethod || 'unknown',
          
          // Shopping Context  
          current_cart_count: getCartCount() + 1,
          category_viewed: category,
          page_url: window.location.href,
          timestamp: new Date().toISOString(),
          
          // Engagement Metrics
          is_sale_item: product.originalPrice > product.price,
          price_range: product.price < 1000 ? 'budget' :
                       product.price < 3000 ? 'mid_range' : 'luxury',
          product_availability: product.inStock > 10 ? 'high' :
                               product.inStock > 0 ? 'low' : 'out_of_stock'
        });
        
        console.log('✅ MoEngage Add to Cart event tracked:', {
          product: product.name,
          category: category,
          price: product.price,
          user: currentUser.email
        });
        
      } catch (error) {
        console.error('❌ MoEngage Add to Cart tracking failed:', error);
      }
      
      // Show success message
      alert(`${product.name} added to cart! 🎉`);
    }}
    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-semibold hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={product.inStock === 0}
  >
    {product.inStock > 0 ? 'Add to Cart' : 'Out of Stock'}
  </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-600 mb-6">
                We don't have products for "{category}" category yet.
              </p>
              <button 
                onClick={() => navigate('/home')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transform transition-all"
              >
                ← Back to Home
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Custom Push Notification Opt-in Modal */}
      {showPushPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-3">
                Never Miss Exclusive Deals!
              </h3>
              <p className="text-gray-600 mb-6">
                Get instant alerts for flash sales, new collections, and price drops on your wishlist items.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-700">
                  <span className="text-xl mr-3">💍</span>
                  <span>New engagement ring collections</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="text-xl mr-3">⚡</span>
                  <span>Flash sales up to 50% off</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <span className="text-xl mr-3">❤️</span>
                  <span>Wishlist item price drops</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => handlePushOptIn(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => handlePushOptIn(true)}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:scale-105 transform transition-all"
                >
                  Yes, I Want Deals! 🎉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-pink-400 to-purple-600 p-2 rounded-full">
              <span className="text-xl">💎</span>
            </div>
            <h3 className="text-xl font-serif font-bold">Sparkle & Co</h3>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Sparkle & Co. All rights reserved. Made with �💎 for jewellery lovers.
          </p>
        </div>
      </footer>
    </div>
  );
}