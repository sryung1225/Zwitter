import { Outlet } from 'react-router-dom';
import Menu from './menu.tsx';
import Wrapper from '../styles/layout.ts';

export default function Layout() {
  return (
    <Wrapper>
      <Menu />
      <Outlet />
    </Wrapper>
  );
}
