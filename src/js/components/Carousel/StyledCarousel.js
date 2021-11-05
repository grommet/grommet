import styled, { css, keyframes } from 'styled-components';
import { Box } from '../Box';
import { Button } from '../Button';
import { widthStyle, heightStyle } from '../../utils';

const StyledCarouselContainer = styled(Box)`
  position: relative;
  ${(props) => props.heightProp && heightStyle(props.heightProp, props.theme)}
  ${(props) => props.widthProp && widthStyle(props.widthProp, props.theme)}
`;

const StyledCarouselChild = styled.div`
  ${(props) => (props.noContainer ? `` : `height: 100%; width: 100%;`)}
  position: ${(props) => (props.absolute ? 'absolute' : 'relative')};
  visibility: ${(props) => props.visibility};
  animation: ${(props) =>
    props.animation
      ? css`
          ${props.animation} 0.6s
        `
      : `none`};
`;

const StyledArrow = styled(Button)`
  z-index: 1;
  position: absolute;
  transition-timing-function: ease-in-out;
  padding: 0px 6px;
  ${(props) => props.next && `left: calc(100% - 36px);`}
  &:hover {
    transition: 0.3s;
  }
`;

// Slide Left = Previous or Backward
const slideRightPrevious = keyframes`
  0% {
    transform: translateX(0%);
    visibility: visible;
  }
  99% {visibility: visible}
  100% {transform: translateX(100%)}
`;

const slideRightCurrent = keyframes`
  0% {
    transform: translateX(-100%);
    visibility: visible;
  }
  99% {visibility: visible}
  100% {transform: translateX(0%)}
`;

// Slide Left = Next or Forward
const slideLeftPrevious = keyframes`
  0% {
    transform: translateX(0%);
    visibility: visible;
  }
  99% {visibility: visible}
  100% {transform: translateX(-100%)}
`;

const slideLeftCurrent = keyframes`
  0% {
    transform: translateX(100%);
    visibility: visible;
  }
  99% {visibility: visible}
  100% {transform: translateX(0%)}
  `;

export {
  StyledArrow,
  StyledCarouselContainer,
  StyledCarouselChild,
  slideLeftCurrent,
  slideLeftPrevious,
  slideRightCurrent,
  slideRightPrevious,
};
