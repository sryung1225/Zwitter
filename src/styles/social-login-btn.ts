import styled from 'styled-components';
import { whiteColor } from './App.ts';

export const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  background-color: ${whiteColor};
  border-radius: 50px;
  border: 1px solid #a7a7a7;
  font-size: 16px;
`;

export const Logo = styled.img`
  height: 16px;
  margin-right: 10px;
`;

export const Error = styled.span`
  color: tomato;
  font-size: 10px;
`;
