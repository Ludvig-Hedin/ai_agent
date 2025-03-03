'use client';

import { useState } from 'react';
import { FiActivity, FiChevronDown, FiChevronUp, FiCpu } from 'react-icons/fi';
import { AgentAction } from '@/types';

interface AgentStateProps {
  isThinking: boolean;
  actions: AgentAction[];
  currentTask: string | null;
}

export default function AgentState({ isThinking, actions, currentTask }: AgentStateProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  if (actions.length === 0 && !isThinking && !currentTask) {
    return null;
  }
  
  return (
    <div className="max-w-3xl mx-auto my-4 rounded-lg border border-chatgpt-border bg-chatgpt-light-hover shadow-md overflow-hidden">
      <div 
        className="flex cursor-pointer items-center justify-between border-b border-chatgpt-border px-4 py-3"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-2">
          <FiCpu className="h-5 w-5 text-chatgpt-green" />
          <h3 className="text-sm font-medium text-white">
            Agent Thinking {isThinking && <span className="animate-pulse ml-2">Processing...</span>}
          </h3>
        </div>
        {isExpanded ? (
          <FiChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <FiChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </div>
      
      {isExpanded && (
        <div className="p-4">
          {currentTask && (
            <div className="mb-4">
              <h4 className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase text-gray-400">
                <FiActivity className="h-4 w-4" /> Current Task
              </h4>
              <p className="text-sm text-gray-300">{currentTask}</p>
            </div>
          )}
          
          {actions.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase text-gray-400">Actions</h4>
              <div className="space-y-3">
                {actions.map((action, index) => (
                  <div key={index} className="rounded-md border border-chatgpt-border bg-chatgpt-light p-3">
                    <h5 className="mb-1 text-sm font-medium text-white">{action.action}</h5>
                    {action.thought && (
                      <div className="mt-2 text-xs text-gray-300">
                        <p className="font-medium text-gray-400">Thought Process:</p>
                        <p className="mt-1 whitespace-pre-wrap">{action.thought}</p>
                      </div>
                    )}
                    <div className="mt-1 text-right text-xs text-gray-500">
                      {new Date(action.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 