'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
}

export default function ChatInput({ onSendMessage, isDisabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isDisabled) {
      onSendMessage(message);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          rows={1}
          disabled={isDisabled}
          className="min-h-[44px] w-full resize-none rounded-lg border border-chatgpt-border bg-chatgpt-light px-4 py-3 pr-12 text-white shadow-sm focus:outline-none focus:ring-1 focus:ring-chatgpt-green disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isDisabled || !message.trim()}
          className="absolute right-3 rounded-md p-1 text-gray-400 hover:bg-chatgpt-light-hover hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiSend className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-2 text-xs text-center text-gray-400">
        The AI agent will browse the web and perform tasks based on your instructions.
      </p>
    </form>
  );
} 