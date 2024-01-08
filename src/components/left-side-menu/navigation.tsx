import { Link, useLocation } from 'react-router-dom';
import * as S from '@style/navigation.ts';
import ImageComputer from '@img/logo-small.png';
import { ReactComponent as IconUser } from '@img/i-user.svg';
import { ReactComponent as IconHome } from '@img/i-home.svg';

export default function Navigation() {
  const location = useLocation();
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
        <S.MenuItem $isActive={location.pathname === '/profile'}>
          <Link to="/profile">
            <IconUser /> 프로필
          </Link>
        </S.MenuItem>
      </S.MenuList>
    </>
  );
}
