import { useRecoilState } from 'recoil';
import isDarkAtom from '@atom/is-dark.tsx';
import { ModeToggleButton } from '@style/floating-action-button.ts';
import { ReactComponent as IconSun } from '@img/i-sun.svg';
import { ReactComponent as IconMoon } from '@img/i-moon.svg';

export default function ModeToggle() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleMode = () => setIsDark((current) => !current);
  return (
    <ModeToggleButton type="button" onClick={toggleMode}>
      <p className="a11yHidden">테마 토글 버튼</p>
      {isDark ? <IconSun /> : <IconMoon />}
    </ModeToggleButton>
  );
}
