'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="sm:max-w-xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          AI Agent Assistant
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-400">
          Your intelligent AI assistant for programming and beyond
        </p>
        
        <div className="mt-10 max-w-lg mx-auto">
          <div className="rounded-lg bg-gray-900 shadow-lg overflow-hidden border border-gray-800">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-white">
                Welcome to the AI Agent
              </h2>
              <p className="mt-4 text-gray-400">
                This is a simple static demo page showing the capabilities of our AI assistant. 
                The real functionality will be available once you log in.
              </p>
              
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white">Code Generation</h3>
                  <p className="mt-2 text-gray-400">
                    Get help writing code in multiple programming languages
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white">Problem Solving</h3>
                  <p className="mt-2 text-gray-400">
                    Solve complex problems with step-by-step guidance
                  </p>
                </div>
                
                <div className="mt-10 flex justify-center space-x-4">
                  <Link 
                    href="/login"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Log In
                  </Link>
                  <Link 
                    href="/signup"
                    className="inline-flex items-center justify-center px-5 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-200 bg-gray-800 hover:bg-gray-700"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-500">
            © 2025 AI Agent Assistant. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
