import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase.ts';
import IComment from '@type/IComment.ts';
import * as S from '@style/comment-panel.ts';
import { ReactComponent as IconUser } from '@img/i-user.svg';

export default function Comment({ comment }: { comment: IComment }) {
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserAvatar = async () => {
      const userDoc = await getDoc(doc(db, 'users', comment.userId));
      const userData = userDoc.data();
      setUserAvatar(userData?.userAvatar || null);
    };
    fetchUserAvatar();
  }, [comment.userId]);
  return (
    <S.CommentItem>
      <S.CommentAvatar to={`/user?query=${comment.userId}`}>
        {userAvatar ? (
          <S.CommentAvatarImage
            src={userAvatar}
            alt={`${comment.userName}의 프로필 사진`}
            width="40"
            height="40"
          />
        ) : (
          <IconUser />
        )}
      </S.CommentAvatar>
      <S.Name to={`/user?query=${comment.userId}`}>{comment.userName}</S.Name>
      <S.Contents>{comment.contents}</S.Contents>
    </S.CommentItem>
  );
}
