import styled, { css } from 'styled-components';

import {
  activeStyle,
  disabledStyle,
  focusStyle,
  genericStyles,
  kindPartStyles,
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

// build up CSS from basic to specific based on the supplied sub-object paths
const kindStyle = ({ colorValue, kind, themePaths, theme }) => {
  const styles = [];

  // caller has specified a themeObj to use for styling
  // relevant for cases like pagination which looks to theme.pagination.button
  const themeObj = typeof kind === 'object' ? kind : undefined;

  themePaths.base.forEach(themePath => {
    let obj = themeObj || theme.button;
    if (themePath) {
      const parts = themePath.split('.');
      while (obj && parts.length) obj = obj[parts.shift()];
    }
    if (obj) {
      styles.push(kindPartStyles(obj, theme, colorValue));
    }
  });

  // do the styling from the root of the object if caller passes one
  if (!themePaths.base.length && themeObj) {
    const obj = themeObj;
    if (obj) {
      styles.push(kindPartStyles(obj, theme, colorValue));
    }
  }

  themePaths.hover.forEach(themePath => {
    let obj = themeObj || theme.button;
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
  ${props =>
    !props.disabled && props.hoverIndicator && hoverIndicatorStyle(props)}
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
