import { styled } from 'styled-components';
import { blackColor, grayColor, primaryColor, whiteColor } from './global.ts';

const Button = styled.button`
  width: 100%;
  margin: 8px 0;
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 16px;
`;

export const LineButton = styled(Button)`
  background-color: ${whiteColor};
  border: 1px solid ${grayColor};
  color: ${blackColor};
`;

export const SolidButton = styled(Button)`
  background-color: ${primaryColor};
  border: 1px solid ${primaryColor};
  color: ${whiteColor};
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid #a7a7a7;
  font-size: 16px;
  &::placeholder {
    color: ${grayColor};
  }
`;
