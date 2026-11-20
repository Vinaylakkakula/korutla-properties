import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/property';
import { users } from '../data/users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password?: string) => boolean;
  signUp: (userData: Partial<User>) => void;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USER_KEY = 'korutla_properties_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : users[0]; // Default logged-in mock user for seamless demonstration
    } catch {
      return users[0];
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_KEY);
      }
    } catch (e) {
      console.error('Failed to sync user auth state', e);
    }
  }, [user]);

  const signIn = (email: string): boolean => {
    const existing = users.find((u: User) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setUser(existing);
    } else {
      // Mock log in as demo user
      const demoUser: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '+91 98765 00000',
        photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
        role: 'buyer',
        favorites: ['prop-1', 'prop-3'],
        createdAt: new Date().toISOString(),
      };
      setUser(demoUser);
    }
    return true;
  };

  const signUp = (userData: Partial<User>) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || 'New Member',
      email: userData.email || 'user@korutlaproperties.com',
      phone: userData.phone || '+91 99999 88888',
      photo: userData.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
      role: userData.role || 'buyer',
      favorites: [],
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
  };

  const signOut = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

