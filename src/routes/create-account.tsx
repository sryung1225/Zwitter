import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import auth from '../firebase.ts';
import * as S from '../styles/routes/create-account.ts';

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
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
      // eslint-disable-next-line no-shadow
    } catch (e) {
      setError('');
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
        <S.Input type="submit" value={isLoading ? '로딩...' : '회원가입'} />
      </S.Form>
      {error !== '' ? <S.Error>{error}</S.Error> : null}
    </S.Wrapper>
  );
}
