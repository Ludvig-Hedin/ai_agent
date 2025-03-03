'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/supabase';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!acceptTerms) {
      setError('You must accept the terms and conditions');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await auth.signUpWithEmail(email, password);
      
      if (error) {
        throw error;
      }
      
      router.push('/login?signup=success');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await auth.signInWithGoogle();
      
      if (error) {
        throw error;
      }
      
      // The redirect will happen automatically
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
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
              Think it. Make it.
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Create your AI Assistant account
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
            
            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="flex w-full justify-center items-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                  </g>
                </svg>
                Continue with Google
              </button>
            </div>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-500">
                  or
                </span>
              </div>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleEmailSignUp}>
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
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 bg-gray-900 py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-gray-800 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md border-0 bg-gray-900 py-3 px-4 text-white shadow-sm ring-1 ring-inset ring-gray-800 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="accept-terms"
                  name="accept-terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-600 focus:ring-offset-gray-900"
                />
                <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-300">
                  I accept the <a href="#" className="text-blue-400 hover:text-blue-500">Terms and Conditions</a>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 disabled:hover:bg-blue-600"
                >
                  {loading ? 'Creating account...' : 'Continue'}
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-500 hover:text-blue-400">
                Sign in
              </Link>
            </p>
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
                  
                  <div className="flex items-start justify-end space-x-3">
                    <div className="space-y-1 text-right">
                      <div className="h-3 w-16 ml-auto rounded bg-gray-700"></div>
                      <div className="h-14 w-56 rounded bg-blue-700/40 p-2">
                        <div className="h-2 w-48 ml-auto rounded bg-gray-100/30"></div>
                        <div className="mt-1 h-2 w-40 ml-auto rounded bg-gray-100/30"></div>
                        <div className="mt-1 h-2 w-44 ml-auto rounded bg-gray-100/30"></div>
                      </div>
                    </div>
                    <div className="h-6 w-6 flex-shrink-0 rounded-full bg-blue-600"></div>
                  </div>
                </div>
                
                {/* Input */}
                <div className="mt-6">
                  <div className="rounded-lg bg-gray-800 p-2">
                    <div className="flex items-center justify-between">
                      <div className="h-2 w-40 rounded bg-gray-700"></div>
                      <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
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