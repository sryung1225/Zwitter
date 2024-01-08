import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { auth } from '@/firebase.ts';
import currentUserAtom from '@atom/current-user.tsx';
import useEscClose from '@util/use-esc-close.tsx';
import * as S from '@style/mini-profile.ts';
import * as P from '@style/popup.ts';
import { ReactComponent as IconUser } from '@img/i-user.svg';
import { ReactComponent as IconLogout } from '@img/i-arrowleft.svg';

export default function MiniProfile() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const [logoutPopup, setLogoutPopup] = useState(false);
  const toggleLogoutPopup = () => {
    setLogoutPopup(!logoutPopup);
  };
  useEscClose(() => setLogoutPopup(false));
  const onLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error during sign out:', error);
    } finally {
      setCurrentUser({
        userId: '',
        userAvatar: '',
        userName: '',
      });
      navigate('/auth');
    }
  };
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
        <P.PopupWrapper>
          <P.MiniPopup>
            <P.Text>로그아웃 하시겠습니까?</P.Text>
            <P.ButtonWrapper>
              <P.Button onClick={onLogout} type="button">
                예
              </P.Button>
              <P.Button onClick={toggleLogoutPopup} type="button">
                아니요
              </P.Button>
            </P.ButtonWrapper>
          </P.MiniPopup>
        </P.PopupWrapper>
      ) : null}
    </>
  );
}
