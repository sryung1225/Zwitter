import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import LogoutPopup from '@compo/common/logout-popup.tsx';
import currentUserAtom from '@atom/current-user.tsx';
import useEscClose from '@hook/useEscClose.tsx';
import * as S from '@style/mini-profile.ts';
import { ReactComponent as IconUser } from '@img/i-user.svg';
import { ReactComponent as IconLogout } from '@img/i-arrowleft.svg';

export default function MiniProfile() {
  const currentUser = useRecoilValue(currentUserAtom);
  const [logoutPopup, setLogoutPopup] = useState(false);
  const toggleLogoutPopup = () => {
    setLogoutPopup(!logoutPopup);
  };
  useEscClose(() => setLogoutPopup(false));
  return (
    <>
      <S.MiniProfile>
        <S.Avatar>
          {currentUser.userAvatar ? (
            <S.AvatarImage
              src={currentUser.userAvatar}
              alt={`${currentUser.userName}의 프로필 사진`}
              width="50"
              height="50"
            />
          ) : (
            <IconUser />
          )}
        </S.Avatar>
        <S.Name>{currentUser.userName}</S.Name>
        <S.Logout type="button" onClick={toggleLogoutPopup}>
          <p className="a11yHidden">로그아웃</p>
          <IconLogout />
        </S.Logout>
      </S.MiniProfile>
      {logoutPopup ? (
        <LogoutPopup toggleLogoutPopup={toggleLogoutPopup} />
      ) : null}
    </>
  );
}
