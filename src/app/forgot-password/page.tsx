'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/supabase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();
  
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await auth.resetPassword(email);
      
      if (error) {
        throw error;
      }
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset instructions');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 lg:flex-none lg:max-w-md xl:max-w-lg">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
              Reset your password
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Enter your email and we'll send you instructions to reset your password
            </p>
          </div>

          <div className="mt-10">
            {error && (
              <div className="mb-4 rounded-md bg-red-900/30 p-3 border border-red-700/50">
                <p className="text-sm text-red-400">
                  {error}
                </p>
              </div>
            )}
            
            {success ? (
              <div className="mb-4 rounded-md bg-green-900/30 p-3 border border-green-700/50">
                <p className="text-sm text-green-400">
                  Password reset instructions have been sent to your email. Please check your inbox.
                </p>
                <div className="mt-6 text-center">
                  <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300">
                    Back to sign in
                  </Link>
                </div>
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={handleResetPassword}>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 bg-gray-900 py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-gray-800 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                    placeholder="Email"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 disabled:hover:bg-blue-600"
                  >
                    {loading ? 'Sending...' : 'Send Reset Instructions'}
                  </button>
                </div>
                
                <div className="text-center mt-4">
                  <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300">
                    Back to sign in
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      
      {/* Right side - Illustration */}
      <div className="hidden lg:block relative flex-1 bg-gradient-to-b from-blue-900/20 to-purple-900/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-2xl p-8">
            {/* App interface mockup */}
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-gray-900/90 shadow-2xl ring-1 ring-gray-800/60 backdrop-blur">
              {/* Header */}
              <div className="flex items-center justify-between space-x-4 bg-gray-950/80 px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">A</div>
                  <div className="h-2 w-24 rounded-full bg-gray-700"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="h-4 w-4 rounded-full bg-gray-700"></div>
                  <div className="h-4 w-4 rounded-full bg-gray-700"></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="px-4 py-6">
                <div className="space-y-4">
                  <div className="h-4 w-3/4 rounded bg-gray-700"></div>
                  <div className="h-16 w-full rounded bg-blue-600"></div>
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded bg-gray-700"></div>
                    <div className="h-2 w-5/6 rounded bg-gray-700"></div>
                    <div className="h-2 w-4/6 rounded bg-gray-700"></div>
                  </div>
                </div>
              </div>
              
              {/* Message area */}
              <div className="px-4 py-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gray-800"></div>
                    <div className="space-y-1">
                      <div className="h-3 w-24 rounded bg-gray-700"></div>
                      <div className="h-10 w-48 rounded bg-gray-800 p-2">
                        <div className="h-2 w-40 rounded bg-gray-700"></div>
                        <div className="mt-1 h-2 w-36 rounded bg-gray-700"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom navigation */}
              <div className="mt-4 flex justify-around px-6 py-3">
                <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                <div className="h-2 w-2 rounded-full bg-gray-700"></div>
                <div className="h-2 w-2 rounded-full bg-gray-700"></div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-white">AI Assistant</h3>
              <p className="mt-2 text-sm text-gray-400">
                Your personal AI assistant with secure authentication and seamless experience<br />
                on both web and mobile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 