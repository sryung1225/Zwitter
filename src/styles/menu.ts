import styled from 'styled-components';
import { LogoTextShadow, blackColor, primaryColor, whiteColor } from './app.ts';

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;

export const LogoTitle = styled.h1`
  color: ${whiteColor};
  font-size: 30px;
  text-shadow: ${LogoTextShadow(2)};
  span {
    color: ${primaryColor};
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

export const MenuItem = styled.li`
  line-height: 30px;
  cursor: pointer;
  a {
    font-size: 20px;
    font-family: 'Ycomputer-Regular', sans-serif;
    text-decoration: none;
    transition: all 0.5s ease;
  }
  svg {
    width: 24px;
    stroke: ${blackColor};
    vertical-align: sub;
    transition: all 0.5s ease;
  }
  &:hover {
    a {
      color: ${primaryColor};
    }
    svg {
      stroke: ${primaryColor};
    }
  }
`;

export const Button = styled.button`
  border: 0;
  background-color: transparent;
  color: ${primaryColor};
  font-size: 20px;
  font-family: 'Ycomputer-Regular', sans-serif;
  svg {
    stroke: ${primaryColor};
  }
`;
