import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const adminCards = [
    {
      title: 'Product Management',
      description: 'Add, edit, and delete jewelry items',
      icon: '💎',
      path: '/admin/products',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Users Management',
      description: 'View all registered users and their details',
      icon: '👥',
      path: '/admin/users',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Orders Management',
      description: 'Track and manage customer orders',
      icon: '📦',
      path: '/admin/orders',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Analytics',
      description: 'View sales and user analytics',
      icon: '📊',
      path: '/admin/analytics',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your jewelry store</p>
          </div>
          <button
            onClick={() => navigate('/home')}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            ← Back to Store
          </button>
        </div>

        {/* Admin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {adminCards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.path)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${card.color} p-6 text-center`}>
                <div className="text-4xl mb-2">{card.icon}</div>
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{card.description}</p>
                <div className="mt-4">
                  <span className="text-blue-600 font-medium hover:text-blue-800">
                    Manage →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}