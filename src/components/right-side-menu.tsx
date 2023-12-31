import WindowTop from '@compo/window-top.tsx';
import SearchKeyword from '@compo/right-side-menu/search-keyword.tsx';
import * as S from '@style/window.ts';

export default function RightSideMenu() {
  return (
    <S.Window>
      <WindowTop />
      <SearchKeyword />
    </S.Window>
  );
}
