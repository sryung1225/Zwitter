import { styled } from 'styled-components';
import { blackColor, grayColor, primaryColor, whiteColor } from './App.ts';

export const PopupWrapper = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Popup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 100px);
  max-width: 757px;
  height: 728px;
  padding: 30px;
  background-color: ${whiteColor};
  border-radius: 10px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 25px;
  height: 25px;
  padding: 0;
  background-color: transparent;
  border: none;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 12px;
    display: block;
    width: 25px;
    height: 2px;
    background-color: ${blackColor};
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(135deg);
  }
`;

export const Logo = styled.h2`
  color: ${whiteColor};
  font-size: 40px;
  line-height: 48px;
  text-shadow:
    -2px 0px ${blackColor},
    0px 2px ${blackColor},
    2px 0px ${blackColor},
    0px -2px ${blackColor};
  span {
    color: ${primaryColor};
  }
  img {
    display: inline-block;
    width: 48px;
    height: 48px;
    vertical-align: sub;
  }
`;

export const Title = styled.h3`
  margin: 40px 0;
  font-size: 30px;
`;

export const Text = styled.p`
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  line-height: 30px;
  padding: 20px 0;
`;

export const Button = styled.button`
  display: block;
  border: none;
  border-top: 1px solid ${grayColor};
  background-color: white;
  text-align: center;
  color: ${primaryColor};
  width: 100%;
  line-height: 30px;
  font-weight: 700;
  margin-bottom: 10px;
  padding-top: 10px;
`;
