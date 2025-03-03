import { createClient } from '@supabase/supabase-js';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Mock supabase client for server-side rendering and static builds
const mockClient = {
  auth: {
    signUp: async () => ({ data: null, error: null }),
    signInWithPassword: async () => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    resetPasswordForEmail: async () => ({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } }, error: null })
  }
};

// Create a real or mock client based on environment
const createSupabaseClient = () => {
  if (!isBrowser) {
    return mockClient;
  }

  // Only create real client in browser environment
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';
  
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.error('Error creating Supabase client:', e);
    return mockClient;
  }
};

export const supabase = createSupabaseClient();

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

// Authentication helper functions that work with both real and mock clients
export const auth = {
  // Sign up with email and password
  async signUp(email: string, password: string) {
    return await supabase.auth.signUp({ email, password });
  },
  
  // Sign in with email and password
  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  
  // Sign out
  async signOut() {
    return await supabase.auth.signOut();
  },
  
  // Get current session
  async getSession() {
    return await supabase.auth.getSession();
  },
  
  // Get current user
  async getUser() {
    const { data } = await supabase.auth.getUser();
    return data?.user;
  },
  
  // Reset password (sends password reset email)
  async resetPassword(email: string) {
    return await supabase.auth.resetPasswordForEmail(email);
  }
}; 