import { useState } from 'react';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import SignUp from '@compo/auth/sign-up.tsx';
import SignIn from '@compo/auth/sign-in.tsx';
import SocialSignIn from '@compo/auth/social-sign-in.tsx';
import * as S from '@style/auth.ts';
import ImageComputer from '@img/logo-big.png';
import { ReactComponent as IconGoogle } from '@img/i-google.svg';
import { ReactComponent as IconGithub } from '@img/i-github.svg';

export default function Auth() {
  const [signUpPopup, setSignUpPopup] = useState(false);
  const [signInPopup, setSignInPopup] = useState(false);
  return (
    <S.Wrapper>
      <h1 className="a11yHidden">로그인</h1>
      <S.Title>
        <S.Image
          src={ImageComputer}
          alt="로고 이미지"
          width="360"
          height="360"
        />
        <S.Intro>
          쉿-
          <br />
          지금 <span>Z</span>세대는
          <br />
          <span>조잘</span>거리는 중
        </S.Intro>
      </S.Title>
      <S.AuthWrapper>
        <SocialSignIn
          provider={new GoogleAuthProvider()}
          icon={<IconGoogle />}
          text="Google 계정으로 로그인하기"
        />
        <SocialSignIn
          provider={new GithubAuthProvider()}
          icon={<IconGithub />}
          text="Github 계정으로 로그인하기"
        />
        <S.Boundary>
          <span>또는</span>
        </S.Boundary>
        <S.SignUpButton type="button" onClick={() => setSignUpPopup(true)}>
          계정 만들기
        </S.SignUpButton>
        <S.SignInButton type="button" onClick={() => setSignInPopup(true)}>
          로그인
        </S.SignInButton>
      </S.AuthWrapper>
      {signUpPopup ? <SignUp onClose={() => setSignUpPopup(false)} /> : null}
      {signInPopup ? <SignIn onClose={() => setSignInPopup(false)} /> : null}
    </S.Wrapper>
  );
}
