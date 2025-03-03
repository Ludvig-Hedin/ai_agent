# AI Agent UI with Browser Automation

A ChatGPT-like interface for AI agents with browser automation capabilities. This application allows you to send prompts to AI models and have them control a web browser to perform tasks.

## Features

- 🤖 Chat with AI models in a familiar ChatGPT-like interface
- 🔄 Switch between different AI models (GPT-4o, Claude, DeepSeek)
- 🌐 Browser automation capabilities for web navigation, clicking, typing, and more
- 🔍 Watch the AI control your browser in real time
- 🔗 Connect to external services like Google Docs and GitHub
- 💭 View the AI's thinking process and planned actions

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- A modern browser (Chrome, Firefox, or Edge)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ludvig-Hedin/ai_agent.git
   cd ai_agent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following:
   ```
   # API Keys for external AI services
   OPENAI_API_KEY=your_openai_key_here
   # ANTHROPIC_API_KEY=your_anthropic_key_here
   # DEEPSEEK_API_KEY=your_deepseek_key_here

   # Browser automation settings
   ENABLE_BROWSER_AUTOMATION=true
   BROWSER_HEADLESS=false
   ```

### Running the App

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Browser Automation Capabilities

The AI agent can perform the following browser actions:

- **Navigation**: Go to specific URLs
- **Clicking**: Click on elements identified by selectors
- **Typing**: Enter text into form fields
- **Reading**: Extract text from web pages
- **Screenshots**: Take snapshots of the current page
- **Form submission**: Submit forms and handle login workflows
- **Scrolling**: Scroll through pages to find content
- **Waiting**: Wait for elements to appear or specific conditions

## Deployment

### Deploy to Vercel

```bash
npm run deploy
```

Or connect the GitHub repository to your Vercel account for automatic deployments.

## Using the App

1. Select your preferred AI model from the dropdown
2. Type your prompt in the chat box (e.g., "Go to github.com and search for React")
3. The AI will respond and show its thinking process
4. If browser automation is requested, the AI will execute the browser actions
5. Results from browser automation will be shown in the chat

## Security Considerations

- API keys are stored in .env.local and never exposed to the client
- Browser automation is executed in a controlled environment
- Actions are logged for audit purposes
- Consider using headless mode in production for better security

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built using Next.js, Tailwind CSS, and React
- Inspired by ChatGPT's interface
- Uses browser-use for browser automation
