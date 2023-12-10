import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { auth, db, storage } from '../firebase.ts';
import { ITweet } from './timeline.tsx';
import FormattedDate from '../utils/formattedDate.tsx';
import * as S from '../styles/components/tweet.ts';

export default function Tweet({
  id,
  userId,
  userName,
  createdAt,
  photo,
  tweet,
}: ITweet) {
  const user = auth.currentUser;
  const onDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm('정말로 포스트를 삭제하겠습니까?');
    if (!ok || user?.uid !== userId) return;
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
          <S.DeleteButton onClick={onDelete}>삭제</S.DeleteButton>
        ) : null}
      </S.Column>
      {photo ? (
        <S.Column>
          <S.Photo src={photo} />
        </S.Column>
      ) : null}
    </S.Wrapper>
  );
}
