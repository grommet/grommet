import styled, { css, keyframes } from 'styled-components';
import { Box } from '../Box';
import { widthStyle, heightStyle } from '../../utils';

const StyledCarouselContainer = styled(Box)`
  position: relative;
  display: block;
  overflow: hidden;
  height: 100%;
  ${(props) => props.height && heightStyle(props.height, props.theme)}
  ${(props) => props.width && widthStyle(props.width, props.theme)}
  ${(props) => props.containerHeight && `height: ${props.containerHeight}px`};
  ${(props) => props.containerWidth && `width: ${props.containerWidth}px`};
`;

const StyledCarouselChild = styled.div`
  position: relative;
  max-width: 100%;
  ${(props) =>
    !props.noDimensions &&
    css`
      width: 100%;
      height: 100%;
    `}
  float: left;
  margin-right: -100%;
  display: ${(props) => props.displayProp};
  animation: ${(props) =>
    props.animation
      ? css`
          ${props.animation}
          ${props.animationDuration / 1000}s
        ease-in-out
        `
      : `none`};
`;

const StyledControl = styled(Box)`
  position: absolute;
  z-index: 1;
  ${(props) => `${props.offsetProp}: 0;`}
  align-items: center;
  justify-content: center;
`;

// Slide Right = Previous or Backward
const slideRightPrevious = keyframes`
  0% {transform: translateX(0%)}
  100% {transform: translateX(100%)}
`;

const slideRightCurrent = keyframes`
  0% {transform: translateX(-100%)}
  100% {transform: translateX(0%)}
`;

// Slide Left = Next or Forward
const slideLeftPrevious = keyframes`
  0% {transform: translateX(0%)}
  100% {transform: translateX(-100%)}
`;

const slideLeftCurrent = keyframes`
  0% {transform: translateX(100%)}
  100% {transform: translateX(0%)}
  `;

export {
  StyledControl,
  StyledCarouselContainer,
  StyledCarouselChild,
  slideLeftCurrent,
  slideLeftPrevious,
  slideRightCurrent,
  slideRightPrevious,
};
