import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase.ts';
import currentUserAtom from '@atom/current-user.tsx';
import DEFAULT_ERROR from '@const/default-error.tsx';
import AUTH_ERRORS from '@const/auth-errors.tsx';
import FetchCurrentUser from '@util/fetch-current-user.tsx';
import useEscClose from '@util/use-esc-close.tsx';
import * as S from '@style/auth.ts';
import * as P from '@style/popup.ts';
import ErrorAlarm from '@style/error-alarm.ts';
import ImageComputer from '@img/logo-small.png';
import { ReactComponent as LoadingSpinner } from '@img/loading-spinner-mini.svg';

interface ISignInProps {
  onClose: () => void;
}

export default function SignIn({ onClose }: ISignInProps) {
  const navigate = useNavigate();
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const [isLoading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
  const displayError = (error: unknown) => {
    let message = '';
    if (error instanceof FirebaseError) {
      message = AUTH_ERRORS[error.code] || `${DEFAULT_ERROR} (${error.code})`;
    }
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      displayError(error);
    } finally {
      setLoading(false);
    }
  };
  useEscClose(onClose);
  return (
    <>
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
        </P.Popup>
      </P.PopupWrapper>
      {errorMessage && <ErrorAlarm>{errorMessage}</ErrorAlarm>}
    </>
  );
}
