import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { ChatState, Message, AIModelConfig, AgentAction } from '../types';

// Default models available
const defaultModels: AIModelConfig[] = [
  {
    id: 'gpt4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'Multimodal model with strong capabilities across text, vision, and reasoning',
    apiConfig: {
      model: 'gpt-4o',
    }
  },
  {
    id: 'claude',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    description: 'Fast, helpful and harmless AI assistant',
    apiConfig: {
      model: 'claude-3-5-sonnet-20240620',
    }
  },
  {
    id: 'deepseek-chat',
    name: 'DeepSeek Chat',
    provider: 'DeepSeek',
    description: 'Powerful AI model for browser automation tasks',
    apiConfig: {
      model: 'deepseek-chat',
    }
  }
];

// Initial state
const initialState: ChatState = {
  messages: [],
  selectedModel: defaultModels[0], // GPT-4o is the default model
  models: defaultModels,
  agentState: {
    isThinking: false,
    actions: [],
    currentTask: null,
  },
  isLoading: false,
  error: null,
};

export const useChatStore = create<
  ChatState & {
    addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
    addAgentAction: (action: Omit<AgentAction, 'timestamp'>) => void;
    setSelectedModel: (model: AIModelConfig) => void;
    setIsThinking: (isThinking: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    clearMessages: () => void;
    clearAgentActions: () => void;
  }
>((set) => ({
  ...initialState,
  
  addMessage: (message) => set((state) => ({
    messages: [
      ...state.messages, 
      { 
        ...message, 
        id: uuidv4(), 
        timestamp: Date.now() 
      }
    ],
  })),
  
  addAgentAction: (action) => set((state) => ({
    agentState: {
      ...state.agentState,
      actions: [
        ...state.agentState.actions,
        { ...action, timestamp: Date.now() }
      ],
    },
  })),
  
  setSelectedModel: (model) => set(() => ({ selectedModel: model })),
  
  setIsThinking: (isThinking) => set((state) => ({
    agentState: {
      ...state.agentState,
      isThinking,
    },
  })),
  
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  
  setError: (error) => set(() => ({ error })),
  
  clearMessages: () => set(() => ({ messages: [] })),
  
  clearAgentActions: () => set((state) => ({
    agentState: {
      ...state.agentState,
      actions: [],
    },
  })),
})); 