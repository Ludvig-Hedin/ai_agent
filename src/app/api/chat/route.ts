import { NextRequest, NextResponse } from 'next/server';
import { Message, AgentAction } from '@/types';

// Interface for Ollama API response
interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

// Simulate thinking and processing time
const simulateThinking = async () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

// Function to call a local LLM via Ollama
async function callLocalLLM(prompt: string, modelName: string = 'deepseek-coder') {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.6, // DeepSeek recommends 0.6
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json() as OllamaResponse;
    return data.response;
  } catch (error) {
    console.error('Error calling local LLM:', error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message, selectedModel } = await req.json();
    
    // Log the incoming request
    console.log('Received request:', { message, modelType: selectedModel?.name });
    
    // Simulate AI thinking
    await simulateThinking();
    
    let response: string;
    let agentActions: AgentAction[] = [];
    
    // Check if we should use local LLM
    if (process.env.USE_LOCAL_LLM === 'true' && selectedModel?.provider === 'Self-hosted') {
      try {
        // Construct prompt following DeepSeek's recommendation
        const prompt = `<think>\n\nPlease answer the following question thoroughly and show your reasoning: ${message.content}\n</think>`;
        response = await callLocalLLM(prompt, selectedModel?.apiConfig?.model || 'deepseek-coder');
        
        // Add thinking to agent actions
        agentActions.push({
          type: 'thinking',
          description: 'Processing user request and generating response',
          details: 'Analyzing the query and formulating a comprehensive answer',
        });
      } catch (error) {
        console.error('Local LLM error:', error);
        response = "I'm sorry, there was an error connecting to the local DeepSeek model. Please ensure Ollama is running with the DeepSeek model installed (`ollama pull deepseek-coder`)";
      }
    } else {
      // Mock response for other models
      response = `I'm responding to: "${message.content}"\n\nThis is a mock response since we're using a mock API. In a real implementation, this would be connected to ${selectedModel?.name} from ${selectedModel?.provider}.`;
      
      // Add thinking and actions to simulate the agent's process
      agentActions = [
        {
          type: 'thinking',
          description: 'Understanding the user query',
          details: 'Analyzing the question to determine the appropriate response strategy',
        },
        {
          type: 'search',
          description: 'Searching knowledge base',
          details: 'Looking up relevant information to formulate a comprehensive answer',
        },
        {
          type: 'processing',
          description: 'Formulating response',
          details: 'Organizing information into a coherent and helpful answer',
        }
      ];
    }
    
    // Return the response
    return NextResponse.json({
      message: {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      },
      agentActions,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 