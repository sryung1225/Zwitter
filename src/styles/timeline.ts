import styled from 'styled-components';
import { primaryColor } from '@style/global.ts';

export const TimelineWrapper = styled.ul`
  display: block;
  margin-top: 10px;
  overflow-y: auto;
`;

export const Text = styled.p`
  margin: 20px 0;
  text-align: center;
  span {
    color: ${primaryColor};
    font-weight: 600;
  }
`;
