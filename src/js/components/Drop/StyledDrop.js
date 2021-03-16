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

const isObject = object => object != null && typeof object === 'object';

const deepEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let i = 0; i < keys1.length; i += 1) {
    const val1 = object1[keys1[i]];
    const val2 = object2[keys1[i]];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
};

const marginStyle = (theme, align, data, responsive, margin) => {
  const marginProp = theme.global.edgeSize[data] || data;
  let MarginSide;

  if (theme.global.drop.intelligentMargin === true) {
    if (deepEqual(align, { top: 'bottom' })) {
      MarginSide = { top: marginProp };
    } else if (deepEqual(align, { bottom: 'top' })) {
      MarginSide = { bottom: marginProp };
    } else if (deepEqual(align, { right: 'left' })) {
      MarginSide = { left: `-${marginProp}` };
    } else if (deepEqual(align, { left: 'right' })) {
      MarginSide = { left: marginProp };
    } else if (deepEqual(align, { top: 'top', left: 'right' })) {
      MarginSide = { left: marginProp };
    } else if (deepEqual(align, { top: 'top', right: 'left' })) {
      MarginSide = { left: `-${marginProp}` };
    } else if (deepEqual(align, { top: 'bottom', right: 'left' })) {
      MarginSide = { top: marginProp, left: `-${marginProp}` };
    } else if (deepEqual(align, { top: 'bottom', right: 'right' })) {
      MarginSide = { top: marginProp };
    } else if (deepEqual(align, { top: 'bottom', left: 'right' })) {
      MarginSide = { top: marginProp, left: marginProp };
    } else if (deepEqual(align, { top: 'bottom', left: 'left' })) {
      MarginSide = { top: marginProp };
    } else if (deepEqual(align, { bottom: 'top', right: 'left' })) {
      MarginSide = { bottom: marginProp, left: `-${marginProp}` };
    } else if (deepEqual(align, { right: 'right', bottom: 'top' })) {
      MarginSide = { bottom: marginProp };
    } else if (deepEqual(align, { bottom: 'top', left: 'left' })) {
      MarginSide = { bottom: marginProp };
    } else if (deepEqual(align, { bottom: 'top', left: 'right' })) {
      MarginSide = { bottom: marginProp, left: marginProp };
    } else if (deepEqual(align, { bottom: 'top', right: 'left' })) {
      MarginSide = { bottom: marginProp, left: `-${marginProp}` };
    } else if (deepEqual(align, { bottom: 'bottom', left: 'right' })) {
      MarginSide = { left: marginProp };
    } else if (deepEqual(align, { bottom: 'bottom', right: 'left' })) {
      MarginSide = { left: `-${marginProp}` };
    }
  } else {
    return edgeStyle(
      'margin',
      margin || theme.global.drop.margin,
      responsive,
      theme.global.edgeSize.responsiveBreakpoint,
      theme,
    );
  }
  return edgeStyle(
    'margin',
    MarginSide,
    responsive,
    theme.global.edgeSize.responsiveBreakpoint,
    theme,
  );
};

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
    marginStyle(
      props.theme,
      props.alignProp,
      props.theme.global.drop.margin,
      props.responsive,
      props.margin,
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
