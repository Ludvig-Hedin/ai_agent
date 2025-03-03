'use client';

import { FiEdit3, FiGift, FiBookOpen, FiCode, FiMoreHorizontal, FiGlobe, FiSearch } from 'react-icons/fi';

interface SuggestionButtonProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClick: () => void;
}

function SuggestionButton({ icon, title, description, onClick }: SuggestionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-4 rounded-md border border-gray-700 bg-gray-800/50 px-4 py-3 text-left transition-all hover:border-gray-600 hover:bg-gray-800 hover:shadow-md"
    >
      <span className="mt-1 flex-shrink-0 text-blue-500">{icon}</span>
      <div>
        <span className="block font-medium text-white">{title}</span>
        {description && <span className="mt-1 block text-sm text-gray-400">{description}</span>}
      </div>
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
    <div className="flex flex-col items-center px-4 py-16">
      <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
        <FiSearch size={24} className="text-white" />
      </div>
      <h1 className="mb-4 text-3xl font-bold text-white">
        AI Assistant
      </h1>
      <p className="mb-12 max-w-lg text-center text-gray-400">
        Ask me anything, request help with tasks, or let me assist you with web browsing and more.
      </p>

      <div className="mb-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        <SuggestionButton
          icon={<FiEdit3 size={20} />}
          title="Help me write"
          description="Draft emails, essays, or other texts"
          onClick={() => handleSuggestion("Help me write a professional email to a client about a project delay")}
        />
        <SuggestionButton
          icon={<FiGlobe size={20} />}
          title="Browse the web"
          description="Navigate websites, read content, and more"
          onClick={() => handleSuggestion("Go to example.com and read the homepage")}
        />
        <SuggestionButton
          icon={<FiBookOpen size={20} />}
          title="Get advice"
          description="Productivity tips, recommendations, and guidance"
          onClick={() => handleSuggestion("What are some effective strategies for managing my time better?")}
        />
        <SuggestionButton
          icon={<FiCode size={20} />}
          title="Write code"
          description="Generate code, explain concepts, debug issues"
          onClick={() => handleSuggestion("Write a simple React component that displays a counter with increment and decrement buttons")}
        />
      </div>

      <div>
        <button 
          className="flex items-center gap-2 rounded-md border border-gray-700 bg-gray-800/30 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-gray-600 hover:bg-gray-800"
          onClick={() => handleSuggestion("What can you do?")}
        >
          <FiMoreHorizontal size={16} />
          <span>See all capabilities</span>
        </button>
      </div>
    </div>
  );
} 