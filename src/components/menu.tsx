import { Link, useNavigate } from 'react-router-dom';
import auth from '../firebase.ts';
import * as S from '../styles/components/menu.ts';
import { ReactComponent as IconUser } from '../assets/i-user.svg';
import { ReactComponent as IconHome } from '../assets/i-home.svg';
import { ReactComponent as IconLogout } from '../assets/i-arrowleft.svg';

export default function Menu() {
  const navigate = useNavigate();
  const onLogout = async () => {
    // eslint-disable-next-line no-restricted-globals
    const ok = confirm('로그아웃 하시겠습니까?');
    if (ok) {
      await auth.signOut();
      navigate('/login');
    }
  };
  return (
    <S.MenuList>
      <S.MenuItem>
        <Link to="/profile">
          <IconUser />
        </Link>
      </S.MenuItem>
      <S.MenuItem>
        <Link to="/">
          <IconHome />
        </Link>
      </S.MenuItem>
      <S.MenuItem onClick={onLogout} className="log-out">
        <IconLogout />
      </S.MenuItem>
    </S.MenuList>
  );
}
