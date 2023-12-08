import { styled } from 'styled-components';
import { grayColor } from '../App.ts';

interface IWrapperProps {
  hasPhoto: boolean;
}

export const Wrapper = styled.div<IWrapperProps>`
  display: grid;
  grid-template-columns: ${({ hasPhoto }) => (hasPhoto ? '3fr 1fr' : '1fr')};
  padding: 20px;
`;

export const Column = styled.div``;

export const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

export const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

export const Date = styled.span`
  margin-left: 10px;
  color: ${grayColor};
  font-size: 10px;
`;

export const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;
