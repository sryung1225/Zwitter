import styled from 'styled-components';
import theme from '@style/theme.ts';
import { SolidButton } from '@style/button.ts';

export const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 10px;
  width: 100%;
`;

export const PostForm = styled(Form)`
  padding-bottom: 10px;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -10px;
    right: -10px;
    width: calc(100% + 20px);
    height: 2px;
    background-color: ${theme.colors.black};
  }
`;

export const EditForm = styled(Form)``;

export const TextArea = styled.textarea`
  width: calc(100% - 120px);
  padding: 20px;
  background: transparent;
  border: transparent;
  color: ${theme.colors.black};
  font-size: 16px;
  resize: none;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
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
  background-color: ${theme.colors.primary};
  border: 2px solid ${theme.colors.white};
  border-radius: 50%;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 4px;
    width: 13px;
    height: 2px;
    background-color: ${theme.colors.white};
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
  border: 2px dashed ${theme.colors.gray};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.5s ease;
  svg {
    position: absolute;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    width: 30px;
    height: 30px;
    stroke: ${theme.colors.gray};
    transition: all 0.5s ease;
  }
  &:hover,
  &:active {
    border: 2px dashed ${theme.colors.primary};
    svg {
      stroke: ${theme.colors.primary};
    }
  }
`;

export const AttachImageInput = styled.input`
  display: none;
`;

export const SubmitButton = styled(SolidButton)``;
