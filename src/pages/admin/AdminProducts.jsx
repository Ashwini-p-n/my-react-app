import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('rings');
  const [editingProduct, setEditingProduct] = useState(null);

  // Form data for new/edit product
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    image: '',
    description: '',
    rating: 4.5,
    inStock: 1,
    category: 'rings'
  });

  const categories = ['rings', 'necklaces', 'earrings', 'bracelets', 'brooches', 'anklets'];

  // Load products from localStorage (simulating a database)
  useEffect(() => {
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Initialize with some default products
      const defaultProducts = {
        rings: [
          {
            id: 1,
            name: "Diamond Solitaire Ring",
            price: 2999,
            originalPrice: 3500,
            image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=500",
            description: "Elegant 14k white gold solitaire ring with 1-carat diamond.",
            rating: 4.8,
            inStock: 12,
            category: 'rings',
            createdAt: new Date().toISOString()
          }
        ],
        necklaces: [],
        earrings: [],
        bracelets: [],
        brooches: [],
        anklets: []
      };
      setProducts(defaultProducts);
      localStorage.setItem('admin_products', JSON.stringify(defaultProducts));
    }
  }, []);

  // Save products to localStorage
  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem('admin_products', JSON.stringify(updatedProducts));
    
    // Also save to the main products data that your ProductCollection uses
    localStorage.setItem('products_data', JSON.stringify(updatedProducts));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    });
  };

  // Add new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    
    const newProduct = {
      ...formData,
      id: Date.now(), // Simple ID generation
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      rating: parseFloat(formData.rating),
      inStock: parseInt(formData.inStock),
      createdAt: new Date().toISOString()
    };

    const updatedProducts = {
      ...products,
      [formData.category]: [...(products[formData.category] || []), newProduct]
    };

    saveProducts(updatedProducts);
    
    // Track in MoEngage
    if (window.Moengage) {
      window.Moengage.track_event('admin_product_added', {
        product_name: newProduct.name,
        product_category: newProduct.category,
        product_price: newProduct.price,
        admin_email: JSON.parse(localStorage.getItem('currentUser') || '{}').email
      });
    }

    // Reset form
    setFormData({
      name: '', price: '', originalPrice: '', image: '', description: '',
      rating: 4.5, inStock: 1, category: 'rings'
    });
    setShowAddForm(false);
    alert('Product added successfully! 🎉');
  };

  // Delete product
  const handleDeleteProduct = (categoryName, productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = {
        ...products,
        [categoryName]: products[categoryName].filter(p => p.id !== productId)
      };
      
      saveProducts(updatedProducts);
      
      // Track in MoEngage
      if (window.Moengage) {
        window.Moengage.track_event('admin_product_deleted', {
          product_id: productId,
          product_category: categoryName,
          admin_email: JSON.parse(localStorage.getItem('currentUser') || '{}').email
        });
      }
      
      alert('Product deleted successfully! 🗑️');
    }
  };

  // Get all products as flat array with category info
  const getAllProducts = () => {
    const allProducts = [];
    Object.keys(products).forEach(category => {
      if (products[category]) {
        products[category].forEach(product => {
          allProducts.push({ ...product, category });
        });
      }
    });
    return allProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const filteredProducts = selectedCategory === 'all' 
    ? getAllProducts() 
    : products[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600">Manage your jewelry inventory</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/admin')}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              ← Back to Admin
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {showAddForm ? 'Cancel' : '+ Add Product'}
            </button>
          </div>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price ($)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                <input
                  type="number"
                  name="inStock"
                  value={formData.inStock}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                  step="0.1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
                >
                  Add Product 💎
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Category Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories ({getAllProducts().length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium capitalize ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat} ({(products[cat] || []).length})
              </button>
            ))}
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">
              {selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
              <span className="text-gray-500 font-normal ml-2">({filteredProducts.length} items)</span>
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={`${product.category}-${product.id}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                          onError={(e) => {e.target.src = 'https://via.placeholder.com/48x48?text=IMG'}}
                        />
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 capitalize">{product.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-medium">${product.price}</div>
                      {product.originalPrice > product.price && (
                        <div className="text-xs text-gray-500 line-through">${product.originalPrice}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.inStock > 10 ? 'bg-green-100 text-green-800' :
                        product.inStock > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">⭐ {product.rating}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleDeleteProduct(product.category, product.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-2">📦</div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                <p className="text-gray-500">Add some products to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}