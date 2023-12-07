import styled from 'styled-components';
import { blackColor, primaryColor } from '../App.ts';

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const MenuItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 2px solid ${blackColor};
  border-radius: 50%;
  cursor: pointer;
  svg {
    width: 30px;
    stroke: ${blackColor};
  }
  &.log-out {
    border-color: ${primaryColor};
    svg {
      stroke: ${primaryColor};
    }
  }
`;
