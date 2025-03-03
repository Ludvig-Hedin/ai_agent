'use client';

import { useState } from 'react';
import { AgentAction } from '@/types';
import { FiCpu, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface AgentStateProps {
  isThinking?: boolean;
  currentTask?: string;
  actions?: AgentAction[];
}

export default function AgentState({ 
  isThinking = false, 
  currentTask = '', 
  actions = [] 
}: AgentStateProps) {
  const [showActions, setShowActions] = useState(false);

  if (!isThinking) return null;

  return (
    <div className="py-5 bg-dark-800">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start gap-4 px-4">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-600">
            <FiCpu size={16} className="text-white" />
          </div>
          
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-300 mb-1">
              AI Agent
            </p>
            
            <div className="flex items-center gap-2 text-white mb-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
              <span className="font-medium">Thinking...</span>
            </div>
            
            {currentTask && (
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-medium">Current task:</span> {currentTask}
              </p>
            )}
            
            {actions.length > 0 && (
              <div className="mt-3 rounded-md bg-dark-700 p-1">
                <button
                  onClick={() => setShowActions(!showActions)}
                  className="flex w-full items-center justify-between rounded px-3 py-2 text-sm font-medium text-gray-300 hover:bg-dark-600"
                >
                  <span>Actions taken ({actions.length})</span>
                  {showActions ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                </button>
                
                {showActions && (
                  <div className="mt-1 px-3 pb-3">
                    <ul className="space-y-2 text-sm text-gray-300">
                      {actions.map((action, index) => (
                        <li key={index} className="rounded bg-dark-600 p-2">
                          <div className="font-medium text-white">{action.type}</div>
                          <div className="text-xs text-gray-400">{action.description}</div>
                          {action.details && (
                            <div className="mt-1 rounded bg-dark-800 p-2 text-xs font-mono">
                              {action.details}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 