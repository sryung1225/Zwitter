import WindowTop from '@compo/window-top.tsx';
import MiniProfile from '@compo/left-side-menu/mini-profile.tsx';
import Navigation from '@compo/left-side-menu/navigation.tsx';
import * as S from '@style/window.ts';

export default function LeftSideMenu() {
  return (
    <S.Window as="nav">
      <WindowTop />
      <Navigation />
      <MiniProfile />
    </S.Window>
  );
}
