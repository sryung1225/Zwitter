import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 20px;
  width: 100%;
  max-width: 860px;
  height: 100%;
  padding: 50px 0px;
`;

export const HomeCenterWrapper = styled.div`
  position: relative;
`;

export const TimeLineWrapper = styled.ul`
  display: block;
  height: calc(100vh - 350px);
  margin-top: 250px;
  overflow-y: auto;
`;
