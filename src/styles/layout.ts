import styled from 'styled-components';
import media from '@style/media.ts';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 4fr minmax(200px, 1fr);
  gap: 20px;
  width: calc(100% - 40px);
  height: calc(100vh - 40px);
  margin: 20px;
  ${media.semi} {
    grid-template-columns: minmax(200px, 1fr) 4fr;
  }
  ${media.tablet} {
    grid-template-columns: minmax(320px, 1fr);
  }
`;

export default Wrapper;
