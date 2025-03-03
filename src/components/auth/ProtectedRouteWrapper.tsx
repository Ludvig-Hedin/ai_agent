'use client';

import ProtectedRoute from './ProtectedRoute';

export default function ProtectedRouteWrapper({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
} 