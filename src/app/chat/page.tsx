'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatContainer from '@/components/ChatContainer';

export default function ChatPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('isAuthenticated');
    
    if (authStatus === 'true') {
      setIsAuthorized(true);
    } else {
      // Redirect to login page if not authenticated
      router.push('/');
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-dark-700">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-lg text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect in useEffect
  }

  return <ChatContainer />;
} 