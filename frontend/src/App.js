import React, { useState } from 'react';
import './App.css';
import { Header, Dashboard, CreateCommunity, Customize, Moderation, LandingPage } from './components';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user] = useState({
    name: 'Community Manager',
    avatar: 'https://images.pexels.com/photos/8728283/pexels-photo-8728283.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  });

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleGetStarted = () => {
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      case 'dashboard':
        return <Dashboard />;
      case 'create':
        return <CreateCommunity />;
      case 'customize':
        return <Customize />;
      case 'moderate':
        return <Moderation />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      {currentPage !== 'landing' && (
        <Header 
          user={user} 
          onNavigate={handleNavigation} 
          currentPage={currentPage}
        />
      )}
      {renderPage()}
    </div>
  );
}

export default App;