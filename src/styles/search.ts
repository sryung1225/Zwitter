import { styled } from 'styled-components';
import { Input } from './button.ts';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px;
`;

export const FormInput = styled(Input)``;
