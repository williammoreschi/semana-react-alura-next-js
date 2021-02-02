import styled, { keyframes } from 'styled-components';

const animationKeyFrame = keyframes`
  0% {
    top: 40px;
    left: 40px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 80px;
    height: 80px;
    opacity: 0;
  }
`;
const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  &::before,
  &::after {
    content:" ";
    position: absolute;
    border: 4px solid ${({ theme }) => theme.colors.primary};
    opacity: 1;
    border-radius: 50%;
    animation: ${animationKeyFrame} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  &::before {
    animation-delay: -0.8s;
  }

`;

export default function Loading() {
  return (
    <Container />
  );
}
