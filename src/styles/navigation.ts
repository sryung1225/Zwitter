import styled from 'styled-components';

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;

export const LogoTitle = styled.h1`
  color: ${({ theme }) => theme.colors.background};
  font-size: 34px;
  text-shadow: ${({ theme }) => theme.LogoTextShadow(2)};
  span {
    color: ${({ theme }) => theme.colors.primary};
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
      props.$isActive ? props.theme.colors.primary : props.theme.colors.text};
    font-size: 20px;
    font-family: ${({ theme }) => theme.fonts.logo};
    text-decoration: none;
    transition: all 0.5s ease;
  }
  svg {
    width: 24px;
    stroke: ${(props) =>
      props.$isActive ? props.theme.colors.primary : props.theme.colors.text};
    vertical-align: sub;
    transition: all 0.5s ease;
  }
  &:hover {
    a {
      color: ${({ theme }) => theme.colors.primary};
    }
    svg {
      stroke: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Button = styled.button`
  border: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
  font-family: 'Ycomputer-Regular', sans-serif;
  svg {
    stroke: ${({ theme }) => theme.colors.primary};
  }
`;
