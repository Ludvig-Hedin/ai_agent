import { NextRequest, NextResponse } from 'next/server';
import { Message, AgentAction } from '@/types';
import { browserAutomation, BrowserActionType, BrowserActionParams } from '@/services/browserAutomation';

// Mock function for browser automation actions
async function executeBrowserAction(actionType: BrowserActionType, params: any): Promise<string> {
  try {
    const result = await browserAutomation.executeAction(actionType, params);
    
    if ('text' in result) {
      return `Read content: ${result.text}`;
    } else if ('imageData' in result) {
      return `Screenshot taken successfully. Image data length: ${result.imageData.length} characters`;
    } else {
      return result.message;
    }
  } catch (error) {
    console.error(`Error executing browser action ${actionType}:`, error);
    return `Failed to execute ${actionType}: ${error instanceof Error ? error.message : String(error)}`;
  }
}

// Function to make requests to external AI APIs
async function callExternalAI(message: string, modelId: string, provider: string): Promise<string> {
  // In production, this would make actual API calls to the respective providers
  console.log(`Calling ${provider} AI model: ${modelId}`);
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock response based on provider
  switch (provider.toLowerCase()) {
    case 'openai':
      return `This is a simulated response from OpenAI's ${modelId}. In a real implementation, this would call the OpenAI API.\n\nI can help you navigate the web. What would you like me to do?`;
    case 'anthropic':
      return `This is a simulated response from Anthropic's ${modelId}. In a real implementation, this would call the Anthropic API.\n\nI can assist with web browsing tasks. What browser actions would you like me to perform?`;
    case 'deepseek':
      return `This is a simulated response from DeepSeek's ${modelId}. In a real implementation, this would call the DeepSeek API.\n\nI can control a web browser to help you. Let me know what you want to explore online.`;
    default:
      return `This is a simulated response from ${provider}'s ${modelId}. The integration with this provider would need to be implemented.`;
  }
}

// Extract potential browser actions from user message
function extractBrowserActions(content: string): AgentAction[] {
  const actions: AgentAction[] = [];
  const contentLower = content.toLowerCase();
  
  // Simple pattern matching - in a real implementation, this would be done by the AI
  if (contentLower.includes('go to') || contentLower.includes('navigate') || contentLower.includes('open')) {
    // Try to extract URL
    const urlPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,})/i;
    const match = content.match(urlPattern);
    const url = match ? match[0] : 'example.com';
    
    actions.push({
      type: 'navigate',
      description: `Navigate to ${url}`,
      details: `Will navigate to the website: ${url}`,
    });
  }
  
  if (contentLower.includes('click') || contentLower.includes('press')) {
    actions.push({
      type: 'click',
      description: 'Click on element',
      details: 'Will identify and click on the relevant element',
    });
  }
  
  if (contentLower.includes('type') || contentLower.includes('enter') || contentLower.includes('input')) {
    actions.push({
      type: 'type',
      description: 'Enter text',
      details: 'Will enter text into an input field',
    });
  }
  
  if (contentLower.includes('read') || contentLower.includes('extract') || contentLower.includes('get text')) {
    actions.push({
      type: 'read',
      description: 'Extract text from page',
      details: 'Will read text content from the specified element or area',
    });
  }
  
  if (contentLower.includes('screenshot') || contentLower.includes('capture')) {
    actions.push({
      type: 'screenshot',
      description: 'Take screenshot',
      details: 'Will capture a screenshot of the current page',
    });
  }
  
  return actions;
}

export async function POST(req: NextRequest) {
  try {
    const { message, selectedModel } = await req.json();
    
    // Log the incoming request
    console.log('Received request:', { message, modelType: selectedModel?.name });
    
    // Extract potential browser actions from the message
    const browserActions = extractBrowserActions(message.content);
    
    // Initialize browser if needed
    let browserInitialized = false;
    if (browserActions.length > 0 && process.env.ENABLE_BROWSER_AUTOMATION === 'true') {
      try {
        await browserAutomation.initialize();
        browserInitialized = true;
      } catch (error) {
        console.error('Failed to initialize browser:', error);
      }
    }
    
    // Call the external AI API for the response
    const aiResponse = await callExternalAI(
      message.content,
      selectedModel.id,
      selectedModel.provider
    );
    
    // Execute browser actions and collect results
    let executionResults = '';
    if (browserInitialized) {
      for (const action of browserActions) {
        try {
          // Execute mock actions for now
          switch (action.type) {
            case 'navigate':
              executionResults += await executeBrowserAction('navigate', { url: 'https://example.com' }) + '\n';
              break;
            case 'click':
              executionResults += await executeBrowserAction('click', { selector: '#example-button' }) + '\n';
              break;
            case 'type':
              executionResults += await executeBrowserAction('type', { selector: '#search-input', text: 'example query' }) + '\n';
              break;
            case 'read':
              executionResults += await executeBrowserAction('read', { selector: 'main' }) + '\n';
              break;
            case 'screenshot':
              executionResults += await executeBrowserAction('screenshot', { fullPage: true }) + '\n';
              break;
          }
        } catch (error) {
          executionResults += `Error executing ${action.type}: ${error instanceof Error ? error.message : String(error)}\n`;
        }
      }
      
      // Close browser when done
      await browserAutomation.close();
    }
    
    // Combine AI response with browser action results
    let finalResponse = aiResponse;
    if (executionResults) {
      finalResponse += '\n\n**Browser Actions Executed:**\n```\n' + executionResults.trim() + '\n```';
    }
    
    // Return the response with browser actions
    return NextResponse.json({
      message: {
        id: Date.now().toString(),
        role: 'assistant',
        content: finalResponse,
        timestamp: Date.now(),
      },
      agentActions: [
        {
          type: 'thinking',
          description: 'Analyzing user request',
          details: 'Determining what browser actions are needed',
        },
        ...browserActions,
        browserActions.length > 0 ? {
          type: 'execution',
          description: 'Executing browser actions',
          details: `Executed ${browserActions.length} browser action(s)`,
        } : null,
      ].filter(Boolean) as AgentAction[],
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 