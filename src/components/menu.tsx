import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase.ts';
import WindowTop from '@compo/window-top.tsx';
import * as W from '@style/window.ts';
import * as S from '@style/menu.ts';
import * as P from '@style/popup.ts';
import ImageComputer from '@img/logo-small.png';
import { ReactComponent as IconUser } from '@img/i-user.svg';
import { ReactComponent as IconHome } from '@img/i-home.svg';
import { ReactComponent as IconLogout } from '@img/i-arrowleft.svg';

export default function Menu() {
  const navigate = useNavigate();
  const [logoutPopup, setLogoutPopup] = useState(false);
  const toggleLogoutPopup = () => {
    setLogoutPopup(!logoutPopup);
  };
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLogoutPopup(false);
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [logoutPopup]);
  const onLogout = async () => {
    await auth.signOut();
    navigate('/auth');
  };
  return (
    <W.Window as="nav">
      <WindowTop />
      <S.Logo>
        <S.LogoTitle>
          <span>Z</span>witter
        </S.LogoTitle>
        <S.LogoImage src={ImageComputer} alt="Zwitter" width="40" height="40" />
      </S.Logo>
      <S.MenuList>
        <S.MenuItem>
          <Link to="/">
            <IconHome /> 홈
          </Link>
        </S.MenuItem>
        <S.MenuItem>
          <Link to="/profile">
            <IconUser /> 프로필
          </Link>
        </S.MenuItem>
        <S.MenuItem>
          <S.Button onClick={toggleLogoutPopup}>
            <IconLogout /> 로그아웃
          </S.Button>
        </S.MenuItem>
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
      </S.MenuList>
    </W.Window>
  );
}
