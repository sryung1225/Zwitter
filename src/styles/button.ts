import styled from 'styled-components';

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
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.text};
`;

export const SolidButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  background-color: transparent;
  border-radius: 50px;
  border: 1px solid #a7a7a7;
  font-size: 16px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
`;
