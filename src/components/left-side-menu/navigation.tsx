import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import currentUserAtom from '@atom/current-user.tsx';
import * as S from '@style/navigation.ts';
import ImageComputer from '@img/logo-small.png';
import { ReactComponent as IconUser } from '@img/i-user.svg';
import { ReactComponent as IconHome } from '@img/i-home.svg';

export default function Navigation() {
  const location = useLocation();
  const currentUser = useRecoilValue(currentUserAtom);
  return (
    <>
      <S.Logo>
        <S.LogoTitle>
          <span>Z</span>witter
        </S.LogoTitle>
        <S.LogoImage src={ImageComputer} alt="Zwitter" width="40" height="40" />
      </S.Logo>
      <S.MenuList>
        <S.MenuItem $isActive={location.pathname === '/'}>
          <Link to="/">
            <IconHome /> 홈
          </Link>
        </S.MenuItem>
        <S.MenuItem
          $isActive={location.search === `?query=${currentUser.userId}`}
        >
          <Link to={`/user?query=${currentUser.userId}`}>
            <IconUser /> 프로필
          </Link>
        </S.MenuItem>
      </S.MenuList>
    </>
  );
}
