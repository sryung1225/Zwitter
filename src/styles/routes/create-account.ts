import { styled } from 'styled-components';
import { grayColor, primaryColor, whiteColor } from '../App.ts';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  height: 100%;
  padding: 50px 0px;
`;

export const Title = styled.h1`
  font-size: 42px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 50px;
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
  font-weight: 600;
`;
