import { Outlet } from 'react-router-dom';
import Wrapper from '../styles/layout.ts';
import Menu from './menu.tsx';
import Search from './search.tsx';

export default function Layout() {
  return (
    <Wrapper>
      <Menu />
      <Outlet />
      <Search />
    </Wrapper>
  );
}
