'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function ForgotPasswordForm() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    try {
      setLoading(true);
      const { error: resetError } = await resetPassword(email);
      
      if (resetError) {
        setError(resetError.message);
        return;
      }
      
      setSuccess(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-dark-700 p-4">
      <div className="w-full max-w-md rounded-lg border border-dark-400 bg-dark-600 p-8 shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Reset Password</h1>
          <p className="mt-2 text-gray-400">We'll send you an email with a link to reset your password</p>
        </div>
        
        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}
        
        {success ? (
          <div className="mb-6 rounded-md bg-green-500/10 p-4 text-center">
            <p className="text-green-500">
              Password reset link sent! Check your email.
            </p>
            <Link href="/login" className="mt-4 block text-green-500 hover:text-green-400">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-dark-400 bg-dark-800 p-2.5 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            
            <div className="mt-6 text-center">
              <Link href="/login" className="text-sm text-green-500 hover:text-green-400">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 