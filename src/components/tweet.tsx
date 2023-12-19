import { useEffect, useState } from 'react';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { auth, db, storage } from '../firebase.ts';
import ITweet from '../interfaces/ITweet.ts';
import FormattedDate from '../utils/formatted-date.tsx';
import EditTweetForm from './edit-tweet-form.tsx';
import * as S from '../styles/tweet.ts';
import * as P from '../styles/popup.ts';
import { ReactComponent as IconUser } from '../assets/images/i-user.svg';
import { ReactComponent as IconEdit } from '../assets/images/i-edit.svg';

export default function Tweet({
  id,
  userId,
  userName,
  createdAt,
  photo,
  tweet,
}: ITweet) {
  const user = auth.currentUser;
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const fetchUserAvatar = async () => {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    setUserAvatar(userData?.userAvatar || null);
  };
  const [editPopup, setEditPopup] = useState(false);
  const toggleEditPopup = () => {
    setEditPopup(!editPopup);
  };
  const [deletePopup, setDeletePopup] = useState(false);
  const toggleDeletePopup = () => {
    setDeletePopup(!deletePopup);
  };
  const onDelete = async () => {
    if (user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, 'tweets', id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };
  useEffect(() => {
    fetchUserAvatar();
  }, [userName, userAvatar]);
  return (
    <S.Wrapper>
      <S.Avatar>
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
        <S.Username>{userName}</S.Username>
        <S.Date>{FormattedDate(createdAt)}</S.Date>
      </S.Row>
      <S.Payload>{tweet}</S.Payload>
      {photo ? (
        <S.Photo src={photo} alt={tweet} width="300" height="300" />
      ) : null}
      {user?.uid === userId ? (
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
              onClose={() => setEditPopup(false)}
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
