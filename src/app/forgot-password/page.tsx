import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password | AI Agent',
  description: 'Reset your password for the AI Agent',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
} 