import styled from 'styled-components';
import { blackColor, grayColor, primaryColor, whiteColor } from '../App.ts';

export const Form = styled.form`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const TextArea = styled.textarea`
  width: calc(100% - 120px);
  padding: 20px;
  background: transparent;
  border: transparent;
  color: ${blackColor};
  font-size: 16px;
  resize: none;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: ${primaryColor};
  }
`;

export const AttachImagePreview = styled.img`
  position: absolute;
  top: 20px;
  right: 0;
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 20px;
`;

export const AttachImageDelete = styled.button`
  position: absolute;
  top: 10px;
  right: 105px;
  width: 25px;
  height: 25px;
  background-color: ${primaryColor};
  border: 2px solid ${whiteColor};
  border-radius: 50%;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 4px;
    width: 13px;
    height: 2px;
    background-color: ${whiteColor};
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(135deg);
  }
`;

export const AttachImageButton = styled.label`
  position: absolute;
  top: 20px;
  right: 0;
  width: 120px;
  height: 120px;
  border: 2px dashed ${grayColor};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.5s ease;
  svg {
    position: absolute;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    width: 30px;
    height: 30px;
    stroke: ${grayColor};
    transition: all 0.3s ease;
  }
  &:hover,
  &:active {
    border: 2px dashed ${primaryColor};
    svg {
      stroke: ${primaryColor};
    }
  }
`;

export const AttachImageInput = styled.input`
  display: none;
`;

export const SubmitButton = styled.button`
  padding: 10px 0px;
  background-color: ${primaryColor};
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 16px;
`;
