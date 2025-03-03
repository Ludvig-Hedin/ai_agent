'use client';

import { Message } from '@/types';
import { FiUser } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { RiRobot2Fill } from 'react-icons/ri';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`py-5 ${isUser ? 'bg-chatgpt-light' : 'bg-chatgpt-light-hover'}`}>
      <div className="max-w-3xl mx-auto flex gap-4 px-4">
        {/* Avatar */}
        <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-chatgpt-green' : 'bg-chatgpt-light-hover border border-gray-300'
        }`}>
          {isUser ? (
            <FiUser className="w-5 h-5 text-white" />
          ) : (
            <RiRobot2Fill className="w-5 h-5 text-white" />
          )}
        </div>
        
        {/* Message content */}
        <div className="flex-1">
          {isUser ? (
            <p className="whitespace-pre-wrap text-white">{message.content}</p>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => <p className="mb-3 last:mb-0" {...props} />,
                  ul: ({ node, ...props }) => <ul className="mb-3 list-disc pl-5" {...props} />,
                  ol: ({ node, ...props }) => <ol className="mb-3 list-decimal pl-5" {...props} />,
                  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                  code: ({ className, children, ...props }) => (
                    <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200" {...props}>
                      {children}
                    </code>
                  ),
                  pre: ({ node, ...props }) => (
                    <pre className="mb-3 overflow-x-auto rounded-md bg-gray-800 p-3 text-gray-200" {...props} />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 