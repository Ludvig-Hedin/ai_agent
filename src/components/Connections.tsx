'use client';

import { useState } from 'react';
import { FiGlobe, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export interface ConnectionsProps {
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
}

export default function Connections({ connectionStatus }: ConnectionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="mb-2">
        <div className="flex items-center">
          <FiGlobe className="mr-2 h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-gray-300">External Connections</span>
        </div>
      </div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md bg-dark-700 p-3 text-left text-sm hover:bg-dark-600"
      >
        <div className="flex items-center">
          <span className="block font-medium">Browser Status</span>
          <span className={`ml-2 h-2 w-2 rounded-full ${
            connectionStatus === 'connected' ? 'bg-green-500' : 
            connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
          }`}></span>
        </div>
        {isOpen ? (
          <FiChevronUp className="h-4 w-4" />
        ) : (
          <FiChevronDown className="h-4 w-4" />
        )}
      </button>
      
      {isOpen && (
        <div className="mt-1 rounded-md border border-dark-500 bg-dark-800 p-3">
          <div className="text-sm">
            <div className="flex items-center justify-between">
              <span>Browser Automation</span>
              <span className={`px-2 py-0.5 text-xs rounded ${
                connectionStatus === 'connected' ? 'bg-green-900/30 text-green-400' : 
                connectionStatus === 'connecting' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-red-900/30 text-red-400'
              }`}>
                {connectionStatus === 'connected' ? 'Connected' : 
                 connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              {connectionStatus === 'connected' 
                ? 'Browser automation is active and ready for commands.' 
                : 'The AI will automatically connect to a browser when needed.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 