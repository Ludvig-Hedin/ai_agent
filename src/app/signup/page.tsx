import SignUpForm from '@/components/auth/SignUpForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | AI Agent',
  description: 'Create an account to access the AI Agent',
};

export default function SignUpPage() {
  return <SignUpForm />;
} 