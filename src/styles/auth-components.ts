import { styled } from 'styled-components';
import { blackColor, grayColor, primaryColor, whiteColor } from './App.ts';
import { LineButton, SolidButton } from './button.ts';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 800px;
  margin-bottom: 20px;
`;

export const Image = styled.img`
  display: inline-block;
  width: 360px;
  padding: 30px;
`;

export const Intro = styled.h2`
  font-size: 64px;
  color: ${whiteColor};
  text-shadow:
    -3px 0px ${blackColor},
    0px 3px ${blackColor},
    3px 0px ${blackColor},
    0px -3px ${blackColor};
  span {
    color: ${primaryColor};
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
    color: ${blackColor};
    font-size: 20px;
    font-family: 'Ycomputer-Regular', sans-serif;
  }
  &::before,
  &::after {
    flex: 1;
    content: '';
    display: inline-block;
    height: 1px;
    background-color: ${blackColor};
  }
`;

export const SignUpButton = styled(SolidButton)``;

export const SignInButton = styled(LineButton)`
  color: ${primaryColor};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 50px 0 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid ${grayColor};
  font-size: 16px;
  &::placeholder {
    color: ${grayColor};
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  color: ${whiteColor};
  font-size: 16px;
  background-color: ${primaryColor};
  &:hover {
    opacity: 0.8;
  }
`;

export const Error = styled.span`
  color: tomato;
  font-size: 10px;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`;
