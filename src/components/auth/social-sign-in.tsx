import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { FirebaseError } from 'firebase/app';
import { AuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase.ts';
import currentUserAtom from '@atom/current-user.tsx';
import AUTH_ERRORS from '@const/auth-errors.tsx';
import FetchCurrentUser from '@util/fetch-current-user.tsx';
import * as S from '@style/auth.ts';

interface ISocialButton {
  provider: AuthProvider;
  icon: React.ReactNode;
  text: string;
}

export default function SocialSignIn({ provider, icon, text }: ISocialButton) {
  const navigate = useNavigate();
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const [firebaseError, setFirebaseError] = useState('');
  const onClick = async () => {
    setFirebaseError('');
    try {
      const credentials = await signInWithPopup(auth, provider);
      const userRef = doc(db, 'users', credentials.user.uid);
      await setDoc(userRef, {
        userName: credentials.user.displayName || 'Anonymous',
        userId: credentials.user.uid,
        userAvatar: credentials.user.photoURL || null,
      });
      await FetchCurrentUser({
        userId: credentials.user.uid || '',
        setCurrentUser,
      });
      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setFirebaseError(AUTH_ERRORS[error.code] || error.message);
      }
    }
  };
  return (
    <>
      <S.SocialSignIn onClick={onClick}>
        {icon}
        {text}
      </S.SocialSignIn>
      {firebaseError !== '' ? <S.Error>{firebaseError}</S.Error> : null}
    </>
  );
}
