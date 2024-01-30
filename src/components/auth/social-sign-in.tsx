import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { AuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase.ts';
import currentUserAtom from '@atom/current-user.tsx';
import useErrorMessage from '@hook/useErrorMessage.tsx';
import FetchCurrentUser from '@util/fetch-current-user.tsx';
import * as S from '@style/auth.ts';
import ErrorAlarm from '@style/error-alarm.ts';

interface ISocialButton {
  provider: AuthProvider;
  icon: React.ReactNode;
  text: string;
}

export default function SocialSignIn({ provider, icon, text }: ISocialButton) {
  const navigate = useNavigate();
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const { errorMessage, displayError } = useErrorMessage('');
  const onClick = async () => {
    try {
      const credentials = await signInWithPopup(auth, provider);
      const userRef = doc(db, 'users', credentials.user.uid);
      await setDoc(userRef, {
        userName: credentials.user.displayName || '미지의 Z세대',
        userId: credentials.user.uid,
        userAvatar: credentials.user.photoURL || null,
      });
      await FetchCurrentUser({
        userId: credentials.user.uid || '',
        setCurrentUser,
      });
      navigate('/');
    } catch (error) {
      displayError(error);
    }
  };
  return (
    <>
      <S.SocialSignIn onClick={onClick}>
        {icon}
        {text}
      </S.SocialSignIn>
      {errorMessage && <ErrorAlarm>{errorMessage}</ErrorAlarm>}
    </>
  );
}
