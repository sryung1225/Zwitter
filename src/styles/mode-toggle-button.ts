import { styled } from 'styled-components';

const ModeToggleButton = styled.button`
  z-index: 50;
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.background};
  box-shadow: 6px 6px ${({ theme }) => theme.colors.gray};
  svg {
    stroke: ${({ theme }) => theme.colors.background};
    fill: ${({ theme }) => theme.colors.background};
    width: 26px;
    height: 26px;
  }
`;

export default ModeToggleButton;
