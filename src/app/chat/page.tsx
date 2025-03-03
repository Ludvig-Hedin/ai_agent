'use client';

import React from 'react';
import ChatContainer from '@/components/ChatContainer';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="border-b border-gray-200 dark:border-gray-700 p-4">
        <h1 className="text-2xl font-bold">AI Agent Chat</h1>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <ChatContainer />
      </main>
    </div>
  );
} 