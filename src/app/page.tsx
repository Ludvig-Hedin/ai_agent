'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">AI Agent Assistant</h1>
        <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Your intelligent AI assistant for programming and beyond
        </p>
      </header>
      
      <main className="mb-12 flex flex-col items-center">
        <div className="mb-8 w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the AI Agent</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This is a simple static demo page showing the capabilities of our AI assistant.
            The real functionality will be available once you log in.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Code Generation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get help writing code in multiple programming languages
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Problem Solving</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Solve complex problems with step-by-step guidance
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <a
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Sign Up
          </a>
        </div>
      </main>
      
      <footer className="text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} AI Agent Assistant. All rights reserved.
      </footer>
    </div>
  );
}
