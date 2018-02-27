import styled, { keyframes } from 'styled-components';

import { backgroundStyle, baseStyle } from '../../utils';

function getTransformOriginStyle(align) {
  let vertical = 'top';
  if (align.bottom) {
    vertical = 'bottom';
  }
  let horizontal = 'left';
  if (align.right) {
    horizontal = 'right';
  }
  return `${vertical} ${horizontal}`;
}

const dropKeyFrames = keyframes`
  0% {
    opacity: 0.5;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledDrop = styled.div`
  ${baseStyle}

  border-radius: ${props => props.theme.global.drop.border.radius};
  box-shadow: ${props => props.theme.global.drop.shadow};
  position: fixed;
  z-index: 20;

  overflow: auto;
  outline: none;

  ${props => backgroundStyle(
    props.theme.global.drop.backgroundColor, props.theme
  )}

  opacity: 0;
  transform-origin: ${props => getTransformOriginStyle(props.align)};
  animation:  ${dropKeyFrames} 0.1s forwards;
  animation-delay: 0.01s;
`;

export default StyledDrop.extend`
  ${props => props.theme.drop && props.theme.drop.extend}
`;
