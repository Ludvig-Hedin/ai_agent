'use client';

import { FiEdit3, FiGift, FiBookOpen, FiCode, FiMoreHorizontal } from 'react-icons/fi';

interface SuggestionButtonProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

function SuggestionButton({ icon, title, onClick }: SuggestionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-full border border-dark-400 bg-transparent px-4 py-3 text-sm text-white transition-colors hover:bg-dark-600"
    >
      <span className="text-primary-400">{icon}</span>
      <span>{title}</span>
    </button>
  );
}

interface ChatWelcomeProps {
  onSuggestionClick: (text: string) => void;
}

export default function ChatWelcome({ onSuggestionClick }: ChatWelcomeProps) {
  const handleSuggestion = (suggestion: string) => {
    onSuggestionClick(suggestion);
  };

  return (
    <div className="flex flex-col items-center px-4 py-20">
      <h1 className="mb-16 text-4xl font-medium text-white">
        What can I help with?
      </h1>

      <div className="mb-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        <SuggestionButton
          icon={<FiEdit3 size={20} />}
          title="Help me write"
          onClick={() => handleSuggestion("Help me write a professional email to a client about a project delay")}
        />
        <SuggestionButton
          icon={<FiGift size={20} />}
          title="Surprise me"
          onClick={() => handleSuggestion("Tell me something interesting about artificial intelligence that most people don't know")}
        />
        <SuggestionButton
          icon={<FiBookOpen size={20} />}
          title="Get advice"
          onClick={() => handleSuggestion("What are some effective strategies for managing my time better?")}
        />
        <SuggestionButton
          icon={<FiCode size={20} />}
          title="Code"
          onClick={() => handleSuggestion("Write a simple React component that displays a counter with increment and decrement buttons")}
        />
      </div>

      <div>
        <button 
          className="flex items-center gap-2 rounded-full border border-dark-400 bg-transparent px-4 py-2 text-sm text-white transition-colors hover:bg-dark-600"
          onClick={() => handleSuggestion("What can you do?")}
        >
          <FiMoreHorizontal size={16} />
          <span>More</span>
        </button>
      </div>
    </div>
  );
} 