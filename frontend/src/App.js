import React, { useState } from 'react';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { useAuth } from './contexts/AuthContext';
import { Header, Dashboard, CreateCommunity, Customize, Moderation, LandingPage, ProfilePage } from './components';
import { LoginModal, RegisterModal } from './auth-components';
import { ChatInterface, ChatDashboard } from './chat-components';

// Main App Component with Authentication
function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleGetStarted = () => {
    if (user) {
      setCurrentPage('dashboard');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setCurrentPage('dashboard');
  };

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
    setCurrentPage('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">✕</span>
          </div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated and not on landing page, redirect to landing
  if (!user && currentPage !== 'landing') {
    setCurrentPage('landing');
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      case 'dashboard':
        return user ? <Dashboard /> : <LandingPage onGetStarted={handleGetStarted} />;
      case 'create':
        return user ? <CreateCommunity /> : <LandingPage onGetStarted={handleGetStarted} />;
      case 'customize':
        return user ? <Customize /> : <LandingPage onGetStarted={handleGetStarted} />;
      case 'moderate':
        return user ? <Moderation /> : <LandingPage onGetStarted={handleGetStarted} />;
      case 'chat':
        return user ? <ChatInterface /> : <LandingPage onGetStarted={handleGetStarted} />;
      case 'chat-dashboard':
        return user ? <ChatDashboard /> : <LandingPage onGetStarted={handleGetStarted} />;
      case 'profile':
        return user ? <ProfilePage /> : <LandingPage onGetStarted={handleGetStarted} />;
      default:
        return user ? <Dashboard /> : <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="App">
      {/* Header - only show if user is authenticated and not on landing page */}
      {user && currentPage !== 'landing' && (
        <Header 
          onNavigate={handleNavigation} 
          currentPage={currentPage}
        />
      )}
      
      {/* Main Content */}
      {renderPage()}

      {/* Authentication Modals */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
        onLoginSuccess={handleLoginSuccess}
      />
      
      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </div>
  );
}

// App wrapper with providers
function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;