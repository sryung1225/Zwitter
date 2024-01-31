import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import currentUserAtom from '@atom/current-user.tsx';
import useEscClose from '@hook/useEscClose.tsx';
import SearchKeyword from '@compo/right-side-menu/search-keyword.tsx';
import LogoutPopup from '@compo/logout-popup.tsx';
import { NavToggleButton } from '@style/floating-action-button.ts';
import * as S from '@style/navigation-full.ts';
import ImageComputer from '@img/logo-small.png';
import { ReactComponent as IconNav } from '@img/i-nav.svg';

export default function NavToggle() {
  const currentUser = useRecoilValue(currentUserAtom);
  const [openNav, setOpenNav] = useState(false);
  const [openNavAni, setOpenNavAni] = useState(false);
  const [logoutPopup, setLogoutPopup] = useState(false);
  const toggleLogoutPopup = () => {
    setLogoutPopup(!logoutPopup);
  };
  const toggleNav = () => {
    if (openNav) {
      setOpenNavAni(false);
      setTimeout(() => {
        setOpenNav(false);
      }, 450);
    } else {
      setOpenNav(true);
      setOpenNavAni(true);
    }
  };
  useEscClose(toggleNav);
  return (
    <>
      <NavToggleButton type="button" onClick={toggleNav}>
        <p className="a11yHidden">테마 토글 버튼</p>
        <IconNav />
      </NavToggleButton>
      {openNav && (
        <S.NavigationWrapper $isActive={openNavAni}>
          <S.CloseButton onClick={toggleNav} type="button" />
          <S.LogoTitle as="h2">
            <span>Z</span>witter
          </S.LogoTitle>
          <S.LogoImage
            src={ImageComputer}
            alt="Zwitter"
            width="40"
            height="40"
          />
          <S.MenuList>
            <S.MenuItem>
              <Link to="/" onClick={toggleNav}>
                홈
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <Link
                to={`/user?query=${currentUser.userId}`}
                onClick={toggleNav}
              >
                프로필
              </Link>
            </S.MenuItem>
            <S.MenuItem>
              <button type="button" onClick={toggleLogoutPopup}>
                로그아웃
              </button>
            </S.MenuItem>
          </S.MenuList>
          <SearchKeyword onSearchSubmit={toggleNav} />
        </S.NavigationWrapper>
      )}
      {logoutPopup ? (
        <LogoutPopup toggleLogoutPopup={toggleLogoutPopup} />
      ) : null}
    </>
  );
}
