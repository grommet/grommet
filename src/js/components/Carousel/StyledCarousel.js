import styled, { css, keyframes } from 'styled-components';
import { Box } from '../Box';

const StyledCarouselContainer = styled(Box)`
  position: relative;
  overflow: hidden;
`;

const animationKeyframes = {
  // Slide Right = Previous or Backward
  slideRightPrevious: keyframes`
    0% {transform: translateX(0%)}
    100% {transform: translateX(100%)}
  `,
  slideRightCurrent: keyframes`
    0% {transform: translateX(-100%)}
    100% {transform: translateX(0%)}
  `,
  // Slide Left = Next or Forward
  slideLeftPrevious: keyframes`
    0% {transform: translateX(0%)}
    100% {transform: translateX(-100%)}
  `,
  slideLeftCurrent: keyframes`
    0% {transform: translateX(100%)}
    100% {transform: translateX(0%)}
  `,
};

const StyledCarouselChild = styled(Box)`
  visibility: ${(props) => props.visibilityProp};
  position: ${(props) => props.positionProp};
  width: 100%;
  height: 100%;
  overflow: hidden;
  ${(props) =>
    props.animationType
      ? css`
          animation: ${animationKeyframes[props.animationType]}
            ${props.animationDuration / 1000}s ease-in-out;
        `
      : ``};
  animation-fill-mode: both;
`;

const StyledControl = styled(Box)`
  position: absolute;
  z-index: 1;
  ${(props) => `${props.offsetProp}: 0;`}
  align-items: center;
  justify-content: center;
`;

export { StyledCarouselContainer, StyledCarouselChild, StyledControl };
