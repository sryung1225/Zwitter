import { styled } from 'styled-components';
import media from '@style/media.ts';

const FloatingActionButton = styled.button`
  z-index: 50;
  position: fixed;
  right: 55px;
  width: 50px;
  height: 50px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.background};
  box-shadow: 6px 6px ${({ theme }) => theme.colors.gray};
  svg {
    stroke: ${({ theme }) => theme.colors.background};
    fill: ${({ theme }) => theme.colors.background};
    width: 26px;
    height: 26px;
    transition: 0.2s ease-in;
  }
  &:hover {
    opacity: 1;
    svg {
      stroke: ${({ theme }) => theme.colors.primary};
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
  ${media.tablet} {
    & {
      width: 40px;
      height: 40px;
      box-shadow: 4px 4px ${({ theme }) => theme.colors.gray};
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

export const ModeToggleButton = styled(FloatingActionButton)`
  bottom: 50px;
  ${media.tablet} {
    & {
      bottom: 40px;
    }
  }
`;

export const NavToggleButton = styled(FloatingActionButton)`
  bottom: 110px;
  ${media.tablet} {
    & {
      bottom: 85px;
    }
  }
`;
