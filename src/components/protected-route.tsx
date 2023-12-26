import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '@/firebase.ts';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return children;
}
