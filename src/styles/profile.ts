import { styled } from 'styled-components';
import { grayColor } from '@style/global.ts';
import { LineButton } from '@style/button.ts';

export const Profile = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 50px 0 60px;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -10px;
    right: -10px;
    width: calc(100% + 20px);
    height: 2px;
    background-color: #070707;
  }
`;

export const Avatar = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
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

export const Name = styled.h2`
  font-size: 30px;
`;

export const EditButton = styled(LineButton)`
  width: auto;
  margin: 0;
`;
