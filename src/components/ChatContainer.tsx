'use client';

import { useRef, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useChatStore } from '@/store/chatStore';
import ChatInput from './ChatInput';
import MessageItem from './MessageItem';
import AgentState from './AgentState';
import ModelSelector from './ModelSelector';
import Connections from './Connections';
import { Connection } from '@/types';
import { apiService } from '@/services/api';
import { FiMenu, FiPlus, FiSettings } from 'react-icons/fi';

export default function ChatContainer() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: uuidv4(),
      name: 'Google Docs',
      type: 'google-docs',
      isConnected: false,
    },
    {
      id: uuidv4(),
      name: 'GitHub',
      type: 'github',
      isConnected: false,
    },
  ]);
  
  const {
    messages,
    selectedModel,
    models,
    agentState,
    isLoading,
    error,
    addMessage,
    addAgentAction,
    setSelectedModel,
    setIsThinking,
    setIsLoading,
    setError,
    clearMessages,
  } = useChatStore();
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (content: string) => {
    if (isLoading) return;
    
    // Add user message to chat
    addMessage({ role: 'user', content });
    
    try {
      setIsLoading(true);
      setIsThinking(true);
      
      // Send to API
      const response = await apiService.sendMessage({
        message: content,
        modelConfig: selectedModel,
      });
      
      // Add assistant response
      addMessage({ role: 'assistant', content: response.response });
      
      // Add agent actions if available
      if (response.actions && response.actions.length > 0) {
        response.actions.forEach((action) => {
          addAgentAction({
            action: action.action,
            thought: action.thought,
          });
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };
  
  const startNewChat = () => {
    clearMessages();
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-chatgpt-light text-white">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden flex flex-col bg-chatgpt-sidebar`}>
        <div className="flex items-center justify-between p-3 border-b border-gray-700">
          <h1 className="text-lg font-semibold">AI Agent</h1>
        </div>
        
        <button 
          onClick={startNewChat}
          className="flex items-center gap-2 m-3 p-3 border border-chatgpt-border rounded-md hover:bg-chatgpt-light-hover transition-colors"
        >
          <FiPlus /> New Chat
        </button>
        
        <div className="p-3 flex-1 overflow-y-auto">
          {/* Past chats would go here */}
        </div>
        
        <div className="p-3 border-t border-gray-700">
          <ModelSelector
            models={models}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            disabled={isLoading}
          />
          
          <div className="mt-3">
            <Connections
              connections={connections}
              onConnectionUpdate={setConnections}
            />
          </div>
        </div>
      </div>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-3 border-b border-chatgpt-border">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-chatgpt-light-hover transition-colors mr-2"
          >
            <FiMenu />
          </button>
          <h2 className="flex-1 text-center">{selectedModel.name} Agent</h2>
          <button className="p-2 rounded-md hover:bg-chatgpt-light-hover transition-colors">
            <FiSettings />
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="max-w-md text-center">
                <h2 className="mb-2 text-xl font-bold">
                  AI Agent Chat
                </h2>
                <p className="text-gray-300">
                  Send a prompt to the AI agent. It can browse the web, interact with applications, and perform tasks for you.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {messages.map((message) => (
                  <MessageItem key={message.id} message={message} />
                ))}
              </div>
              <AgentState
                isThinking={agentState.isThinking}
                actions={agentState.actions}
                currentTask={agentState.currentTask}
              />
              {error && (
                <div className="mt-4 rounded-md bg-red-900/50 p-4 text-sm text-red-200">
                  {error}
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="p-3 border-t border-chatgpt-border">
          <ChatInput onSendMessage={handleSendMessage} isDisabled={isLoading} />
        </div>
      </div>
    </div>
  );
} 