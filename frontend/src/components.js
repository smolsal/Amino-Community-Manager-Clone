import React from 'react';
import { useAuth } from './contexts/AuthContext';

// Header Component
export const Header = ({ onNavigate, currentPage }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">✕</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Amino Community Manager</h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'dashboard' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('create')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'create' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            Create Community
          </button>
          <button
            onClick={() => onNavigate('customize')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'customize' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            Customize
          </button>
          <button
            onClick={() => onNavigate('moderate')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'moderate' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            Moderate
          </button>
          <button
            onClick={() => onNavigate('chat')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'chat' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            Chat
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">3</span>
            </div>
          </div>
          <div className="relative group">
            <div className="w-10 h-10 bg-gray-600 rounded-full overflow-hidden cursor-pointer">
              <img
                src={user?.photoURL || "https://images.pexels.com/photos/8728283/pexels-photo-8728283.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-3 border-b border-gray-700">
                <p className="text-white font-medium">{user?.displayName}</p>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
              <div className="p-2">
                <button
                  onClick={() => onNavigate('profile')}
                  className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Dashboard Component
export const Dashboard = () => {
  const stats = [
    { label: 'Total Communities', value: '12', change: '+2', color: 'bg-green-500' },
    { label: 'Active Members', value: '1,234', change: '+89', color: 'bg-blue-500' },
    { label: 'Posts Today', value: '456', change: '+23', color: 'bg-yellow-500' },
    { label: 'Moderation Queue', value: '8', change: '-3', color: 'bg-red-500' }
  ];

  const communities = [
    { name: 'Anime Lovers', members: '456', category: 'Entertainment', color: 'bg-pink-500' },
    { name: 'Gaming Hub', members: '789', category: 'Gaming', color: 'bg-blue-500' },
    { name: 'Art Community', members: '234', category: 'Creative', color: 'bg-green-500' },
    { name: 'Music Fans', members: '567', category: 'Music', color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
          <p className="text-gray-400">Manage your communities and track performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                <span className="text-green-400">{stat.change}</span> from last week
              </p>
            </div>
          ))}
        </div>

        {/* Communities List */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Your Communities</h3>
          <div className="space-y-4">
            {communities.map((community, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg ${community.color} flex items-center justify-center`}>
                    <span className="text-white font-bold">{community.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{community.name}</h4>
                    <p className="text-gray-400 text-sm">{community.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{community.members}</p>
                  <p className="text-gray-400 text-sm">members</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Create Community Component
export const CreateCommunity = () => {
  const categories = [
    { name: 'Entertainment', icon: '🎬', color: 'bg-pink-500' },
    { name: 'Gaming', icon: '🎮', color: 'bg-blue-500' },
    { name: 'Art', icon: '🎨', color: 'bg-green-500' },
    { name: 'Music', icon: '🎵', color: 'bg-purple-500' },
    { name: 'Sports', icon: '⚽', color: 'bg-orange-500' },
    { name: 'Technology', icon: '💻', color: 'bg-cyan-500' },
    { name: 'Books', icon: '📚', color: 'bg-yellow-500' },
    { name: 'Food', icon: '🍕', color: 'bg-red-500' },
    { name: 'Travel', icon: '✈️', color: 'bg-indigo-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Create Your Own Community</h2>
            <p className="text-gray-400 text-lg">Choose a category and start building your community</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`${category.color} p-6 rounded-xl hover:scale-105 transition-transform duration-200 group`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold text-white">{category.name}</h3>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Community Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Community Name
                </label>
                <input
                  type="text"
                  placeholder="Enter community name"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Describe your community"
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Community Icon
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-600 rounded-lg border-2 border-dashed border-gray-500 flex items-center justify-center">
                    <span className="text-gray-400">📷</span>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Upload Image
                  </button>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">
                Create Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Customize Component
export const Customize = () => {
  const themes = [
    { name: 'Purple Galaxy', primary: 'bg-purple-500', secondary: 'bg-pink-500', preview: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { name: 'Ocean Blue', primary: 'bg-blue-500', secondary: 'bg-cyan-500', preview: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { name: 'Forest Green', primary: 'bg-green-500', secondary: 'bg-emerald-500', preview: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { name: 'Sunset Orange', primary: 'bg-orange-500', secondary: 'bg-red-500', preview: 'bg-gradient-to-r from-orange-500 to-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Customize Everything</h2>
            <p className="text-gray-400 text-lg">Make your community unique with custom themes and settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Theme Selection */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Theme Selection</h3>
              <div className="space-y-4">
                {themes.map((theme, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg ${theme.preview}`}></div>
                      <div>
                        <h4 className="font-semibold">{theme.name}</h4>
                        <p className="text-gray-400 text-sm">Custom theme</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Preview</h3>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 mb-4">
                  <h4 className="text-white font-bold text-lg">Your Community</h4>
                  <p className="text-gray-100">This is how your community will look</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-600 rounded p-2">
                      <p className="text-sm">Sample post content</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-600 rounded p-2">
                      <p className="text-sm">Another sample post</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4">Community Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Community Title
                </label>
                <input
                  type="text"
                  placeholder="Enter title"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Community Type
                </label>
                <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Public</option>
                  <option>Private</option>
                  <option>Invite Only</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Welcome Message
                </label>
                <textarea
                  placeholder="Enter welcome message for new members"
                  rows="3"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Moderation Component
export const Moderation = () => {
  const moderationQueue = [
    { id: 1, type: 'post', content: 'Check out this awesome fanart!', user: 'ArtLover23', reported: '2 hours ago', reason: 'Spam' },
    { id: 2, type: 'comment', content: 'This is the best anime ever created!', user: 'AnimeFan99', reported: '4 hours ago', reason: 'Off-topic' },
    { id: 3, type: 'post', content: 'Looking for gaming buddies to play with', user: 'GamerGirl21', reported: '1 day ago', reason: 'Inappropriate' }
  ];

  const moderationTools = [
    { name: 'Auto-Moderation', icon: '🤖', description: 'Automatically filter spam and inappropriate content', active: true },
    { name: 'Word Filter', icon: '🚫', description: 'Block specific words or phrases', active: true },
    { name: 'Image Scanning', icon: '📸', description: 'Scan images for inappropriate content', active: false },
    { name: 'Link Protection', icon: '🔗', description: 'Prevent suspicious links from being shared', active: true }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Curate Incredible Content</h2>
            <p className="text-gray-400 text-lg">Powerful moderation tools to keep your community safe</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Moderation Queue */}
            <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Moderation Queue</h3>
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {moderationQueue.length} pending
                </div>
              </div>
              
              <div className="space-y-4">
                {moderationQueue.map((item) => (
                  <div key={item.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">{item.user.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{item.user}</h4>
                          <p className="text-gray-400 text-sm">{item.reported}</p>
                        </div>
                      </div>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                        {item.reason}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{item.content}</p>
                    
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Approve
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Remove
                      </button>
                      <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                        Warning
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Moderation Tools */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Moderation Tools</h3>
                <div className="space-y-4">
                  {moderationTools.map((tool, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{tool.icon}</span>
                        <div>
                          <h4 className="font-semibold text-sm">{tool.name}</h4>
                          <p className="text-gray-400 text-xs">{tool.description}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={tool.active} />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Bulk Approve
                  </button>
                  <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Clear Queue
                  </button>
                  <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    Export Reports
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Landing Page Component
export const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/5475810/pexels-photo-5475810.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Community Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-pink-900/50"></div>
        </div>
        
        <div className="relative z-10 pt-20 pb-32">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-3xl">✕</span>
              </div>
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Amino Community Manager
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Create, customize, and manage your own mobile social network. Build immersive communities with ease and become part of the Amino network.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-105"
              >
                Get Started Now
              </button>
              <button className="px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold text-lg hover:bg-gray-700 transition-colors border border-gray-700">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-400">Powerful tools to build and manage your community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏗️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Create Communities</h3>
              <p className="text-gray-400">Build your own social network with custom categories and themes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Customize Everything</h3>
              <p className="text-gray-400">Personalize your community with custom themes and branding</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Content Moderation</h3>
              <p className="text-gray-400">Keep your community safe with powerful moderation tools</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Analytics</h3>
              <p className="text-gray-400">Track growth and engagement with detailed analytics</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your Community?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of community leaders who trust Amino Community Manager
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-105"
          >
            Start Building Today
          </button>
        </div>
      </div>
    </div>
  );
};