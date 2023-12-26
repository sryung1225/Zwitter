import * as W from '@style/window.ts';
import { ReactComponent as IconWindow1 } from '@img/i-window1.svg';
import { ReactComponent as IconWindow2 } from '@img/i-window2.svg';
import { ReactComponent as IconWindow3 } from '@img/i-window3.svg';

export default function WindowTop() {
  return (
    <W.TopBar>
      <W.IconWrapper>
        <IconWindow1 />
        <IconWindow2 />
        <IconWindow3 />
      </W.IconWrapper>
    </W.TopBar>
  );
}
