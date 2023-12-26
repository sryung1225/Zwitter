import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase.ts';
import * as S from '../styles/profile.ts';
import * as P from '../styles/popup.ts';
import { ReactComponent as IconUser } from '../assets/images/i-user.svg';
import EditProfileForm from './edit-profile-form.tsx';

export default function UserProfile() {
  const user = auth.currentUser;
  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const userDoc = await getDoc(doc(db, 'users', user?.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserAvatar(userData.userAvatar);
        setUserName(userData.userName);
      }
    };
    fetchUserData();
  }, []);
  const [editPopup, setEditPopup] = useState(false);
  const toggleEditPopup = () => {
    setEditPopup(!editPopup);
  };
  return (
    <S.Profile>
      <S.Avatar>
        {userAvatar ? (
          <S.AvatarImage
            src={userAvatar}
            alt="프로필 이미지"
            width="120"
            height="120"
          />
        ) : (
          <IconUser />
        )}
      </S.Avatar>
      <S.Name>{userName}</S.Name>
      <S.EditButton onClick={toggleEditPopup} type="button">
        프로필 수정
      </S.EditButton>
      {editPopup ? (
        <P.PopupWrapper>
          <P.Popup>
            <P.CloseButton onClick={toggleEditPopup} type="button" />
            <EditProfileForm
              userAvatar={userAvatar}
              userName={userName}
              onClose={toggleEditPopup}
            />
          </P.Popup>
        </P.PopupWrapper>
      ) : null}
    </S.Profile>
  );
}