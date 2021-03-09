import styled, { keyframes } from 'styled-components';

import { baseStyle, edgeStyle, roundStyle } from '../../utils/styles';
import { backgroundStyle } from '../../utils/background';
import { defaultProps } from '../../default-props';

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

  ${props =>
    !props.plain &&
    ((props.round && roundStyle(props.round, true, props.theme)) ||
      `border-radius: ${props.theme.global.drop.border.radius};`)}

  position: fixed;
  z-index: ${props => props.theme.global.drop.zIndex};
  outline: none;

  ${props =>
    !props.plain &&
    backgroundStyle(
      props.background || props.theme.global.drop.background,
      props.theme,
    )}

  ${props =>
    !props.plain &&
    (props.margin || props.theme.global.drop.margin) &&
    props.theme.global &&
    edgeStyle(
      'margin',
      props.margin || props.theme.global.drop.margin,
      props.responsive,
      props.theme.global.edgeSize.responsiveBreakpoint,
      props.theme,
    )}

  opacity: 0;
  transform-origin: ${props => getTransformOriginStyle(props.alignProp)};
  animation: ${dropKeyFrames} 0.1s forwards;
  animation-delay: 0.01s;

  /* IE11 hack to get drop contents to not overflow */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    display: flex;
    align-items: stretch;
  }

  ${props => props.theme.global.drop && props.theme.global.drop.extend}
`;

StyledDrop.defaultProps = {};
Object.setPrototypeOf(StyledDrop.defaultProps, defaultProps);

export { StyledDrop };
