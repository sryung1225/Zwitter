import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import currentUserAtom from '@atom/current-user.tsx';
import IUser from '@type/IUser.ts';
import EditProfileForm from '@compo/profile/edit-profile-form.tsx';
import * as S from '@style/profile.ts';
import * as P from '@style/popup.ts';
import { ReactComponent as IconUser } from '@img/i-user.svg';

interface IUserProfile {
  user: IUser;
}

export default function UserProfile({ user }: IUserProfile) {
  const [editPopup, setEditPopup] = useState(false);
  const currentUser = useRecoilValue(currentUserAtom);
  const toggleEditPopup = () => {
    setEditPopup(!editPopup);
  };
  return (
    <S.Profile>
      <S.Avatar>
        {user.userAvatar ? (
          <S.AvatarImage
            src={user.userAvatar}
            alt={`${user.userName}의 프로필 사진`}
            width="120"
            height="120"
          />
        ) : (
          <IconUser />
        )}
      </S.Avatar>
      <S.Name>{user.userName}</S.Name>
      {user.userId === currentUser.userId && (
        <>
          <S.EditButton onClick={toggleEditPopup} type="button">
            프로필 수정
          </S.EditButton>
          {editPopup && (
            <P.PopupWrapper>
              <P.Popup>
                <P.CloseButton onClick={toggleEditPopup} type="button" />
                <EditProfileForm onClose={toggleEditPopup} />
              </P.Popup>
            </P.PopupWrapper>
          )}
        </>
      )}
    </S.Profile>
  );
}
