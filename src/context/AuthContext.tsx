import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/property';
import { users } from '../data/users';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLiveSupabase: boolean;
  signIn: (email: string, password?: string) => Promise<boolean> | boolean;
  adminSignIn: (passcodeOrPassword: string) => boolean;
  signUp: (userData: Partial<User> & { password?: string }) => Promise<void> | void;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USER_KEY = 'korutla_properties_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLiveSupabase = isSupabaseConfigured();

  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null; // Default to signed-out state
    } catch {
      return null;
    }
  });

  // Keep local storage in sync
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

  // Listen to Supabase Auth state if configured
  useEffect(() => {
    if (!isLiveSupabase) return;

    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        const u = data.user;
        setUser((prev) => ({
          id: u.id,
          name: u.user_metadata?.name || u.email?.split('@')[0] || 'Member',
          email: u.email || '',
          phone: u.user_metadata?.phone || '+91 98490 50532',
          photo: u.user_metadata?.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
          role: u.user_metadata?.role || 'buyer',
          favorites: prev?.favorites || [],
          createdAt: u.created_at || new Date().toISOString(),
        }));
      }
    });
  }, [isLiveSupabase]);

  const signIn = async (email: string, password?: string): Promise<boolean> => {
    if (isLiveSupabase && password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data?.user) {
        const u = data.user;
        setUser({
          id: u.id,
          name: u.user_metadata?.name || email.split('@')[0],
          email: u.email || email,
          phone: u.user_metadata?.phone || '+91 98490 50532',
          photo: u.user_metadata?.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
          role: u.user_metadata?.role || 'buyer',
          favorites: [],
          createdAt: u.created_at || new Date().toISOString(),
        });
        return true;
      }
    }

    // Local / Demo Account fallback
    const existing = users.find((u: User) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setUser(existing);
    } else {
      const demoUser: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email,
        phone: '+91 98490 50532',
        photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
        role: email.includes('admin') ? 'admin' : 'buyer',
        favorites: ['prop-1', 'prop-3'],
        createdAt: new Date().toISOString(),
      };
      setUser(demoUser);
    }
    return true;
  };

  const adminSignIn = (passcodeOrPassword: string): boolean => {
    const validCodes = ['admin', 'admin123', 'admin505326', '505326', 'korutlaadmin'];
    const cleaned = passcodeOrPassword.trim().toLowerCase();

    if (validCodes.includes(cleaned)) {
      const adminUser: User = users.find((u) => u.role === 'admin') || {
        id: 'admin-1',
        name: 'Admin Controller',
        email: 'admin@korutlaproperties.com',
        phone: '+91 94401 50532',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
        role: 'admin',
        favorites: [],
        createdAt: '2024-01-01T00:00:00Z',
      };
      setUser(adminUser);
      return true;
    }
    return false;
  };

  const signUp = async (userData: Partial<User> & { password?: string }) => {
    if (isLiveSupabase && userData.email && userData.password) {
      await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone,
            role: userData.role || 'buyer',
          },
        },
      });
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || 'New Member',
      email: userData.email || 'user@korutlaproperties.com',
      phone: userData.phone || '+91 98490 50532',
      photo: userData.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
      role: userData.role || 'buyer',
      favorites: [],
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
  };

  const signOut = () => {
    if (isLiveSupabase) {
      supabase.auth.signOut();
    }
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);

    if (isLiveSupabase) {
      supabase.from('profiles').update({
        name: updated.name,
        phone: updated.phone,
      }).eq('id', user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isLiveSupabase,
        signIn,
        adminSignIn,
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
