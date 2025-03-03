import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | AI Agent',
  description: 'Login to access the AI Agent',
};

export default function LoginPage() {
  return <LoginForm />;
} 