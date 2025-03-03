'use client';

import { Message } from '@/types';
import { FiUser, FiCpu } from 'react-icons/fi';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`py-5 ${isUser ? 'bg-transparent' : 'bg-dark-800'}`}>
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start gap-4 px-4">
          <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
            isUser ? 'bg-indigo-500' : 'bg-green-600'
          }`}>
            {isUser ? <FiUser size={16} className="text-white" /> : <FiCpu size={16} className="text-white" />}
          </div>
          
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-300 mb-1">
              {isUser ? 'You' : 'AI Agent'}
            </p>
            <div className="prose prose-invert max-w-none">
              {message.content.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-2 text-white">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 