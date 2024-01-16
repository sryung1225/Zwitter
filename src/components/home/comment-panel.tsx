import React, { useState } from 'react';
import IComment from '@type/IComment.ts';
import * as S from '@style/comment-panel.ts';

export default function CommentPanel({ comments }: { comments: IComment[] }) {
  const [newComment, setNewComment] = useState('');
  const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  return (
    <S.Panel>
      {comments.map((item) => (
        <li>
          <p>{item.userId}</p>
          <p>{item.context}</p>
        </li>
      ))}
      <input
        type="text"
        name="newComment"
        onChange={onCommentChange}
        value={newComment}
        placeholder="댓글을 입력해주세요"
      />
    </S.Panel>
  );
}
