import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication for demo purposes
  useEffect(() => {
    // Simulate checking for existing auth state
    const savedUser = localStorage.getItem('amino-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock login - in production this would use Firebase auth
      const mockUser = {
        uid: 'user-' + Date.now(),
        email: email,
        displayName: email.split('@')[0],
        photoURL: 'https://images.pexels.com/photos/8728283/pexels-photo-8728283.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('amino-user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, displayName) => {
    try {
      // Mock registration - in production this would use Firebase auth
      const mockUser = {
        uid: 'user-' + Date.now(),
        email: email,
        displayName: displayName || email.split('@')[0],
        photoURL: 'https://images.pexels.com/photos/8728283/pexels-photo-8728283.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('amino-user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    localStorage.removeItem('amino-user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};