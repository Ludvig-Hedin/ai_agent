import axios from 'axios';
import { AIModelConfig } from '../types';

// Default base URL for API
const API_URL = '/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface SendMessageRequest {
  message: string;
  modelConfig: AIModelConfig;
}

export interface SendMessageResponse {
  response: string;
  thinking?: string;
  actions?: Array<{
    action: string;
    thought: string;
  }>;
}

export const apiService = {
  // Send a message to the AI agent
  sendMessage: async (params: SendMessageRequest): Promise<SendMessageResponse> => {
    try {
      const response = await apiClient.post<SendMessageResponse>('/chat', params);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Get available models
  getModels: async (): Promise<AIModelConfig[]> => {
    try {
      const response = await apiClient.get<{ models: AIModelConfig[] }>('/models');
      return response.data.models;
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  },

  // Check connection status
  checkConnectionStatus: async (): Promise<boolean> => {
    try {
      const response = await apiClient.get<{ status: 'ok' | 'error' }>('/status');
      return response.data.status === 'ok';
    } catch (error) {
      console.error('Error checking connection status:', error);
      return false;
    }
  },

  // Connect to an external service (like Google Docs)
  connectToService: async (service: string): Promise<boolean> => {
    try {
      const response = await apiClient.post<{ success: boolean }>('/connect', { service });
      return response.data.success;
    } catch (error) {
      console.error(`Error connecting to ${service}:`, error);
      return false;
    }
  },
}; 