import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.ts';
import GithubButton from '../components/github-btn.tsx';
import * as S from '../styles/auth-components.ts';
import * as P from '../styles/popup.ts';
import ImageComputer from '../assets/images/computer.png';

const errors: { [key: string]: string } = {
  'auth/invalid-login-credentials': '유효하지 않은 사용자입니다.',
  'auth/user-not-found': '가입한 적 없는 사용자입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다.',
  'auth/too-many-requests': '잠시 후 다시 시도해주세요.',
};

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const [loginPopup, setLoginPopup] = useState(false);
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
      <h1 className="a11yHidden">로그인</h1>
      <S.Title>
        <S.Image src={ImageComputer} alt="컴퓨터 픽셀 이미지"></S.Image>
        <S.Intro>
          쉿-
          <br />
          지금 <span>Z</span>세대는
          <br />
          <span>조잘</span>거리는 중
        </S.Intro>
      </S.Title>
      <S.AuthWrapper>
        <GithubButton />
        <GithubButton /> {/* 구글로 대체 필요 */}
        <S.Boundary>
          <span>또는</span>
        </S.Boundary>
        <S.SignUpButton type="button" onClick={() => setLoginPopup(true)}>
          계정 만들기
        </S.SignUpButton>
        <S.SignInButton type="button">로그인</S.SignInButton>
        {/* <S.Switcher>
          계정이 없으세요? <Link to="/create-account">회원가입</Link>
        </S.Switcher> */}
      </S.AuthWrapper>
      {loginPopup ? (
        <P.PopupWrapper>
          <P.Popup>
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
          </P.Popup>
        </P.PopupWrapper>
      ) : null}
    </S.Wrapper>
  );
}
