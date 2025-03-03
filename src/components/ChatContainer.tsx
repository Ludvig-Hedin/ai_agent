'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useChatStore } from '@/store/chatStore';
import ChatInput from './ChatInput';
import MessageItem from './MessageItem';
import AgentState from './AgentState';
import ModelSelector from './ModelSelector';
import Connections from './Connections';
import { FiMessageSquare, FiMenu, FiPlus, FiLogOut } from 'react-icons/fi';

export default function ChatContainer() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const router = useRouter();
  
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

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem('isAuthenticated');
    // Redirect to login page
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-dark-800 text-white">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-dark-900 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b border-dark-700 p-4">
          <div className="flex items-center gap-2">
            <FiMessageSquare className="h-6 w-6 text-green-500" />
            <h1 className="text-xl font-bold">AI Agent</h1>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <FiMenu className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <button 
            onClick={() => clearMessages()}
            className="mb-4 flex w-full items-center gap-2 rounded-md border border-dark-500 bg-dark-700 px-3 py-2 text-sm font-medium hover:bg-dark-600"
          >
            <FiPlus className="h-4 w-4" />
            New Chat
          </button>
          
          <div className="mt-6 space-y-4">
            <ModelSelector 
              models={models}
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel}
            />
            
            <Connections connectionStatus={connectionStatus} />
          </div>
        </div>
        
        <div className="border-t border-dark-700 p-4">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-md bg-dark-700 px-3 py-2 text-sm font-medium text-red-400 hover:bg-dark-600"
          >
            <FiLogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dark-700 p-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <FiMenu className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-medium">Chat with {selectedModel.name}</h2>
          <div className="h-5 w-5" /> {/* Empty div for spacing */}
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mx-auto max-w-3xl">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-gray-400">
                <div className="mb-4 rounded-full bg-dark-700 p-3">
                  <FiMessageSquare className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Welcome to AI Agent</h3>
                <p className="max-w-md">
                  Ask the AI to perform browser tasks like "Go to GitHub and search for React repositories"
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <MessageItem 
                    key={message.id} 
                    message={message} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Agent state display */}
        {agentState.isThinking && (
          <div className="border-t border-dark-700">
            <AgentState
              isThinking={agentState.isThinking}
              actions={agentState.actions}
              currentTask={agentState.currentTask}
            />
          </div>
        )}
        
        {/* Input */}
        <div className="border-t border-dark-700 p-4">
          <div className="mx-auto max-w-3xl">
            <ChatInput
              onSendMessage={handleSendMessage}
              isDisabled={isLoading}
            />
            <p className="mt-2 text-center text-xs text-gray-500">
              AI Agent can browse the web and perform tasks for you.
              <br />
              Try asking it to navigate to websites, click buttons, or fill out forms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 