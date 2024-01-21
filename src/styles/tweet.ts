import { styled } from 'styled-components';
import { grayColor, primaryColor } from '@style/global.ts';
import { Link } from 'react-router-dom';
import { ReactComponent as IconHeart } from '@img/i-heart.svg';
import React from 'react';

export const Wrapper = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 60px;
  &:not(:last-child) {
    border-bottom: 1px dashed ${grayColor};
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled(Link)`
  position: absolute;
  top: 20px;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 36px;
    height: 36px;
    border: 2px dashed ${grayColor};
    border-radius: 50%;
  }
  svg {
    width: 26px;
    height: 26px;
    stroke: ${grayColor};
  }
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 10;
`;

export const Username = styled(Link)`
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
`;

export const Date = styled.span`
  color: ${grayColor};
  font-size: 10px;
`;

export const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

export const Photo = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 15px;
  object-fit: cover;
`;

export const WatchStats = styled.span`
  display: flex;
  align-items: center;
  width: 50px;
`;

export const StatsButton = styled.button`
  height: 30px;
  padding: 6px 6px 6px 0;
  background-color: transparent;
  border: none;
  svg {
    display: inline-block;
    width: 20px;
    height: 20px;
  }
`;

interface IStyledHeart extends React.SVGProps<SVGSVGElement> {
  $active: boolean;
}

export const StyledHeart = styled(IconHeart)<IStyledHeart>`
  fill: ${(props) => (props.$active ? primaryColor : 'transparent')};
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 16px;
  right: 20px;
  width: 25px;
  height: 25px;
  background-color: transparent;
  border: none;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 11px;
    left: 6px;
    width: 13px;
    height: 2px;
    background-color: ${primaryColor};
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(135deg);
  }
`;

export const EditButton = styled.button`
  position: absolute;
  top: 16px;
  right: 50px;
  width: 25px;
  height: 25px;
  background-color: transparent;
  border: none;
  svg {
    width: 16px;
    height: 16px;
    stroke: ${primaryColor};
    stroke-width: 2;
  }
`;
