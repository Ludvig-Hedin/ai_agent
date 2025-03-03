import { Metadata } from 'next';
import ChatContainer from '@/components/ChatContainer';

export const metadata: Metadata = {
  title: 'Chat | AI Agent',
  description: 'Chat with the AI Agent',
};

export default function ChatPage() {
  return <ChatContainer />;
} 