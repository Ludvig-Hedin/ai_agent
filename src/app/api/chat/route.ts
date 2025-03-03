import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

// Function to call Ollama API running locally
async function callLocalLLM(prompt: string, model: string = 'deepseek-coder') {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error calling local LLM:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, modelConfig } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    console.log(`Using model: ${modelConfig.name} (${modelConfig.provider})`);
    
    // Different handling based on the model
    let responseText = '';
    let thinking = '';
    
    // Simulate processing time for remote models
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      if (modelConfig.id === 'deepseek-chat' && process.env.USE_LOCAL_LLM === 'true') {
        // Call locally hosted DeepSeek via Ollama
        thinking = "Processing with local DeepSeek model...";
        console.log("Calling local DeepSeek model via Ollama...");
        
        const systemPrompt = "You are an AI agent that can control a web browser to perform tasks. Respond briefly with what you would do to fulfill the user's request.";
        const fullPrompt = `${systemPrompt}\n\nUser request: ${message}\n\nHow would you approach this task?`;
        
        try {
          responseText = await callLocalLLM(fullPrompt, 'deepseek-coder');
        } catch (error) {
          console.error("Error calling local LLM:", error);
          responseText = "I encountered an error connecting to the local DeepSeek model. Please ensure Ollama is running with the DeepSeek model loaded (`ollama serve` and `ollama pull deepseek-coder`).";
        }
      } else {
        // Use mock responses for different models (for demo purposes)
        switch (modelConfig.id) {
          case 'deepseek-chat':
            thinking = "Processing with DeepSeek model. Analyzing request and planning browser actions...";
            responseText = `I'll help you with that using DeepSeek's capabilities. Your request was: "${message}"\n\nIn a real implementation, I would be calling the DeepSeek API via the browser-use agent to perform the requested actions in a browser.`;
            break;
          
          case 'claude':
            thinking = "Processing with Claude model. Analyzing request and planning browser actions...";
            responseText = `I'm using Claude to understand and help with your request: "${message}"\n\nIn a full implementation, I would use Anthropic's Claude model through the browser-use agent to perform browser actions.`;
            break;
            
          case 'gpt4o':
          default:
            thinking = "Processing with GPT-4o model. Analyzing request and planning browser actions...";
            responseText = `I'll assist you with that using OpenAI's capabilities. You asked: "${message}"\n\nIn a real implementation, I would be calling the OpenAI API via the browser-use agent to perform browser tasks.`;
            break;
        }
      }
      
      return NextResponse.json({
        response: responseText,
        thinking: thinking,
        actions: [
          {
            action: "Analyzed user request",
            thought: `Using ${modelConfig.name} to understand what the user is asking for. The request appears to be about: "${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"`
          },
          {
            action: "Planning browser automation",
            thought: "Determining what browser actions would be needed to fulfill this request."
          },
          {
            action: "Ready to execute",
            thought: "In a complete implementation, I would now execute the planned actions in a browser using browser-use."
          }
        ]
      });
    } catch (error) {
      console.error('Error processing model response:', error);
      return NextResponse.json({
        response: "I encountered an error processing your request. Please try again or check the server logs.",
        thinking: "Error encountered during processing",
        actions: [
          {
            action: "Error processing request",
            thought: "An error occurred while trying to process your request."
          }
        ]
      });
    }
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 