# AI Agent UI

A ChatGPT-like interface for interacting with browser-use AI agents. This application allows you to send prompts to AI models including OpenAI GPT-4o, Anthropic Claude, and locally hosted DeepSeek.

![AI Agent UI Screenshot](public/screenshot.png)

## Features

- 🤖 Chat with AI models in a familiar ChatGPT-like interface
- 🔄 Switch between different AI models (GPT-4o, Claude, DeepSeek)
- 🖥️ Self-host DeepSeek locally using Ollama
- 🌐 Browser automation capabilities via browser-use
- 🔗 Connect to external services like Google Docs and GitHub
- 💭 View the AI's thinking process and planned actions

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- For local LLMs: [Ollama](https://ollama.ai/download) installed

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/ai-agent.git
   cd ai-agent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following:
   ```
   # Enable local LLM usage via Ollama
   USE_LOCAL_LLM=true

   # If using API-based models
   # OPENAI_API_KEY=your_key_here
   # ANTHROPIC_API_KEY=your_key_here
   # DEEPSEEK_API_KEY=your_key_here
   ```

### Setting Up Local DeepSeek

1. Install Ollama from [ollama.ai/download](https://ollama.ai/download)
2. Pull the DeepSeek model:
   ```bash
   ollama pull deepseek-coder
   ```
3. Start the Ollama server:
   ```bash
   ollama serve
   ```

### Running the App

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Deploy to Vercel

```bash
npm run deploy
```

Or connect the GitHub repository to your Vercel account for automatic deployments.

## Using the App

1. Select your preferred AI model from the dropdown
2. Type your prompt in the chat box
3. The AI will respond and show its thinking process
4. You can connect to external services through the connections panel

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built using Next.js, Tailwind CSS, and React
- Inspired by ChatGPT's interface
- Uses browser-use for browser automation
