import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
`;

const ErrorAlarm = styled.p`
  z-index: 200;
  position: fixed;
  top: 10vh;
  left: 50vw;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 6px 6px ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  text-align: center;
  animation:
    ${fadeIn} 0.5s ease-out,
    ${fadeOut} 0.5s ease-out 2.5s;
`;

export default ErrorAlarm;
