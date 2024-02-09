import styled, { keyframes } from 'styled-components';
import * as S from '@style/navigation.ts';
import * as P from '@style/popup.ts';

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const NavigationWrapper = styled.nav<{ $isActive: boolean }>`
  z-index: 100;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  animation: ${(props) => (props.$isActive ? slideIn : slideOut)} 0.5s ease-out;
`;

export const CloseButton = styled(P.CloseButton)`
  &::before,
  &::after {
    background-color: ${({ theme }) => theme.colors.text};
  }
`;

export const Logo = styled(S.Logo)``;

export const LogoTitle = styled(S.LogoTitle)`
  font-size: 40px;
`;

export const LogoImage = styled(S.LogoImage)``;

export const MenuList = styled(S.MenuList)`
  margin: 50px 0;
  gap: 50px;
`;

export const MenuItem = styled.li`
  line-height: 30px;
  a,
  button {
    color: ${(props) => props.theme.colors.background};
    font-size: 36px;
    font-family: ${({ theme }) => theme.fonts.logo};
    transition: all 0.5s ease;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
  button {
    background-color: transparent;
    border: none;
  }
  &:hover {
    a,
    button {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;
