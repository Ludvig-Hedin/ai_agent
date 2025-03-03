'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="border-b border-dark-700 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="text-3xl font-bold">AI Agent</div>
          <div className="hidden space-x-6 md:flex">
            <button
              onClick={() => router.push('/login')}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200"
            >
              Sign in
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Link 
            href="/" 
            className="mb-8 flex items-center gap-2 text-sm text-gray-400 hover:text-white"
          >
            <FiArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          
          <h1 className="mb-8 text-4xl font-bold">About AI Agent</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-6">
              AI Agent is a powerful conversational AI designed to assist with a wide range of tasks through natural language interaction.
            </p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-4">Capabilities</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-dark-600 bg-dark-800 p-6">
                <h3 className="mb-3 text-xl font-medium">Conversation</h3>
                <p className="text-gray-300">
                  Engage in natural, flowing conversations with context retention, follow-up questions, and clarifications.
                </p>
              </div>
              
              <div className="rounded-lg border border-dark-600 bg-dark-800 p-6">
                <h3 className="mb-3 text-xl font-medium">Content Creation</h3>
                <p className="text-gray-300">
                  Get help writing emails, articles, stories, poems, code, and more with customizable tone and style.
                </p>
              </div>
              
              <div className="rounded-lg border border-dark-600 bg-dark-800 p-6">
                <h3 className="mb-3 text-xl font-medium">Problem Solving</h3>
                <p className="text-gray-300">
                  Break down complex problems, analyze situations, and provide step-by-step guidance.
                </p>
              </div>
              
              <div className="rounded-lg border border-dark-600 bg-dark-800 p-6">
                <h3 className="mb-3 text-xl font-medium">Research Assistant</h3>
                <p className="text-gray-300">
                  Synthesize information, summarize content, and help organize knowledge on various topics.
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link 
                href="/chat" 
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-medium text-black hover:bg-gray-200"
              >
                Try AI Agent now <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-dark-700 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} AI Agent. All rights reserved.</p>
            <p className="mt-2">
              AI Agent is designed to be helpful, harmless, and honest.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 