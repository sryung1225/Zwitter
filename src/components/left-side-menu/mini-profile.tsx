import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { auth } from '@/firebase.ts';
import currentUserInfoAtom from '@atom/current-user.tsx';
import useEscClose from '@util/use-esc-close.tsx';
import * as S from '@style/mini-profile.ts';
import * as T from '@style/navigation.ts';
import * as P from '@style/popup.ts';
import { ReactComponent as IconLogout } from '@img/i-arrowleft.svg';

export default function MiniProfile() {
  const navigate = useNavigate();
  const setCurrentUserInfo = useSetRecoilState(currentUserInfoAtom);
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
      setCurrentUserInfo({
        userId: '',
        userAvatar: '',
        userName: '',
      });
      navigate('/auth');
    }
  };
  return (
    <S.MiniProfile>
      <T.Button onClick={toggleLogoutPopup}>
        <IconLogout /> 로그아웃
      </T.Button>
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
    </S.MiniProfile>
  );
}
