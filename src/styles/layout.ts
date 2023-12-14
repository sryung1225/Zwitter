import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 1fr) 4fr minmax(200px, 1fr);
  gap: 20px;
  width: calc(100% - 40px);
  height: calc(100vh - 40px);
  margin: 20px;
`;

export default Wrapper;
