import { Outlet } from 'react-router-dom';
import Wrapper from '@style/layout.ts';
import Menu from '@compo/menu.tsx';
import Search from '@compo/search.tsx';

export default function Layout() {
  return (
    <Wrapper>
      <Menu />
      <Outlet />
      <Search />
    </Wrapper>
  );
}
