import * as W from '../styles/window.ts';
import { ReactComponent as IconWindow1 } from '../assets/images/i-window1.svg';
import { ReactComponent as IconWindow2 } from '../assets/images/i-window2.svg';
import { ReactComponent as IconWindow3 } from '../assets/images/i-window3.svg';

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
