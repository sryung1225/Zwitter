import styled from 'styled-components';
import { primaryColor } from '@style/global.ts';

export const MiniProfile = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 70px;
  margin-top: auto;
  border: 2px solid transparent;
  border-radius: 45px;
  transition: 0.5s ease-in;
  &:hover,
  &:active {
    border: 2px solid ${primaryColor};
  }
`;

export const Avatar = styled.img`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Name = styled.p`
  flex-grow: 1;
  font-size: 16px;
  line-height: 25px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Logout = styled.button`
  flex-shrink: 0;
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  padding: 0;
  background-color: transparent;
  border: 0;
  svg {
    size: 20px;
    stroke: ${primaryColor};
  }
`;
