import styled, { css, keyframes } from 'styled-components';

import { baseStyle } from '../../utils';
import { backgroundStyle } from '../../utils/background';
import { defaultProps } from '../../default-props';
import { Box } from '../Box';

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

const StyledDrop = styled(Box)`
  ${baseStyle}

  border-radius: ${props => props.theme.global.drop.border.radius};
  position: fixed;
  z-index: ${props => props.theme.global.drop.zIndex};
  outline: none;
  overflow: visible;

  ${props =>
    !props.plain &&
    backgroundStyle(props.theme.global.drop.background, props.theme)}

  opacity: 0;
  transform-origin: ${props => getTransformOriginStyle(props.alignProp)};
  animation:  ${dropKeyFrames} 0.1s forwards;
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

const placement = ({ side, width, height }) => {
  if (side === 'top')
    return css`top: -${height}px; left: calc(50% - ${width / 2}px);`;
  if (side === 'left')
    return css`top: calc(50% - ${height / 2}px); left: -${width}px;`;
  if (side === 'right')
    return css`top: calc(50% - ${height / 2}px); right: -${width}px;`;
  if (side === 'bottom')
    return css`bottom: -${height}px; left: calc(50% - ${width / 2}px);`;
  return null;
};

const StyledDropCaret = styled.svg`
  position: absolute;
  stroke: red;

  ${props => placement(props)}
`;

export { StyledDrop, StyledDropCaret };
