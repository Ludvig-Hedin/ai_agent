'use client';

import { Message } from '@/types';
import { FiUser, FiCpu } from 'react-icons/fi';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';
  const isError = message.role === 'assistant' && message.content.includes('An error occurred');

  return (
    <div className={`py-4 ${isUser ? 'bg-transparent' : 'bg-gray-800/50'} ${isError ? 'border-l-2 border-red-500' : ''}`}>
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start gap-4 px-4">
          <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
            isUser ? 'bg-blue-600' : isError ? 'bg-red-600' : 'bg-indigo-600'
          }`}>
            {isUser ? (
              <FiUser size={18} className="text-white" />
            ) : (
              <FiCpu size={18} className="text-white" />
            )}
          </div>
          
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-300 mb-1">
              {isUser ? 'You' : 'AI Agent'}
            </p>
            <div className="prose prose-invert max-w-none">
              {message.content.includes('```') ? (
                // Handle code blocks
                formatCodeBlocks(message.content)
              ) : (
                // Regular text formatting
                message.content.split('\n').map((paragraph, i) => (
                  <p key={i} className={`mb-2 ${isError ? 'text-red-400' : 'text-white'}`}>
                    {paragraph}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to format content with code blocks
function formatCodeBlocks(content: string) {
  const parts = content.split(/(```[\s\S]*?```)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      // Extract language if specified
      const firstLineEnd = part.indexOf('\n');
      const language = part.substring(3, firstLineEnd).trim();
      const code = part.substring(firstLineEnd + 1, part.length - 3).trim();
      
      return (
        <div key={index} className="my-3">
          {language && (
            <div className="bg-gray-700 px-4 py-1 text-xs text-gray-300 rounded-t-md">
              {language}
            </div>
          )}
          <pre className={`bg-gray-900 p-4 overflow-x-auto ${language ? 'rounded-b-md' : 'rounded-md'}`}>
            <code className="text-sm text-white">{code}</code>
          </pre>
        </div>
      );
    } else {
      return part.split('\n').map((paragraph, i) => (
        <p key={`${index}-${i}`} className="mb-2 text-white">
          {paragraph}
        </p>
      ));
    }
  });
} 