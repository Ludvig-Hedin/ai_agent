'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginScreen() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // For demonstration purposes using a simple password
    // In production, you'd want to use a proper authentication system
    if (password === 'ai-agent') {
      // Set authentication in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      // Redirect to chat page
      router.push('/chat');
    } else {
      setError('Invalid password. Try "ai-agent"');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-dark-700">
      <div className="w-full max-w-md rounded-lg border border-dark-400 bg-dark-600 p-8 shadow-xl">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-2 h-16 w-16 rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-1">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-dark-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 18h.01"/>
                <path d="M8 6h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
                <path d="m9 10 2 2 4-4"/>
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">AI Agent Login</h1>
          <p className="mt-2 text-center text-gray-400">Enter your password to access the AI browser automation interface</p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-dark-400 bg-dark-800 p-2.5 text-white shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Hint: Try using "ai-agent" as the password</p>
          <p className="mt-2">This is a demo application with browser automation capabilities.</p>
        </div>
      </div>
    </div>
  );
} 