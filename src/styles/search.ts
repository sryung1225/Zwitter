import { styled } from 'styled-components';
import { Input } from '@style/button.ts';
import { grayColor } from '@style/global.ts';

export const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px;
`;

export const FormInput = styled(Input)`
  padding-right: 50px;
`;

export const FormButton = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  bottom: 3px;
  height: 37px;
  width: 37px;
  background-color: transparent;
  border-radius: 50%;
  border: none;
  svg {
    stroke: ${grayColor};
  }
`;
