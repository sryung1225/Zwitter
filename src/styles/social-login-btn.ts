import styled from 'styled-components';
import { LineButton } from './button.ts';

export const Button = styled(LineButton)`
  svg {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
`;

export const Error = styled.span`
  color: tomato;
  font-size: 10px;
`;
