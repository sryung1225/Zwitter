import { useRecoilState } from 'recoil';
import isDarkAtom from '@atom/is-dark.tsx';
import ModeToggleButton from '@style/mode-toggle-button.ts';
import { ReactComponent as IconSun } from '@img/i-sun.svg';
import { ReactComponent as IconMoon } from '@img/i-moon.svg';

export default function ModeToggle() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleMode = () => setIsDark((current) => !current);
  return (
    <ModeToggleButton onClick={toggleMode}>
      {isDark ? <IconSun /> : <IconMoon />}
    </ModeToggleButton>
  );
}
