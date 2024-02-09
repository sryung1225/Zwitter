import WindowTop from '@compo/common/window-top.tsx';
import SearchKeyword from '@compo/common/search-keyword.tsx';
import * as S from '@style/window.ts';

export default function RightSideMenu() {
  return (
    <S.Window className="side-menu right">
      <WindowTop />
      <SearchKeyword />
    </S.Window>
  );
}
