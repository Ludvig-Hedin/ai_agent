'use client';

import { useState } from 'react';
import { AIModelConfig } from '@/types';
import { FiCpu, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export interface ModelSelectorProps {
  models: AIModelConfig[];
  selectedModel: AIModelConfig;
  onSelectModel: (model: AIModelConfig) => void;
}

export default function ModelSelector({ models, selectedModel, onSelectModel }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectModel = (model: AIModelConfig) => {
    onSelectModel(model);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="mb-2">
        <div className="flex items-center">
          <FiCpu className="mr-2 h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-gray-300">Model</span>
        </div>
      </div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md bg-dark-700 p-3 text-left text-sm hover:bg-dark-600"
      >
        <div>
          <span className="block font-medium">{selectedModel.name}</span>
          <span className="block text-xs text-gray-400">{selectedModel.provider}</span>
        </div>
        {isOpen ? (
          <FiChevronUp className="h-4 w-4" />
        ) : (
          <FiChevronDown className="h-4 w-4" />
        )}
      </button>
      
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-dark-500 bg-dark-800 shadow-lg">
          {models.map((model) => (
            <li
              key={model.id}
              onClick={() => handleSelectModel(model)}
              className={`cursor-pointer p-3 text-sm hover:bg-dark-700 ${
                model.id === selectedModel.id ? 'bg-dark-700' : ''
              }`}
            >
              <div className="font-medium">{model.name}</div>
              <div className="mt-1 text-xs text-gray-400">{model.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 