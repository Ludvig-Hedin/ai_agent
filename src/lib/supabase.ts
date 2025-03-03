import { createClient } from '@supabase/supabase-js';

// Use environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zkwwqjbhoclrnbqgslaj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inprd3dxamJob2Nscm5icWdzbGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NzE2NTEsImV4cCI6MjA1NjM0NzY1MX0.I5v8PfzMhHHvasS5j8Mam-sXa0REQdbJga0vB32muqU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define types for user and session
export type User = {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
  };
};

export type AuthSession = {
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
};

// Authentication helper functions
export const auth = {
  // Sign up with email and password
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { user: data.user, error };
  },
  
  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { user: data.user, error };
  },
  
  // Sign out
  async signOut() {
    return await supabase.auth.signOut();
  },
  
  // Get current session
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error };
  },
  
  // Get current user
  async getUser() {
    const { data, error } = await supabase.auth.getUser();
    return { user: data.user, error };
  },
  
  // Reset password (sends password reset email)
  async resetPassword(email: string) {
    return await supabase.auth.resetPasswordForEmail(email);
  }
}; 