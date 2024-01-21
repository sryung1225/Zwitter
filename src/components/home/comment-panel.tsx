import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase.ts';
import currentUserAtom from '@atom/current-user.tsx';
import IComment from '@type/IComment.ts';
import * as S from '@style/comment-panel.ts';
import { ReactComponent as LoadingSpinner } from '@img/loading-spinner-mini.svg';

interface ICommentPanel {
  comments: IComment[];
  id: string;
}

export default function CommentPanel({ comments, id }: ICommentPanel) {
  const currentUser = useRecoilValue(currentUserAtom);
  const [isLoading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
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
        user: currentUser.userId,
        contents: newComment,
      };
      await updateDoc(tweetDocRef, {
        comments: arrayUnion(newCommentObj),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setNewComment('');
    }
  };

  return (
    <>
      <S.CommentList>
        {comments.map((item) => (
          <S.CommentItem>
            <p>{item.user}</p>
            <p>{item.contents}</p>
          </S.CommentItem>
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
    </>
  );
}
