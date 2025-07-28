import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock user data for demo
  useEffect(() => {
    const savedUser = localStorage.getItem('sportstalk_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Mock login - in production, this would call your API
      const mockUser = {
        id: 1,
        username: 'sportsexpert',
        email: email,
        debatePoints: 1250,
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        isPremium: false
      };
      
      localStorage.setItem('sportstalk_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setShowAuthModal(false);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    try {
      // Mock registration
      const mockUser = {
        id: Date.now(),
        username: username,
        email: email,
        debatePoints: 0,
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        isPremium: false
      };
      
      localStorage.setItem('sportstalk_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setShowAuthModal(false);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('sportstalk_user');
    setUser(null);
  };

  const updateUser = (updatedData) => {
    const updated = { ...user, ...updatedData };
    setUser(updated);
    localStorage.setItem('sportstalk_user', JSON.stringify(updated));
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    showAuthModal,
    setShowAuthModal,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}