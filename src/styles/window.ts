import styled from 'styled-components';
import { blackColor, grayColor, primaryColor } from './app.ts';

export const Window = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px);
  padding: 38px 10px 10px;
  border: 3px solid ${blackColor};
  border-radius: 6px;
  box-shadow: 6px 6px ${grayColor};
`;

export const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 28px;
  margin-bottom: 10px;
  background-color: ${primaryColor};
  border-bottom: 3px solid ${blackColor};
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
  }
`;
