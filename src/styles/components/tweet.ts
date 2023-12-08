import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
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

export const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;
