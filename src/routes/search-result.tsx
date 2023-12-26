import SearchTimeline from '@compo/search-result/search-timeline.tsx';
import WindowTop from '@compo/window-top.tsx';
import * as W from '@style/window.ts';

export default function SearchResult() {
  return (
    <W.Window>
      <WindowTop />
      <SearchTimeline />
    </W.Window>
  );
}
