import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/firebase.ts';
import Comment from '@compo/home/comment.tsx';
import currentUserAtom from '@atom/current-user.tsx';
import IComment from '@type/IComment.ts';
import useErrorMessage from '@hook/useErrorMessage.tsx';
import * as S from '@style/comment-panel.ts';
import ErrorAlarm from '@style/error-alarm.ts';
import { ReactComponent as LoadingSpinner } from '@img/loading-spinner-mini.svg';

interface ICommentPanel {
  comments: IComment[];
  id: string;
}

export default function CommentPanel({ comments, id }: ICommentPanel) {
  const currentUser = useRecoilValue(currentUserAtom);
  const [isLoading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { errorMessage, displayError } = useErrorMessage('');
  const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment === '') return;
    try {
      setLoading(true);
      const tweetDocRef = doc(db, 'tweets', id);
      const newCommentObj = {
        id: uuidv4(),
        userId: currentUser.userId,
        userName: currentUser.userName,
        contents: newComment,
      };
      await updateDoc(tweetDocRef, {
        comments: arrayUnion(newCommentObj),
      });
    } catch (error) {
      displayError(error);
    } finally {
      setLoading(false);
      setNewComment('');
    }
  };
  return (
    <>
      <S.CommentPanel>
        <S.CommentList>
          {comments.map((item) => (
            <Comment comment={item} key={item.id} />
          ))}
        </S.CommentList>
        <S.WriteForm onSubmit={onSubmit}>
          <S.WriteInput
            type="text"
            name="newComment"
            onChange={onCommentChange}
            value={newComment}
            placeholder="댓글을 입력해주세요"
          />
          <S.WriteButton type="submit">
            {isLoading ? <LoadingSpinner /> : '작성'}
          </S.WriteButton>
        </S.WriteForm>
      </S.CommentPanel>
      {errorMessage && <ErrorAlarm>{errorMessage}</ErrorAlarm>}
    </>
  );
}
