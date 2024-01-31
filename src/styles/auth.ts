import styled from 'styled-components';
import media from '@style/media.ts';
import { LineButton, SolidButton, Input } from '@style/button.ts';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  ${media.tablet} {
    margin: 10px;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 800px;
  margin-bottom: 20px;
  ${media.tablet} {
    flex-direction: column;
  }
`;

export const Image = styled.img`
  display: inline-block;
  width: 360px;
  height: 360px;
  padding: 30px;
  ${media.desktop} {
    width: 300px;
    height: 300px;
  }
  ${media.tablet} {
    width: 200px;
    height: 200px;
  }
`;

export const Intro = styled.h2`
  font-size: 64px;
  color: ${({ theme }) => theme.colors.background};
  text-shadow: ${({ theme }) => theme.LogoTextShadow(3)};
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
  ${media.desktop} {
    font-size: 56px;
  }
  ${media.tablet} {
    font-size: 50px;
  }
`;

export const AuthWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;

export const Boundary = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  span {
    flex-shrink: 0;
    margin: 0 10px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 20px;
    font-family: ${({ theme }) => theme.fonts.logo};
  }
  &::before,
  &::after {
    flex: 1;
    content: '';
    display: inline-block;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.text};
  }
`;

export const SocialSignIn = styled(LineButton)`
  svg {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
`;

export const SignUpButton = styled(SolidButton)``;

export const SignInButton = styled(LineButton)`
  color: ${({ theme }) => theme.colors.primary};
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px;
`;

export const FormInput = styled(Input)``;

export const SubmitButton = styled(SolidButton)`
  margin-top: 20px;
`;

export const Error = styled.p`
  color: tomato;
  font-size: 14px;
  text-align: center;
`;
