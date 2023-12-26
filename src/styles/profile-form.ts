import React from 'react';
import { styled } from 'styled-components';
import { primaryColor, whiteColor } from './global.ts';
import { Input, SolidButton } from './button.ts';
import { Avatar } from './profile.ts';

export const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AttachAvatarPreview = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
  object-fit: cover;
  border-radius: 50%;
`;

export const AttachAvatarDelete = styled.button`
  position: absolute;
  top: 0;
  right: 70px;
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

export const AttachAvatarButton: React.ComponentType<
  React.HTMLProps<HTMLLabelElement>
> = styled(Avatar).attrs(() => ({
  as: 'label',
}))`
  margin-bottom: 20px;
  cursor: pointer;
  svg,
  &::before {
    transition: all 0.5s ease;
  }
  &:hover,
  &:active {
    svg {
      stroke: ${primaryColor};
    }
    &::before {
      border: 2px dashed ${primaryColor};
    }
  }
`;

export const AttachAvatarInput = styled.input`
  display: none;
`;

export const InputText = styled(Input)``;

export const SubmitButton = styled(SolidButton)``;
