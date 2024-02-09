import styled from 'styled-components';
import { rgba } from 'polished';

export const TimelineWrapper = styled.ul`
  display: block;
  margin-top: 10px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    margin: 1px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => rgba(theme.colors.gray, 0.3)};
    border-radius: 5px;
  }
`;

export const Text = styled.p`
  margin: 20px 0;
  text-align: center;
  span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;
