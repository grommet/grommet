import styled, { css } from 'styled-components';

import {
  activeStyle,
  disabledStyle,
  edgeStyle,
  focusStyle,
  unfocusStyle,
  genericStyles,
  kindPartStyles,
  parseMetricToNum,
} from '../../utils';
import { defaultProps } from '../../default-props';

const radiusStyle = (props) => {
  const size = props.sizeProp;
  // caller has specified a themeObj to use for styling
  // relevant for cases like pagination which looks to theme.pagination.button
  const themeObj =
    typeof props.kind === 'object' ? props.kind : props.theme.button;
  if (size && themeObj.size && themeObj.size[size])
    return css`
      border-radius: ${themeObj.size[size].border.radius};
    `;
  if (themeObj.border && themeObj.border.radius)
    return css`
      border-radius: ${themeObj.border.radius};
    `;
  return '';
};

const fontStyle = (props) => {
  const size = props.sizeProp || 'medium';
  const data = props.theme.text[size];
  return css`
    font-size: ${data.size};
    // fix for safari, when button is icon-only, apply line-height 0
    // to ensure no extra height is applied above svg
    line-height: ${props.hasIcon && !props.hasLabel ? 0 : data.height};
  `;
};

const padFromTheme = (size = 'medium', theme, themeObj, kind, iconOnly) => {
  if (size && iconOnly && themeObj?.size?.[size]?.iconOnly?.pad) {
    const pad = themeObj?.size?.[size]?.iconOnly?.pad;

    return {
      vertical: typeof pad === 'string' ? pad : pad.vertical,
      horizontal: typeof pad === 'string' ? pad : pad.horizontal,
    };
  }

  if (size && themeObj?.size?.[size]?.[kind]?.pad) {
    return themeObj.size[size][kind].pad;
  }

  if (size && themeObj.size && themeObj.size[size] && themeObj.size[size].pad) {
    return {
      vertical: themeObj.size[size].pad.vertical,
      horizontal: themeObj.size[size].pad.horizontal,
    };
  }

  if (theme.button.padding) {
    return {
      vertical:
        theme.global.edgeSize[theme.button.padding.vertical] ||
        theme.button.padding.vertical,
      horizontal:
        theme.global.edgeSize[theme.button.padding.horizontal] ||
        theme.button.padding.horizontal,
    };
  }
  return undefined;
};

const padStyle = ({ hasIcon, hasLabel, sizeProp: size, theme, kind }) => {
  // caller has specified a themeObj to use for styling
  // relevant for cases like pagination which looks to theme.pagination.button
  const themeObj = typeof kind === 'object' ? kind : theme.button;
  const iconOnly = hasIcon && !hasLabel;
  const pad = padFromTheme(size, theme, themeObj, kind, iconOnly);
  return pad
    ? css`
        padding: ${pad.vertical} ${pad.horizontal};
      `
    : '';
};

const basicStyle = (props) => css`
  border: none;
  ${radiusStyle(props)};
  ${padStyle(props)}
  ${fontStyle(props)}

  ${props.icon &&
  `
    > svg {
      display: flex;
      align-self: center;
      vertical-align: middle;
    }
  `}
`;

const getPath = (theme, path) => {
  let obj;
  if (path) {
    obj = theme;
    const parts = path.split('.');
    while (obj && parts.length) obj = obj[parts.shift()];
  }
  return obj;
};

const adjustPadStyle = (pad, width) => {
  const offset = parseMetricToNum(width);
  return css`
    padding: ${Math.max(parseMetricToNum(pad.vertical) - offset, 0)}px
      ${Math.max(parseMetricToNum(pad.horizontal) - offset, 0)}px;
  `;
};

// build up CSS from basic to specific based on the supplied sub-object paths
const kindStyle = ({
  busy,
  colorValue,
  hasIcon,
  hasLabel,
  kind,
  sizeProp: size,
  success,
  themePaths,
  theme,
}) => {
  const styles = [];

  // caller has specified a themeObj to use for styling
  // relevant for cases like pagination which looks to theme.pagination.button
  const themeObj = typeof kind === 'object' ? kind : theme.button;

  const iconOnly = hasIcon && !hasLabel;
  const pad = padFromTheme(size, theme, themeObj, kind, iconOnly);
  themePaths.base.forEach((themePath) => {
    const obj = getPath(themeObj, themePath);
    if (obj) {
      styles.push(kindPartStyles(obj, theme, colorValue));
      if (obj.border && obj.border.width && pad && !obj.padding) {
        // Adjust padding from the button.size or just top button.padding
        // to deal with the kind's border width. But don't override any
        // padding in the kind itself for backward compatibility
        styles.push(adjustPadStyle(pad, obj.border.width));
      }
    }
  });

  // do the styling from the root of the object if caller passes one
  if (!themePaths.base.length && typeof kind === 'object') {
    const obj = kind;
    if (obj) {
      styles.push(kindPartStyles(obj, theme, colorValue));
      if (obj.border && obj.border.width && pad && !obj.padding) {
        // Adjust padding from the button.size or just top button.padding
        // to deal with the kind's border width. But don't override any
        // padding in the kind itself for backward compatibility
        styles.push(adjustPadStyle(pad, obj.border.width));
      }
    }
  }

  themePaths.hover.forEach((themePath) => {
    const obj = getPath(themeObj, themePath);

    if (obj) {
      const partStyles = kindPartStyles(obj, theme);
      let adjPadStyles = '';
      if (obj.border && obj.border.width && pad && !obj.padding) {
        // Adjust padding from the button.size or just top button.padding
        // to deal with the hover's border width. But don't override any
        // padding in the hover or hover.kind itself for backward compatibility
        adjPadStyles = adjustPadStyle(pad, obj.border.width);
      }
      if (partStyles.length > 0 && !busy && !success) {
        styles.push(
          css`
            &:hover {
              ${partStyles}
              ${adjPadStyles}
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
  else if (hoverIndicator.color || hoverIndicator.background) {
    if (hoverIndicator.background)
      themishObj.background = hoverIndicator.background;
    if (hoverIndicator.color) themishObj.color = hoverIndicator.color;
  } else themishObj.background = hoverIndicator;
  const styles = kindPartStyles(themishObj, theme);
  if (styles.length > 0)
    return css`
      &:hover {
        ${styles}
      }
    `;
  return '';
};

const fillStyle = (fillContainer) => {
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

const plainStyle = (props) => css`
  outline: none;
  border: none;
  padding: 0;
  text-align: inherit;
  color: inherit;
  ${props.icon &&
  `
    > svg {
      display: flex;
      align-self: center;
      vertical-align: middle;
    }
  `}
  ${props.hasIcon && !props.hasLabel && `line-height: 0;`}
`;

const StyledButtonKind = styled.button.withConfig({
  // don't let kind attribute leak to DOM
  // https://styled-components.com/docs/api#shouldforwardprop
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !['kind'].includes(prop) && defaultValidatorFn(prop),
})`
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
  ${(props) => props.plain && plainStyle(props)}
  // set baseline activeStyle for all buttons including plain buttons
  // buttons with kind will have active styling overridden by kindStyle
  // if they have specific state styles
  ${(props) => !props.disabled && props.active && activeStyle}
  ${(props) => !props.plain && basicStyle(props)}
  ${(props) => !props.plain && kindStyle(props)}
  ${(props) =>
    !props.plain &&
    props.pad &&
    edgeStyle('padding', props.pad, false, undefined, props.theme)}
  ${(props) =>
    !props.plain &&
    props.align &&
    `
    text-align: ${props.align};
    `}
  ${(props) =>
    !props.disabled &&
    props.hoverIndicator &&
    !props.busy &&
    !props.success &&
    hoverIndicatorStyle(props)}
  ${(props) =>
    props.disabled && disabledStyle(props.theme.button.disabled.opacity)}

  &:focus {
    ${(props) => (!props.plain || props.focusIndicator) && focusStyle()}
  }

  &:focus:not(:focus-visible) {
    ${unfocusStyle()}
  }

  ${(props) =>
    !props.plain &&
    props.theme.button.transition &&
    `
    transition-property: ${props.theme.button.transition.properties.join(',')};
    transition-duration: ${props.theme.button.transition.duration}s;
    transition-timing-function: ${props.theme.button.transition.timing};
  `}
  ${(props) => props.fillContainer && fillStyle(props.fillContainer)}
  ${(props) => props.theme.button && props.theme.button.extend}

  ${(props) =>
    (props.busy || props.success) &&
    `
    cursor: default;
  `}
`;

StyledButtonKind.defaultProps = {};
Object.setPrototypeOf(StyledButtonKind.defaultProps, defaultProps);

export { StyledButtonKind };
