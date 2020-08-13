import styled, { css } from 'styled-components';

import {
  activeStyle,
  backgroundStyle,
  disabledStyle,
  focusStyle,
  genericStyles,
  normalizeColor,
} from '../../utils';
import { defaultProps } from '../../default-props';

const radiusStyle = props => {
  const size = props.sizeProp;
  if (size && props.theme.button.size && props.theme.button.size[size])
    return css`
      border-radius: ${props.theme.button.size[size].border.radius};
    `;
  if (props.theme.button.border && props.theme.button.border.radius)
    return css`
      border-radius: ${props.theme.button.border.radius};
    `;
  return '';
};

const fontStyle = props => {
  const size = props.sizeProp || 'medium';
  const data = props.theme.text[size];
  return css`
    font-size: ${data.size};
    line-height: ${data.height};
  `;
};

const padStyle = ({ sizeProp: size, theme }) => {
  if (
    size &&
    theme.button.size &&
    theme.button.size[size] &&
    theme.button.size[size].pad
  ) {
    return css`
      padding: ${theme.button.size[size].pad.vertical}
        ${theme.button.size[size].pad.horizontal};
    `;
  }

  if (theme.button.padding) {
    return css`
      padding: ${theme.global.edgeSize[theme.button.padding.vertical] ||
          theme.button.padding.vertical}
        ${theme.global.edgeSize[theme.button.padding.horizontal] ||
          theme.button.padding.horizontal};
    `;
  }
  return '';
};

// The > svg rule is to ensure Buttons with just an icon don't add additional
// vertical height internally.
const basicStyle = props => css`
  border: none;
  ${radiusStyle(props)};
  ${padStyle(props)}
  ${fontStyle(props)}

  > svg {
    vertical-align: bottom;
  }
`;

// CSS for this sub-object in the theme
const kindPartStyles = (obj, theme, colorValue) => {
  const styles = [];
  if (obj.padding) {
    if (obj.padding.vertical || obj.padding.horizontal)
      styles.push(
        `padding: ${theme.global.edgeSize[obj.padding.vertical] ||
          obj.padding.vertical ||
          0} ${theme.global.edgeSize[obj.padding.horizontal] ||
          obj.padding.horizontal ||
          0};`,
      );
    else
      styles.push(
        `padding: ${theme.global.edgeSize[obj.padding] || obj.padding || 0};`,
      );
  }
  if (obj.background)
    styles.push(
      backgroundStyle(
        colorValue || obj.background,
        theme,
        obj.color ||
          (Object.prototype.hasOwnProperty.call(obj, 'color') &&
          obj.color === undefined
            ? false
            : undefined),
      ),
    );
  else if (obj.color)
    styles.push(`color: ${normalizeColor(obj.color, theme)};`);
  if (obj.border) {
    if (obj.border.width)
      styles.push(css`
        border-style: solid;
        border-width: ${obj.border.width};
      `);
    if (obj.border.color)
      styles.push(css`
        border-color: ${normalizeColor(
          (!obj.background && colorValue) || obj.border.color || 'border',
          theme,
        )};
      `);
    if (obj.border.radius)
      styles.push(css`
        border-radius: ${obj.border.radius};
      `);
  } else if (obj.border === false) styles.push('border: none;');
  if (colorValue && !obj.border && !obj.background)
    styles.push(`color: ${normalizeColor(colorValue, theme)};`);
  if (obj.font) {
    if (obj.font.size) {
      styles.push(
        `font-size: ${theme.text[obj.font.size].size || obj.font.size};`,
      );
    }
    if (obj.font.height) {
      styles.push(`line-height: ${obj.font.height};`);
    }
    if (obj.font.weight) {
      styles.push(`font-weight: ${obj.font.weight};`);
    }
  }
  if (obj.opacity) {
    const opacity =
      obj.opacity === true
        ? theme.global.opacity.medium
        : theme.global.opacity[obj.opacity] || obj.opacity;
    styles.push(`opacity: ${opacity};`);
  }
  if (obj.extend) styles.push(obj.extend);
  return styles;
};

// build up CSS from basic to specific based on the supplied sub-object paths
const kindStyle = ({ colorValue, themePaths, theme }) => {
  const styles = [];

  themePaths.base.forEach(themePath => {
    let obj = theme.button;
    if (themePath) {
      const parts = themePath.split('.');
      while (obj && parts.length) obj = obj[parts.shift()];
    }
    if (obj) {
      styles.push(kindPartStyles(obj, theme, colorValue));
    }
  });

  themePaths.hover.forEach(themePath => {
    let obj = theme.button;
    if (themePath) {
      const parts = themePath.split('.');
      while (obj && parts.length) obj = obj[parts.shift()];
      if (obj) {
        const partStyles = kindPartStyles(obj, theme);
        if (partStyles.length > 0)
          styles.push(
            css`
              &:hover {
                ${partStyles}
              }
            `,
          );
      }
    }
  });

  return styles;
};

const hoverIndicatorStyle = ({ hoverIndicator, theme }) => {
  const themishObj = {};
  if (hoverIndicator === true || hoverIndicator === 'background')
    themishObj.background = theme.global.hover.background;
  else themishObj.background = hoverIndicator;
  const styles = kindPartStyles(themishObj, theme);
  if (styles.length > 0)
    return css`
      &:hover {
        ${styles}
      }
    `;
  return '';
};

const fillStyle = fillContainer => {
  if (fillContainer === 'horizontal') {
    return 'width: 100%;';
  }
  if (fillContainer === 'vertical') {
    return 'height: 100%;';
  }
  if (fillContainer) {
    return `
      width: 100%;
      height: 100%;
      max-width: none;
      flex: 1 0 auto;
    `;
  }
  return undefined;
};

// The > svg rule is to ensure Buttons with just an icon don't add additional
// vertical height internally.
const plainStyle = () => css`
  outline: none;
  border: none;
  padding: 0;
  text-align: inherit;
  color: inherit;

  > svg {
    vertical-align: bottom;
  }
`;

const StyledButtonKind = styled.button`
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  font: inherit;
  text-decoration: none;
  margin: 0;
  background: transparent;
  overflow: visible;
  text-transform: none;

  ${genericStyles}
  ${props => props.plain && plainStyle(props)}
  // set baseline activeStyle for all buttons including plain buttons
  // buttons with kind will have active styling overridden by kindStyle
  // if they have specific state styles
  ${props => !props.disabled && props.active && activeStyle}
  ${props => !props.plain && basicStyle(props)}
  ${props => !props.plain && kindStyle(props)}
  ${props =>
    !props.plain &&
    props.align &&
    `
    text-align: ${props.align};
    `}
    ${props => props.hoverIndicator && hoverIndicatorStyle(props)}
  ${props =>
    props.disabled && disabledStyle(props.theme.button.disabled.opacity)}

  &:focus {
    ${props => (!props.plain || props.focusIndicator) && focusStyle()}
  }
  
  ${props =>
    !props.plain &&
    props.theme.button.transition &&
    `
    transition-property: ${props.theme.button.transition.properties.join(',')};
    transition-duration: ${props.theme.button.transition.duration}s;
    transition-timing-function: ${props.theme.button.transition.timing};
  `}
  ${props => props.fillContainer && fillStyle(props.fillContainer)}
  ${props => props.theme.button && props.theme.button.extend}
`;

StyledButtonKind.defaultProps = {};
Object.setPrototypeOf(StyledButtonKind.defaultProps, defaultProps);

export { StyledButtonKind };
