import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase.ts';
import * as S from '../styles/auth.ts';
import { ReactComponent as IconGithub } from '../assets/images/i-github.svg';

const errors: { [key: string]: string } = {
  'auth/account-exists-with-different-credential':
    '이미 다른 수단의 계정을 갖고 있습니다.',
};

export default function GithubButton() {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState('');
  const onClick = async () => {
    setFirebaseError('');
    try {
      const provider = new GithubAuthProvider();
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
        <IconGithub />
        GitHub 계정으로 로그인하기
      </S.SocialSignIn>
      {firebaseError !== '' ? <S.Error>{firebaseError}</S.Error> : null}
    </>
  );
}
