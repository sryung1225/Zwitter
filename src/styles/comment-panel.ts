import { styled } from 'styled-components';
import { Input, SolidButton } from '@style/button.ts';

export const CommentList = styled.ul`
  display: block;
  height: auto;
  padding: 0 10px;
  background-color: #ddd;
`;

export const CommentItem = styled.li`
  display: block;
`;

export const WriteForm = styled.form`
  display: flex;
`;

export const WriteInput = styled(Input)`
  flex-grow: 1;
`;

export const WriteButton = styled(SolidButton)`
  flex-shrink: 0;
  width: 78px;
  margin: 0 0 0 4px;
`;
