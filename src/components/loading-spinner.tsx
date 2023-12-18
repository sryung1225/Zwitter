import Wrapper from '../styles/loading-spinner.ts';
import { ReactComponent as Spinner } from '../assets/images/loading-spinner.svg';

export default function LoadingSpinner() {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
}
