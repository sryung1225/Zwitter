import { styled } from 'styled-components';
import { grayColor } from './App.ts';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export const AvatarUpload = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;
  svg {
    width: 40px;
    stroke: ${grayColor};
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 116px;
    height: 116px;
    border: 2px dashed ${grayColor};
    border-radius: 50%;
  }
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 10;
`;

export const AvatarInput = styled.input`
  display: none;
`;

export const Name = styled.h2`
  font-size: 30px;
`;
