import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { blackColor, whiteColor } from '@style/global.ts';
import { Input, SolidButton } from '@style/button.ts';
import { Avatar, AvatarImage } from '@style/tweet.ts';

export const CommentPanel = styled.div`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid ${blackColor};
  border-radius: 20px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 62px;
    width: 10px;
    height: 10px;
    background-color: ${whiteColor};
    border-top: 1px solid ${blackColor};
    border-left: 1px solid ${blackColor};
    transform: rotate(45deg);
  }
`;

export const CommentList = styled.ul`
  display: block;
`;

export const CommentItem = styled.li`
  position: relative;
  padding: 10px 0px 10px 60px;
`;

export const CommentAvatar = styled(Avatar)`
  top: 10px;
`;

export const CommentAvatarImage = styled(AvatarImage)``;

export const Name = styled(Link)`
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
`;

export const Contents = styled.p`
  margin: 10px 0px;
  font-size: 16px;
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
