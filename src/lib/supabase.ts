import { createClient } from '@supabase/supabase-js';

// Types for auth-related entities
export type User = any; // Replace with proper type when available
export type AuthSession = any; // Replace with proper type when available

// Check if we are in a browser environment
const isBrowser = typeof window !== 'undefined';

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create the Supabase client
export const supabase = isBrowser 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : { 
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
        signInWithOAuth: () => Promise.resolve({ data: {}, error: null }),
        signUp: () => Promise.resolve({ data: { user: null, session: null }, error: null }),
        signOut: () => Promise.resolve({ error: null }),
        resetPasswordForEmail: () => Promise.resolve({ error: null }),
        updateUser: () => Promise.resolve({ data: { user: null }, error: null }),
        exchangeCodeForSession: () => Promise.resolve({ data: { session: null }, error: null }),
      }
    } as any;

// Authentication helper functions
export const auth = {
  signInWithEmail: async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  },
  
  signUpWithEmail: async (email: string, password: string) => {
    return supabase.auth.signUp({ email, password });
  },
  
  signOut: async () => {
    return supabase.auth.signOut();
  },
  
  resetPassword: async (email: string) => {
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: isBrowser ? `${window.location.origin}/auth/reset-password` : '',
    });
  },
  
  updatePassword: async (password: string) => {
    return supabase.auth.updateUser({
      password: password
    });
  },
  
  signInWithGoogle: async () => {
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: isBrowser ? `${window.location.origin}/auth/callback` : '',
      },
    });
  },
  
  getSession: async () => {
    return supabase.auth.getSession();
  },
  
  getUser: async () => {
    return supabase.auth.getUser();
  },
}; 