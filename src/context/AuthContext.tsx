
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, name: string, password: string, isAdmin?: boolean, phone?: string, location?: string) => Promise<void>;
  updateUserLocation: (location: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data (in a real app, this would be an API call)
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // In a real app, we would check the password here
      // For this demo, any password works
      
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast({
        title: 'Login successful',
        description: `Welcome back, ${user.name}!`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  const signup = async (email: string, name: string, password: string, isAdmin = false, phone = '', location = 'Jaipur') => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      // Create new user
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        email,
        name,
        isAdmin,
        location,
        phone
      };
      
      // In a real app, we would add the user to the database here
      // For this demo, we just set the current user
      
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      toast({
        title: 'Signup successful',
        description: `Welcome, ${newUser.name}!`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Signup failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserLocation = (location: string) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, location };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    signup,
    updateUserLocation
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
