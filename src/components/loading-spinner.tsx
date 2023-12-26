import Wrapper from '@style/loading-spinner.ts';
import { ReactComponent as Spinner } from '@img/loading-spinner.svg';

export default function LoadingSpinner() {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
}
