'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
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
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="mt-8 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Introducing AI Agent
        </h1>
        
        <div className="mt-16 flex flex-col gap-4 sm:flex-row">
          <Link 
            href="/chat" 
            className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-medium text-black hover:bg-gray-200"
          >
            Try AI Agent
          </Link>
          
          <Link 
            href="/login" 
            className="flex items-center justify-center gap-2 rounded-full border border-gray-600 px-6 py-3 text-base font-medium text-white hover:bg-dark-700"
          >
            Sign in to continue
          </Link>
        </div>
        
        <Link 
          href="/about" 
          className="mt-6 flex items-center justify-center gap-1 text-base text-gray-400 hover:text-white"
        >
          Learn about AI Agent
        </Link>
        
        <div className="mt-32 max-w-2xl">
          <p className="text-xl text-gray-300">
            We've built an AI agent which interacts in a conversational way. 
            The dialogue format makes it possible for the agent to 
            answer follow-up questions, admit its mistakes, challenge 
            incorrect premises, and reject inappropriate requests.
          </p>
        </div>
      </main>
    </div>
  );
}
