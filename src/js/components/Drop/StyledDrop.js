import styled, { css, keyframes } from 'styled-components';

import { baseStyle } from '../../utils';
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

function isObject(object) {
  return object != null && typeof object === 'object';
}

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
}

const marginStyle = (theme, align, margin) => {
  const styles = [];
  const customCSS = margin.split(' ').length > 1;

  if (!customCSS && theme.global.drop.intelligentMargin === true) {
    if (deepEqual(align, { top: 'bottom' })) {
      styles.push(
        css`
          margin: ${margin} 0 0 0;
        `,
      );
    } else if (deepEqual(align, { bottom: 'top' })) {
      styles.push(css`
        margin: 0 0 ${margin} 0;
      `);
    } else if (deepEqual(align, { right: 'left' })) {
      styles.push(
        css`
          margin: 0 0 0 -${margin};
        `,
      );
    } else if (deepEqual(align, { left: 'right' })) {
      styles.push(
        css`
          margin: 0 0 0 ${margin};
        `,
      );
    } else if (deepEqual(align, { top: 'top', left: 'right' })) {
      styles.push(
        css`
          margin: 0px 0px 0px ${margin};
        `,
      );
    } else if (deepEqual(align, { top: 'top', right: 'left' })) {
      styles.push(
        css`
          margin: 0 0 0 -${margin};
        `,
      );
    } else if (deepEqual(align, { top: 'bottom', right: 'left' })) {
      styles.push(
        css`
          margin: ${margin} 0 0 -${margin};
        `,
      );
    } else if (deepEqual(align, { top: 'bottom', right: 'right' })) {
      styles.push(
        css`
          margin: ${margin} 0 0 0;
        `,
      );
    } else if (deepEqual(align, { top: 'bottom', left: 'right' })) {
      styles.push(
        css`
          margin: ${margin} 0 0 ${margin};
        `,
      );
    } else if (deepEqual(align, { top: 'bottom', left: 'left' })) {
      styles.push(
        css`
          margin: ${margin} 0 0 0;
        `,
      );
    } else if (deepEqual(align, { bottom: 'top', right: 'left' })) {
      styles.push(
        css`
          margin: 0 0 ${margin} -${margin};
        `,
      );
    } else if (deepEqual(align, { bottom: 'top', right: 'right' })) {
      styles.push(
        css`
          margin: 0 0 ${margin} 0;
        `,
      );
    } else if (deepEqual(align, { bottom: 'top', left: 'left' })) {
      styles.push(
        css`
          margin: 0 0 ${margin} 0;
        `,
      );
    } else if (deepEqual(align, { bottom: 'top', left: 'right' })) {
      styles.push(
        css`
          margin: 0 0 ${margin} ${margin};
        `,
      );
    } else if (deepEqual(align, { bottom: 'top', right: 'left' })) {
      styles.push(
        css`
          margin: 0 0 ${margin} -${margin};
        `,
      );
    } else if (deepEqual(align, { bottom: 'bottom', left: 'right' })) {
      styles.push(
        css`
          margin: 0 0 0 ${margin};
        `,
      );
    } else if (deepEqual(align, { bottom: 'bottom', right: 'left' })) {
      styles.push(
        css`
          margin: 0 0 0 -${margin};
        `,
      );
    } else {
      styles.push(
        css`
          margin: none;
        `,
      );
    }
  } else {
    // a complex CSS string such as "50px 20px" apply this
    styles.push(css`
      margin: ${margin};
    `);
  }
  return styles;
};

const StyledDrop = styled.div`
  ${baseStyle}

  border-radius: ${props => props.theme.global.drop.border.radius};
  position: fixed;
  z-index: ${props => props.theme.global.drop.zIndex};
  outline: none;

  ${props =>
    !props.plain &&
    backgroundStyle(props.theme.global.drop.background, props.theme)}
    
    ${props =>
      props.theme.global.drop.margin &&
      marginStyle(
        props.theme,
        props.alignProp,
        props.theme.global.drop.margin,
      )};  

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
