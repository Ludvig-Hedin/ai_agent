'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend, FiPaperclip, FiSearch, FiMessageCircle } from 'react-icons/fi';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
}

export default function ChatInput({ onSendMessage, isDisabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className="overflow-hidden rounded-2xl border border-dark-400 bg-dark-800 shadow-lg">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question or give instructions..."
            className="w-full resize-none bg-transparent px-4 py-4 pr-14 text-white focus:outline-none"
            rows={1}
            disabled={isDisabled}
          />
          
          <div className="flex items-center justify-between border-t border-dark-600 px-3 py-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded p-2 text-gray-400 hover:bg-dark-700 hover:text-white"
                aria-label="Attach file"
              >
                <FiPaperclip size={16} />
              </button>
              <button
                type="button"
                className="rounded p-2 text-gray-400 hover:bg-dark-700 hover:text-white"
                aria-label="Search"
              >
                <FiSearch size={16} />
              </button>
              <button
                type="button"
                className="rounded p-2 text-gray-400 hover:bg-dark-700 hover:text-white"
                aria-label="Suggestions"
              >
                <FiMessageCircle size={16} />
              </button>
            </div>
            
            <button
              type="submit"
              className={`flex h-8 w-8 items-center justify-center rounded-md ${
                message.trim() && !isDisabled
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-dark-600 text-gray-400'
              }`}
              disabled={!message.trim() || isDisabled}
              aria-label="Send message"
            >
              <FiSend size={16} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 