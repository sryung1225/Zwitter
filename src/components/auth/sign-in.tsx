import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase.ts';
import currentUserAtom from '@atom/current-user.tsx';
import FetchCurrentUser from '@util/fetch-current-user.tsx';
import useEscClose from '@util/use-esc-close.tsx';
import * as S from '@style/auth.ts';
import * as P from '@style/popup.ts';
import ImageComputer from '@img/logo-small.png';
import { ReactComponent as LoadingSpinner } from '@img/loading-spinner-mini.svg';

interface ISignInProps {
  onClose: () => void;
}

const errors: { [key: string]: string } = {
  'auth/invalid-login-credentials': '유효하지 않은 사용자입니다.',
  'auth/user-not-found': '가입한 적 없는 사용자입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다.',
  'auth/too-many-requests': '잠시 후 다시 시도해주세요.',
};

export default function SignIn({ onClose }: ISignInProps) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const [firebaseError, setFirebaseError] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'userEmail') {
      setUserEmail(value);
    } else if (name === 'userPassword') {
      setUserPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFirebaseError('');
    if (isLoading || userEmail === '' || userPassword === '') return;
    try {
      setLoading(true);
      const { user } = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword,
      );
      await FetchCurrentUser({
        userId: user?.uid || '',
        setCurrentUser,
      });
      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setFirebaseError(errors[error.code] || error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEscClose(onClose);
  return (
    <P.PopupWrapper>
      <P.Popup>
        <P.CloseButton onClick={onClose} type="button">
          <span className="a11yHidden">닫기</span>
        </P.CloseButton>
        <P.Logo>
          <span>Z</span>witter
          <img src={ImageComputer} alt="로고 아이콘" width="40" height="40" />
        </P.Logo>
        <P.Title>로그인</P.Title>
        <S.Form onSubmit={onSubmit}>
          <S.FormInput
            onChange={onChange}
            name="userEmail"
            value={userEmail}
            placeholder="이메일을 입력해주세요"
            type="email"
            required
          />
          <S.FormInput
            onChange={onChange}
            value={userPassword}
            name="userPassword"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            required
          />
          <S.SubmitButton type="submit">
            {isLoading ? <LoadingSpinner /> : '로그인하기'}
          </S.SubmitButton>
        </S.Form>
        {firebaseError !== '' ? <S.Error>{firebaseError}</S.Error> : null}
      </P.Popup>
    </P.PopupWrapper>
  );
}
