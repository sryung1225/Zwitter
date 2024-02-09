import styled from 'styled-components';
import media from '@style/media.ts';

export const Window = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px);
  padding: 38px 10px 10px;
  border: 3px solid ${({ theme }) => theme.colors.text};
  border-radius: 6px;
  box-shadow: 6px 6px ${({ theme }) => theme.colors.gray};
  ${media.semi} {
    &.side-menu.right {
      display: none;
    }
  }
  ${media.tablet} {
    &.side-menu.left {
      display: none;
    }
  }
`;

export const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 28px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-bottom: 3px solid ${({ theme }) => theme.colors.text};
  flex-shrink: 0;
`;

export const IconWrapper = styled.div`
  float: right;
  display: flex;
  align-items: center;
  gap: 2px;
  height: 100%;
  padding-right: 2px;
  svg {
    width: 20px;
    height: 20px;
    path {
      stroke: ${({ theme }) => theme.colors.text};
      fill: ${({ theme }) => theme.colors.background};
    }
  }
`;
