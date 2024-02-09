import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LeftSideMenu from '@compo/left-side-menu.tsx';
import RightSideMenu from '@compo/right-side-menu.tsx';
import NavToggle from '@compo/common/nav-toggle.tsx';
import SCREEN_SIZE from '@const/screen-size.tsx';
import Wrapper from '@style/layout.ts';

export default function Layout() {
  const [isShowLeftSide, setIsShowLeftSide] = useState(
    window.innerWidth > SCREEN_SIZE.tablet,
  );
  const [isShowRightSide, setIsShowRightSide] = useState(
    window.innerWidth > SCREEN_SIZE.semi,
  );
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsShowLeftSide(width > SCREEN_SIZE.tablet);
      setIsShowRightSide(width > SCREEN_SIZE.semi);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Wrapper>
      {isShowLeftSide ? <LeftSideMenu /> : <NavToggle />}
      <Outlet />
      {isShowRightSide && <RightSideMenu />}
    </Wrapper>
  );
}
