export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface AIModelConfig {
  id: string;
  name: string;
  provider: string;
  description: string;
  apiConfig: {
    baseUrl?: string;
    model: string;
  };
}

export interface AgentAction {
  type: string;
  description: string;
  details?: string;
  timestamp?: number;
}

export interface AgentState {
  isThinking: boolean;
  actions: AgentAction[];
  currentTask: string | null;
}

export interface ChatState {
  messages: Message[];
  selectedModel: AIModelConfig;
  models: AIModelConfig[];
  agentState: AgentState;
  isLoading: boolean;
  error: string | null;
}

export interface Connection {
  id: string;
  type: string;
  name: string;
  status: 'connected' | 'disconnected' | 'connecting';
  lastConnected?: number;
} 