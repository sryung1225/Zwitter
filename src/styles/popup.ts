import { styled } from 'styled-components';
import {
  LogoTextShadow,
  blackColor,
  primaryColor,
  whiteColor,
} from '@style/global.ts';
import { SolidButton } from '@style/button.ts';

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

export const PopupBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 100px);
  padding: 50px 30px 30px 30px;
  background-color: ${whiteColor};
  border: 3px solid ${blackColor};
`;

export const Popup = styled(PopupBox)`
  max-width: 600px;
  max-height: calc(100vh - 100px);
  border-radius: 10px;
`;

export const MiniPopup = styled(PopupBox)`
  max-width: 400px;
  height: auto;
  border-radius: 6px;
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
  font-size: 34px;
  line-height: 40px;
  text-shadow: ${LogoTextShadow(2)};
  span {
    color: ${primaryColor};
  }
  img {
    display: inline-block;
    width: 40px;
    height: 40px;
    vertical-align: sub;
  }
`;

export const Title = styled.h3`
  margin: 40px 0;
  font-size: 30px;
`;

export const Text = styled.p`
  padding: 20px 0;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

export const Button = styled(SolidButton)``;
