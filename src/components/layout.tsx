import { Outlet } from 'react-router-dom';
import Wrapper from '@style/layout.ts';
import LeftSideMenu from '@compo/left-side-menu.tsx';
import RightSideMenu from '@compo/right-side-menu.tsx';

export default function Layout() {
  return (
    <Wrapper>
      <LeftSideMenu />
      <Outlet />
      <RightSideMenu />
    </Wrapper>
  );
}
