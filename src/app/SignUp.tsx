import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp, signInWithOAuth } from '../services/supabase';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';
import AppPreviewMockup from '../components/AppPreviewMockup';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignUp = async (provider: 'google' | 'apple' | 'microsoft') => {
    setError(null);
    try {
      await signInWithOAuth(provider);
      // The redirect will happen automatically from Supabase
    } catch (err: any) {
      setError(err.message || `Failed to sign up with ${provider}`);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#121314] text-white">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold">Let's get started!</h1>
            <p className="text-[#A5A5A6] mt-2">Create your account to continue</p>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* OAuth Provider Buttons */}
            <button
              onClick={() => handleOAuthSignUp('google')}
              className="w-full flex items-center justify-center gap-2 bg-white text-black border border-gray-300 p-2 rounded-md hover:bg-gray-50 transition-colors mt-4"
            >
              <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#121314] text-[#A5A5A6]">
                  or
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-gray-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-gray-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  required
                />
                <PasswordStrengthIndicator password={password} />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/10 border border-gray-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors mt-6 border border-blue-700 shadow-sm"
              >
                {loading ? 'Creating account...' : 'Continue'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-[#A5A5A6]">Already have an account? </span>
              <Link to="/login" className="text-white font-bold hover:underline">Sign in</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image/Brand */}
      <div className="hidden lg:block lg:w-1/2 bg-[#121314] p-12">
        <div className="h-full flex flex-col items-center justify-center">
          <AppPreviewMockup />
        </div>
      </div>
    </div>
  );
};

export default SignUp; 