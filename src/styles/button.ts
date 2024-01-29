import { styled } from 'styled-components';
import theme from '@style/theme.ts';

const Button = styled.button`
  width: 100%;
  margin: 8px 0;
  padding: 0 20px;
  border-radius: 50px;
  font-size: 16px;
  line-height: 36px;
  svg {
    width: 36px;
    height: 36px;
  }
`;

export const LineButton = styled(Button)`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  color: ${theme.colors.black};
`;

export const SolidButton = styled(Button)`
  background-color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.white};
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid #a7a7a7;
  font-size: 16px;
  &::placeholder {
    color: ${theme.colors.gray};
  }
`;
