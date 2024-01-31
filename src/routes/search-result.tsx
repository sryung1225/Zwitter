import WindowTop from '@compo/common/window-top.tsx';
import SearchTimeline from '@compo/search-result/search-timeline.tsx';
import * as W from '@style/window.ts';

export default function SearchResult() {
  return (
    <W.Window>
      <WindowTop />
      <SearchTimeline />
    </W.Window>
  );
}
