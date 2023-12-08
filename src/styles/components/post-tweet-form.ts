import styled from 'styled-components';
import { blackColor, primaryColor } from '../App.ts';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TextArea = styled.textarea`
  width: 100%;
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

export const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: ${primaryColor};
  text-align: center;
  border-radius: 20px;
  border: 1px solid ${primaryColor};
  font-size: 14px;
  cursor: pointer;
`;

export const AttachFileInput = styled.input`
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
