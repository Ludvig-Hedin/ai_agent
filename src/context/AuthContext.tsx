'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { auth, supabase, User } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for active session on load
    const checkSession = async () => {
      try {
        setLoading(true);
        const { data, error } = await auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          return;
        }
        
        if (data?.session) {
          const currentUser = await auth.getUser();
          if (currentUser) {
            setUser(currentUser as User);
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: string, session: any) => {
        if (session?.user) {
          setUser(session.user as User);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await auth.signIn(email, password);
      
      if (error) {
        return { error };
      }
      
      if (data?.user) {
        setUser(data.user as User);
        router.push('/chat');
      }
      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await auth.signUp(email, password);
      
      if (error) {
        return { error };
      }
      
      if (data?.user) {
        setUser(data.user as User);
        router.push('/chat');
      }
      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        return;
      }
      
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await auth.resetPassword(email);
      return { error };
    } catch (error) {
      console.error('Reset password error:', error);
      return { error: error as Error };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 