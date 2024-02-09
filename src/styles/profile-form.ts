import React from 'react';
import styled from 'styled-components';
import { Input, SolidButton } from '@style/button.ts';
import { Avatar } from '@style/profile.ts';

export const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AttachAvatar = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
`;

export const AttachAvatarPreview = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
`;

export const AttachAvatarButton = styled.button`
  position: absolute;
  top: 0;
  width: 25px;
  height: 25px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.background};
  border-radius: 50%;
`;

export const AttachAvatarDelete = styled(AttachAvatarButton)`
  left: 10px;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 4px;
    width: 13px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.background};
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(135deg);
  }
`;

export const AttachAvatarChange: React.ComponentType<
  React.HTMLProps<HTMLLabelElement>
> = styled(AttachAvatarButton).attrs(() => ({ as: 'label' }))`
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    width: 15px;
    height: 15px;
    stroke: ${({ theme }) => theme.colors.background};
    stroke-width: 3px;
  }
`;

export const AttachAvatarLabel: React.ComponentType<
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
      stroke: ${({ theme }) => theme.colors.primary};
    }
    &::before {
      border: 2px dashed ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const AttachAvatarInput = styled.input`
  display: none;
`;

export const InputText = styled(Input)``;

export const SubmitButton = styled(SolidButton)``;
