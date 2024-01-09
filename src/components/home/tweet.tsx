import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '@/firebase.ts';
import currentUserAtom from '@atom/current-user.tsx';
import ITweet from '@type/ITweet.ts';
import FormatDate from '@util/format-date.tsx';
import useEscClose from '@util/use-esc-close.tsx';
import ScrollTop from '@util/scroll-top.tsx';
import EditTweetForm from '@compo/home/edit-tweet-form.tsx';
import * as S from '@style/tweet.ts';
import * as P from '@style/popup.ts';
import { ReactComponent as IconUser } from '@img/i-user.svg';
import { ReactComponent as IconEdit } from '@img/i-edit.svg';

export default function Tweet({
  id,
  userId,
  userName,
  createdAt,
  photo,
  tweet,
}: ITweet) {
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [editPopup, setEditPopup] = useState(false);
  const currentUser = useRecoilValue(currentUserAtom);
  const toggleEditPopup = () => {
    setEditPopup(!editPopup);
  };
  const [deletePopup, setDeletePopup] = useState(false);
  const toggleDeletePopup = () => {
    setDeletePopup(!deletePopup);
  };
  const onDelete = async () => {
    if (currentUser.userId !== userId) return;
    try {
      await deleteDoc(doc(db, 'tweets', id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${currentUser.userId}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      ScrollTop('timeline');
    }
  };
  useEscClose(() => setDeletePopup(false));
  useEffect(() => {
    const fetchUserAvatar = async () => {
      const userDoc = await getDoc(doc(db, 'users', userId));
      const userData = userDoc.data();
      setUserAvatar(userData?.userAvatar || null);
    };
    fetchUserAvatar();
  }, [userId]);
  return (
    <S.Wrapper>
      <S.Avatar to={`/user?query=${userId}`}>
        {userAvatar ? (
          <S.AvatarImage
            src={userAvatar}
            alt={userName}
            width="40"
            height="40"
          />
        ) : (
          <IconUser />
        )}
      </S.Avatar>
      <S.Row>
        <S.Username to={`/user?query=${userId}`}>{userName}</S.Username>
        <S.Date>{FormatDate(createdAt)}</S.Date>
      </S.Row>
      <S.Payload>{tweet}</S.Payload>
      {photo ? (
        <S.Photo src={photo} alt={tweet} width="300" height="300" />
      ) : null}
      {currentUser.userId === userId ? (
        <>
          <S.EditButton onClick={toggleEditPopup} type="button">
            <span className="a11yHidden">포스팅 수정하기</span>
            <IconEdit />
          </S.EditButton>
          <S.DeleteButton onClick={toggleDeletePopup} type="button">
            <span className="a11yHidden">포스팅 삭제하기</span>
          </S.DeleteButton>
        </>
      ) : null}
      {editPopup ? (
        <P.PopupWrapper>
          <P.Popup>
            <P.CloseButton onClick={toggleEditPopup} type="button" />
            <EditTweetForm
              id={id}
              tweet={tweet}
              photo={photo}
              onClose={toggleEditPopup}
            />
          </P.Popup>
        </P.PopupWrapper>
      ) : null}
      {deletePopup ? (
        <P.PopupWrapper>
          <P.MiniPopup>
            <P.Text>포스트를 삭제하시겠습니까?</P.Text>
            <P.ButtonWrapper>
              <P.Button onClick={onDelete} type="button">
                예
              </P.Button>
              <P.Button onClick={toggleDeletePopup} type="button">
                아니요
              </P.Button>
            </P.ButtonWrapper>
          </P.MiniPopup>
        </P.PopupWrapper>
      ) : null}
    </S.Wrapper>
  );
}
