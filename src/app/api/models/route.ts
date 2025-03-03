import { NextResponse } from 'next/server';

export async function GET() {
  // In a real implementation, you would fetch available models from your backend
  // This is a mock implementation
  
  const models = [
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
      id: 'deepseek-chat',
      name: 'DeepSeek Chat',
      provider: 'DeepSeek',
      description: 'Powerful and cost-effective chat model',
      apiConfig: {
        baseUrl: 'https://api.deepseek.com/v1',
        model: 'deepseek-chat',
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
    }
  ];
  
  return NextResponse.json({ models });
} 