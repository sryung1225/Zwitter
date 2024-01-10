import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { auth } from '@/firebase.ts';
import currentUserAtom from '@atom/current-user.tsx';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  const [localStorageUser, setLocalStorageUser] =
    useRecoilState(currentUserAtom);
  if (!user || localStorageUser.userId === '') {
    auth.signOut().then(() => {
      setLocalStorageUser({ userId: '', userName: '', userAvatar: '' });
    });
    return <Navigate to="/auth" />;
  }
  return children;
}
