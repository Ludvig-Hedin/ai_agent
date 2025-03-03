import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn, signInWithOAuth } from '../services/supabase';
import AppPreviewMockup from '../components/AppPreviewMockup';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'apple' | 'microsoft') => {
    setError(null);
    try {
      await signInWithOAuth(provider);
      // The redirect will happen automatically from Supabase
    } catch (err: any) {
      setError(err.message || `Failed to sign in with ${provider}`);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#121314] text-white">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-[#A5A5A6] mt-2">Log in to your AI Assistant account</p>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-md text-red-500">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* OAuth Provider Buttons */}
            <button
              onClick={() => handleOAuthLogin('google')}
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
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white bg-opacity-10 text-white border border-gray-700 p-2 rounded-md focus:outline-none focus:border-blue-600"
                  placeholder="Email address"
                  required
                />
              </div>

              <div className="relative mt-4">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white bg-opacity-10 text-white border border-gray-700 p-2 rounded-md focus:outline-none focus:border-blue-600"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <span className="material-icons">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              <div className="mt-2 text-right">
                <Link to="/forgot-password" className="text-white font-bold hover:underline">Forgot password?</Link>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors mt-6 border border-blue-700 shadow-sm"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Continue'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-[#A5A5A6]">Don't have an account? </span>
              <Link to="/signup" className="text-white font-bold hover:underline">Sign up</Link>
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

export default Login; 