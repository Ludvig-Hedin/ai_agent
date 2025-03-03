'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRouteWrapper from '@/components/auth/ProtectedRouteWrapper';

export default function ChatPage() {
  const { user, signOut } = useAuth();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([
    { role: 'system', content: 'Welcome to AI Agent! How can I help you today?' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock send message function
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || isProcessing) return;
    
    // Add user message to chat
    const userMessage = { role: 'user', content: message };
    setChatMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsProcessing(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = { 
        role: 'system', 
        content: `This is a mock response to: "${userMessage.content}". In a real implementation, this would connect to an AI backend.` 
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <ProtectedRouteWrapper>
      <div className="flex flex-col h-screen bg-black text-white">
        {/* Header */}
        <header className="border-b border-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">AI Agent Chat</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">{user?.email || 'User'}</span>
            <button 
              onClick={() => signOut()} 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </header>
        
        {/* Chat Container */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {chatMessages.map((msg, index) => (
            <div 
              key={index} 
              className={`max-w-3xl mx-auto p-4 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-blue-900/30 ml-auto' 
                  : 'bg-gray-800/50'
              }`}
            >
              <p>{msg.content}</p>
            </div>
          ))}
          {isProcessing && (
            <div className="max-w-3xl mx-auto p-4 rounded-lg bg-gray-800/50">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Input Area */}
        <div className="border-t border-gray-800 p-4">
          <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              disabled={!message.trim() || isProcessing}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-400 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </ProtectedRouteWrapper>
  );
} 