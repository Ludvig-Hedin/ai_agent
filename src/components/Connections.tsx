'use client';

import { useState } from 'react';
import { FiLink, FiLink2, FiLock, FiCheck, FiX } from 'react-icons/fi';
import { Connection } from '@/types';
import { apiService } from '@/services/api';

interface ConnectionsProps {
  connections: Connection[];
  onConnectionUpdate: (connections: Connection[]) => void;
}

export default function Connections({ connections, onConnectionUpdate }: ConnectionsProps) {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  
  const handleConnect = async (connection: Connection) => {
    try {
      setIsConnecting(connection.id);
      const success = await apiService.connectToService(connection.type);
      
      if (success) {
        const updatedConnections = connections.map((c) => 
          c.id === connection.id ? { ...c, isConnected: true } : c
        );
        onConnectionUpdate(updatedConnections);
      }
    } catch (error) {
      console.error('Error connecting to service:', error);
    } finally {
      setIsConnecting(null);
    }
  };
  
  return (
    <div className="mt-4">
      <h3 className="mb-2 text-xs font-medium text-gray-400">External Connections</h3>
      <div className="rounded-lg border border-chatgpt-border bg-chatgpt-light overflow-hidden">
        {connections.map((connection) => (
          <div key={connection.id} className="flex items-center justify-between p-3 border-b border-chatgpt-border last:border-b-0">
            <div className="flex items-center gap-3">
              {connection.type === 'google-docs' && (
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-red-600/20 text-red-400">
                  <span className="text-sm font-bold">G</span>
                </div>
              )}
              
              {connection.type === 'github' && (
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-800/30 text-gray-300">
                  <FiLock className="h-4 w-4" />
                </div>
              )}
              
              {connection.type === 'other' && (
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600/20 text-blue-400">
                  <FiLink2 className="h-4 w-4" />
                </div>
              )}
              
              <div>
                <h4 className="text-sm text-white">{connection.name}</h4>
                <p className="text-xs text-gray-400">
                  {connection.isConnected ? (
                    <span className="flex items-center gap-1 text-green-400">
                      <FiCheck className="h-3 w-3" /> Connected
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <FiX className="h-3 w-3" /> Not connected
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => handleConnect(connection)}
              disabled={connection.isConnected || isConnecting === connection.id}
              className={`rounded-md px-3 py-1 text-xs font-medium ${
                connection.isConnected
                  ? 'bg-green-900/20 text-green-400'
                  : isConnecting === connection.id
                  ? 'bg-chatgpt-light-hover text-gray-400'
                  : 'bg-chatgpt-green/20 text-chatgpt-green hover:bg-chatgpt-green/30'
              }`}
            >
              {connection.isConnected
                ? 'Connected'
                : isConnecting === connection.id
                ? 'Connecting...'
                : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 