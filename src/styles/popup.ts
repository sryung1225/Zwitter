import { styled } from 'styled-components';
import { grayColor, primaryColor, whiteColor } from './App.ts';

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
  width: 757px;
  height: 728px;
  background-color: ${whiteColor};
  border-radius: 10px;
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
