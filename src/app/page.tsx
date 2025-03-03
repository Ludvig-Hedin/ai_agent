'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Left side - Content */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 lg:flex-none lg:max-w-md xl:max-w-lg">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
              Think it. Make it.
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Your intelligent AI assistant for programming and beyond
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white">Code Generation</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Get help writing code in multiple programming languages
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white">Problem Solving</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Solve complex problems with step-by-step guidance
                </p>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col space-y-3">
              <Link 
                href="/login"
                className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Log In
              </Link>
              <Link 
                href="/signup"
                className="flex w-full justify-center rounded-md border border-gray-800 bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800"
              >
                Sign Up
              </Link>
            </div>
            
            <p className="mt-8 text-center text-sm text-gray-500">
              © 2025 AI Agent Assistant. All rights reserved.
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
