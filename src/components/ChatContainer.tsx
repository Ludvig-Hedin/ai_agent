'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useChatStore } from '@/store/chatStore';
import ChatInput from './ChatInput';
import MessageItem from './MessageItem';
import AgentState from './AgentState';
import ModelSelector from './ModelSelector';
import Connections from './Connections';
import ChatWelcome from './ChatWelcome';
import { FiEdit, FiChevronDown, FiLogIn } from 'react-icons/fi';

export default function ChatContainer() {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get chat state from the store
  const { 
    messages, 
    selectedModel, 
    models, 
    agentState, 
    isLoading,
    addMessage, 
    addAgentAction, 
    setSelectedModel,
    setIsThinking,
    setIsLoading,
    clearMessages
  } = useChatStore();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message to the state
    addMessage({
      role: 'user',
      content,
    });
    
    // Set loading state
    setIsLoading(true);
    setIsThinking(true);
    
    try {
      // Call API to get response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            role: 'user',
            content,
          },
          selectedModel,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from API');
      }
      
      const data = await response.json();
      
      // Add assistant message to the state
      if (data.message) {
        addMessage(data.message);
      }
      
      // Add agent actions to the state
      if (data.agentActions && Array.isArray(data.agentActions)) {
        data.agentActions.forEach((action: any) => {
          addAgentAction({
            type: action.type,
            description: action.description,
            details: action.details
          });
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({
        role: 'system',
        content: 'An error occurred while processing your request. Please try again.',
      });
    } finally {
      // Reset loading state
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="border-b border-dark-700 px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <FiEdit className="h-5 w-5 text-gray-400" />
            <div className="relative">
              <button className="flex items-center gap-2 text-gray-300 hover:text-white">
                <span>AI Agent</span>
                <FiChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
          <button 
            onClick={handleLoginRedirect}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200"
          >
            <span className="flex items-center gap-2">
              <FiLogIn className="h-4 w-4" />
              <span>Sign in</span>
            </span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-3xl">
          {messages.length === 0 ? (
            <ChatWelcome onSuggestionClick={handleSendMessage} />
          ) : (
            <div className="space-y-6 px-4 py-8">
              {messages.map((message, index) => (
                <MessageItem 
                  key={index} 
                  message={message} 
                />
              ))}
              {agentState.isThinking && (
                <AgentState
                  isThinking={agentState.isThinking}
                  actions={agentState.actions}
                  currentTask={agentState.currentTask || ''}
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input */}
      <div className="border-t border-dark-700 bg-black px-4 py-4">
        <div className="mx-auto max-w-3xl">
          <ChatInput
            onSendMessage={handleSendMessage}
            isDisabled={isLoading}
          />
          <p className="mt-2 text-center text-xs text-gray-500">
            By sending messages to AI Agent you agree to our terms and confirm you have read our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
} 