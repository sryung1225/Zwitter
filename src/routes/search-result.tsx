import SearchTimeline from '../components/search-timeline.tsx';
import WindowTop from '../components/window-top.tsx';
import * as W from '../styles/window.ts';

export default function SearchResult() {
  return (
    <W.Window>
      <WindowTop />
      <SearchTimeline />
    </W.Window>
  );
}
