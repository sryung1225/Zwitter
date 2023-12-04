import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase.ts';
import * as S from '../styles/auth-components.ts';

const errors: { [key: string]: string } = {
  'auth/user-not-found': '가입한 적 없는 사용자 입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다.',
  'auth/too-many-requests': '잠시 후 다시 시도해주세요.',
};

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
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
      await signInWithEmailAndPassword(auth, userEmail, userPassword);
      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setFirebaseError(errors[error.code] || error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <S.Wrapper>
      <S.Title>로그인</S.Title>
      <S.Form onSubmit={onSubmit}>
        <S.Input
          onChange={onChange}
          name="userEmail"
          value={userEmail}
          placeholder="이메일을 입력해주세요"
          type="email"
          required
        />
        <S.Input
          onChange={onChange}
          value={userPassword}
          name="userPassword"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          required
        />
        <S.SubmitButton type="submit">
          {isLoading ? '로딩...' : '로그인'}
        </S.SubmitButton>
      </S.Form>
      {firebaseError !== '' ? <S.Error>{firebaseError}</S.Error> : null}
      <S.Switcher>
        계정이 없으세요? <Link to="/create-account">회원가입</Link>
      </S.Switcher>
    </S.Wrapper>
  );
}
