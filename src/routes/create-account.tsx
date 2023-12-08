import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase.ts';
import * as S from '../styles/auth-components.ts';

const errors: { [key: string]: string } = {
  'auth/email-already-in-use': '해당 이메일은 이미 사용 중 입니다.',
  'auth/invalid-email': '유효하지 않은 이메일 형식입니다.',
  'auth/weak-password': '비밀번호가 보안상 약해 사용할 수 없습니다.',
  'auth/too-many-requests': '잠시 후 다시 시도해주세요.',
};

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'userName') {
      setUserName(value);
    } else if (name === 'userEmail') {
      setUserEmail(value);
    } else if (name === 'userPassword') {
      setUserPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFirebaseError('');
    if (isLoading || userName === '' || userEmail === '' || userPassword === '')
      return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword,
      );
      // console.log(credentials.user); // 사용자 정보
      await updateProfile(credentials.user, {
        displayName: userName,
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
  return (
    <S.Wrapper>
      <S.Title>회원가입</S.Title>
      <S.Form onSubmit={onSubmit}>
        <S.Input
          onChange={onChange}
          name="userName"
          value={userName}
          placeholder="이름을 입력해주세요"
          type="text"
          required
        />
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
          {isLoading ? '로딩...' : '회원가입'}
        </S.SubmitButton>
      </S.Form>
      {firebaseError !== '' ? <S.Error>{firebaseError}</S.Error> : null}
      <S.Switcher>
        계정이 있으세요? <Link to="/login">로그인</Link>
      </S.Switcher>
    </S.Wrapper>
  );
}
