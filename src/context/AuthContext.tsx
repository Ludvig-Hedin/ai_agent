'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/lib/supabase';

// Define the shape of our context
interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  updatePassword: async () => {},
  signInWithGoogle: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap your app with
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Check for existing session on mount
  useEffect(() => {
    // For demo purposes, check if "mockUser" exists in localStorage
    const mockUser = localStorage.getItem('mockUser');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
    
    // Also try to get the real session from Supabase if available
    const checkSession = async () => {
      try {
        const { data } = await auth.getSession();
        if (data.session?.user) {
          setUser(data.session.user);
        }
      } catch (error) {
        console.error('Error checking auth session:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, []);

  // Authentication methods
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // For demo, set a mock user in localStorage
      const mockUser = { id: '123', email, role: 'user' };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setUser(mockUser);
      
      // For real auth:
      // const { error } = await auth.signInWithEmail(email, password);
      // if (error) throw error;
      
      router.push('/chat');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };
  
  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock successful signup
      // For real auth:
      // const { error } = await auth.signUpWithEmail(email, password);
      // if (error) throw error;
      
      router.push('/login?signup=success');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };
  
  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // Clear mock user
      localStorage.removeItem('mockUser');
      
      // Real auth:
      // await auth.signOut();
      
      setUser(null);
      
      // Redirect to login page unless already there
      if (pathname !== '/login') {
        router.push('/login');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // For real auth:
      // const { error } = await auth.resetPassword(email);
      // if (error) throw error;
      
      router.push('/login?reset=requested');
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };
  
  const updatePassword = async (password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // For real auth:
      // const { error } = await auth.updatePassword(password);
      // if (error) throw error;
      
      router.push('/login?reset=success');
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };
  
  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // For real auth:
      // const { error } = await auth.signInWithGoogle();
      // if (error) throw error;
      
      // For demo, create a mock Google user
      const mockUser = { 
        id: 'google-123', 
        email: 'user@gmail.com', 
        role: 'user',
        provider: 'google'
      };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setUser(mockUser);
      
      router.push('/chat');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    signInWithGoogle
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 