import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsonHandler } from '../utils/jsonFileHandler';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [allUsersData, setAllUsersData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Check if already authenticated
    const adminAuth = localStorage.getItem('adminAuthenticated');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
      loadAllUsers();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadAllUsers();
    }
  }, [isAuthenticated]);

  const loadAllUsers = async () => {
    const data = jsonHandler.loadUsersData();
    setAllUsersData(data);
    console.log('📊 Loaded users data for admin:', data);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (loginData.username === 'admin' && loginData.password === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      alert('✅ Admin login successful!');
    } else {
      alert('❌ Invalid credentials! Use username: admin, password: 1234');
      setLoginData({ username: '', password: '' });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    setLoginData({ username: '', password: '' });
    setAllUsersData(null);
    setSelectedUser(null);
  };

  const downloadAllData = () => {
    if (allUsersData) {
      jsonHandler.downloadJsonFile(allUsersData);
    }
  };

  // 🔒 Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Access user management panel</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter admin username"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              🔓 Login to Admin Panel
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/join')}
              className="text-purple-600 hover:text-purple-800 text-sm"
            >
              ← Back to Main Site
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-xs text-gray-600">
              <strong>Demo Credentials:</strong><br />
              Username: admin<br />
              Password: 1234
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 👨‍💼 Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">👨‍💼</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-gray-600">User Management & Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={downloadAllData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                📥 Download All Data
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        {allUsersData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {allUsersData.metadata?.total_users || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                  👥
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Events</p>
                  <p className="text-3xl font-bold text-green-600">
                    {allUsersData.metadata?.total_events || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                  📊
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Email Users</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {allUsersData.users?.filter(u => u.loginMethod === 'email').length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                  📧
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Google Users</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {allUsersData.users?.filter(u => u.loginMethod === 'google').length || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl">
                  🔍
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Users List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">📋 All Users</h2>
              
              {allUsersData?.users?.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {allUsersData.users.map((user, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedUser(user)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedUser?.userId === user.userId
                          ? 'border-purple-300 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.firstName?.[0]?.toUpperCase() || user.name?.[0]?.toUpperCase() || '👤'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown User'}
                          </p>
                          <p className="text-sm text-gray-600 truncate">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.loginMethod === 'google' 
                                ? 'bg-orange-100 text-orange-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.loginMethod}
                            </span>
                            <span className="text-xs text-gray-500">
                              {user.stats?.totalEvents || 0} events
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-3">👥</div>
                  <p className="font-medium">No users found</p>
                  <p className="text-sm">Users will appear here after they sign up</p>
                </div>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {selectedUser ? `👤 ${selectedUser.name || 'User Details'}` : '👤 Select a User'}
              </h2>
              
              {selectedUser ? (
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 border-b pb-2">📋 Personal Information</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Full Name:</span>
                          <p className="text-gray-900">{selectedUser.name || 'Not provided'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Email:</span>
                          <p className="text-gray-900">{selectedUser.email}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Mobile:</span>
                          <p className="text-gray-900">{selectedUser.mobile || 'Not provided'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Birthday:</span>
                          <p className="text-gray-900">{selectedUser.birthday || 'Not provided'}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Gender:</span>
                          <p className="text-gray-900 capitalize">{selectedUser.gender || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900 border-b pb-2">📊 Account Statistics</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <div className="text-sm text-purple-600 font-medium">Login Method</div>
                          <div className="text-lg font-bold text-purple-800 capitalize">
                            {selectedUser.loginMethod}
                          </div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Total Events</div>
                          <div className="text-lg font-bold text-green-800">
                            {selectedUser.stats?.totalEvents || 0}
                          </div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Login Count</div>
                          <div className="text-lg font-bold text-blue-800">
                            {selectedUser.stats?.loginCount || 0}
                          </div>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <div className="text-sm text-orange-600 font-medium">Cart Actions</div>
                          <div className="text-lg font-bold text-orange-800">
                            {selectedUser.stats?.cartActions || 0}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Registration Date:</span>
                          <p className="text-gray-900">
                            {selectedUser.registrationDate ? 
                              new Date(selectedUser.registrationDate).toLocaleString() : 'Unknown'}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Last Login:</span>
                          <p className="text-gray-900">
                            {selectedUser.lastLoginDate ? 
                              new Date(selectedUser.lastLoginDate).toLocaleString() : 'Unknown'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MoEngage Events */}
                  {selectedUser.moengageEvents && selectedUser.moengageEvents.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 border-b pb-2 mb-4">📈 Recent Events</h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {selectedUser.moengageEvents.slice(-10).reverse().map((event, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <span className="font-medium text-gray-900">{event.event}</span>
                              <div className="text-sm text-gray-600">
                                {JSON.stringify(event.data).slice(0, 100)}...
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(event.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Raw JSON Data */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 border-b pb-2">🗂️ Raw JSON Data</h3>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(selectedUser, null, 2));
                          alert('User data copied to clipboard!');
                        }}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                      >
                        📋 Copy JSON
                      </button>
                    </div>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto max-h-64">
                      <pre className="text-xs font-mono whitespace-pre-wrap">
                        {JSON.stringify(selectedUser, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">👈</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a user</h3>
                  <p>Click on any user from the list to view their complete details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}