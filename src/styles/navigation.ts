import styled from 'styled-components';
import theme from '@style/theme.ts';

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;

export const LogoTitle = styled.h1`
  color: ${theme.colors.white};
  font-size: 34px;
  text-shadow: ${theme.LogoTextShadow(2)};
  span {
    color: ${theme.colors.primary};
  }
`;

export const LogoImage = styled.img`
  width: 40px;
  height: 40px;
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const MenuItem = styled.li<{ $isActive: boolean }>`
  line-height: 30px;
  cursor: pointer;
  a {
    color: ${(props) =>
      props.$isActive ? theme.colors.primary : theme.colors.black};
    font-size: 20px;
    font-family: 'Ycomputer-Regular', sans-serif;
    text-decoration: none;
    transition: all 0.5s ease;
  }
  svg {
    width: 24px;
    stroke: ${(props) =>
      props.$isActive ? theme.colors.primary : theme.colors.black};
    vertical-align: sub;
    transition: all 0.5s ease;
  }
  &:hover {
    a {
      color: ${theme.colors.primary};
    }
    svg {
      stroke: ${theme.colors.primary};
    }
  }
`;

export const Button = styled.button`
  border: 0;
  background-color: transparent;
  color: ${theme.colors.primary};
  font-size: 20px;
  font-family: 'Ycomputer-Regular', sans-serif;
  svg {
    stroke: ${theme.colors.primary};
  }
`;
