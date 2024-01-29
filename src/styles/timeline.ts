import styled from 'styled-components';
import theme from '@style/theme.ts';

export const TimelineWrapper = styled.ul`
  display: block;
  margin-top: 10px;
  overflow-y: auto;
`;

export const Text = styled.p`
  margin: 20px 0;
  text-align: center;
  span {
    color: ${theme.colors.primary};
    font-weight: 600;
  }
`;
