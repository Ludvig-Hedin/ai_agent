'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const code = searchParams.get('code');
    
    const handleCallback = async () => {
      if (code) {
        try {
          await supabase.auth.exchangeCodeForSession(code);
          router.push('/chat');
        } catch (error) {
          console.error('Error exchanging code for session:', error);
          router.push('/login?error=callback-failed');
        }
      } else {
        router.push('/login?error=no-code');
      }
    };
    
    handleCallback();
  }, [searchParams, router]);
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Completing login...</h2>
        <p className="text-gray-600 dark:text-gray-400">Please wait while we complete your login.</p>
      </div>
    </div>
  );
} 