import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { AuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase.ts';
import * as S from '../styles/auth.ts';

interface ISocialButton {
  provider: AuthProvider;
  icon: React.ReactNode;
  text: string;
}

const errors: { [key: string]: string } = {
  'auth/account-exists-with-different-credential':
    '이미 다른 수단의 계정을 갖고 있습니다.',
};

export default function SocialSignIn({ provider, icon, text }: ISocialButton) {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState('');
  const onClick = async () => {
    setFirebaseError('');
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setFirebaseError(errors[error.code] || error.message);
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
