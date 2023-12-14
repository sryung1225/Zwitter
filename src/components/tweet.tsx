import { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { auth, db, storage } from '../firebase.ts';
import ITweet from '../interfaces/ITweet.ts';
import FormattedDate from '../utils/formattedDate.tsx';
import * as S from '../styles/tweet.ts';
import * as P from '../styles/popup.ts';

export default function Tweet({
  id,
  userId,
  userName,
  createdAt,
  photo,
  tweet,
}: ITweet) {
  const user = auth.currentUser;
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
  return (
    <S.Wrapper hasPhoto={!!photo}>
      <S.Column>
        <S.Username>{userName}</S.Username>
        <S.Date>{FormattedDate(createdAt)}</S.Date>
        <S.Payload>{tweet}</S.Payload>
        {user?.uid === userId ? (
          <S.DeleteButton onClick={toggleDeletePopup}>삭제</S.DeleteButton>
        ) : null}
      </S.Column>
      {photo ? (
        <S.Column>
          <S.Photo src={photo} />
        </S.Column>
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
