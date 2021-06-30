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

// The desired margin may be adjusted depending on drops alignment
const marginStyle = (theme, align, data, responsive, marginProp) => {
  const margin = theme.global.edgeSize[data] || data;
  let adjustedMargin = {};
  // if user provides CSS string such as '50px 12px', apply that always
  const customCSS = typeof margin === 'string' && margin.split(' ').length > 1;
  if (
    theme.global.drop.intelligentMargin === true &&
    !customCSS &&
    typeof margin === 'string'
  ) {
    if (align.top === 'bottom') adjustedMargin.top = margin;
    else if (align.bottom === 'top') adjustedMargin.bottom = margin;
    if (align.right === 'left') adjustedMargin.left = `-${margin}`;
    else if (align.left === 'right') adjustedMargin.left = margin;
    if (!Object.keys(adjustedMargin)) adjustedMargin = 'none';
  } else {
    return edgeStyle(
      'margin',
      marginProp || theme.global.drop.margin,
      responsive,
      theme.global.edgeSize.responsiveBreakpoint,
      theme,
    );
  }
  return edgeStyle(
    'margin',
    adjustedMargin,
    responsive,
    theme.global.edgeSize.responsiveBreakpoint,
    theme,
  );
};

const StyledDrop = styled.div`
  ${baseStyle}

  ${(props) =>
    !props.plain &&
    ((props.round && roundStyle(props.round, true, props.theme)) ||
      `border-radius: ${props.theme.global.drop.border.radius};`)}

  position: fixed;
  z-index: ${(props) => props.theme.global.drop.zIndex};
  outline: none;

  ${(props) =>
    !props.plain &&
    backgroundStyle(
      props.background || props.theme.global.drop.background,
      props.theme,
    )}

  ${(props) =>
    !props.plain &&
    (props.margin || props.theme.global.drop.margin) &&
    props.theme.global &&
    marginStyle(
      props.theme,
      props.alignProp,
      props.theme.global.drop.margin,
      props.responsive,
      props.margin,
    )}

  opacity: 0;
  transform-origin: ${(props) => getTransformOriginStyle(props.alignProp)};
  animation: ${dropKeyFrames} 0.1s forwards;
  animation-delay: 0.01s;

  /* IE11 hack to get drop contents to not overflow */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    display: flex;
    align-items: stretch;
  }

  ${(props) => props.theme.global.drop && props.theme.global.drop.extend}
`;

StyledDrop.defaultProps = {};
Object.setPrototypeOf(StyledDrop.defaultProps, defaultProps);

export { StyledDrop };
