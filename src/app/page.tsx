'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="w-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
            <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 22L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 5V9M15 9V13M15 9H19M15 9H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="flex items-center">
          <span className="text-xl font-medium">AI Agent</span>
          <svg className="ml-2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <Link href="/login" className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium">
          Log in
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-semibold mb-14">What can I help you with?</h1>
        
        <div className="grid grid-cols-2 gap-4 max-w-md mb-12">
          <button className="flex items-center justify-center space-x-2 bg-gray-800/50 border border-gray-700 rounded-full py-3 px-5 hover:bg-gray-800 transition">
            <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 7L4.5 12L9.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.5 12H14.5C17.5376 12 20 14.4624 20 17.5V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-gray-300">Help me write</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 bg-gray-800/50 border border-gray-700 rounded-full py-3 px-5 hover:bg-gray-800 transition">
            <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-gray-300">Surprise me</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 bg-gray-800/50 border border-gray-700 rounded-full py-3 px-5 hover:bg-gray-800 transition">
            <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-gray-300">Get advice</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 bg-gray-800/50 border border-gray-700 rounded-full py-3 px-5 hover:bg-gray-800 transition">
            <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-gray-300">Code</span>
          </button>
        </div>
      </main>

      {/* Footer input area */}
      <footer className="p-4 pb-8 flex flex-col items-center">
        <div className="relative w-full max-w-3xl">
          <div className="flex items-center rounded-2xl border border-gray-700 bg-gray-800/50 p-2">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="flex-1 bg-transparent py-3 px-4 outline-none text-white placeholder-gray-500"
              onClick={() => window.location.href = '/login'}
            />
            <button className="rounded-full bg-gray-700 p-2 ml-2" onClick={() => window.location.href = '/login'}>
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mt-4 text-center max-w-xl">
          By sending messages to AI Agent, you agree to our <Link href="/terms" className="underline">terms</Link> and confirm that you have read our <Link href="/privacy" className="underline">privacy policy</Link>.
        </div>
      </footer>
    </div>
  );
}
