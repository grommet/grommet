import styled, { css } from 'styled-components';

import {
  activeStyle,
  backgroundStyle,
  disabledStyle,
  focusStyle,
  genericStyles,
  getHoverIndicatorStyle,
  normalizeColor,
} from '../../utils';
import { defaultProps } from '../../default-props';

const radiusStyle = props => {
  // border.radius shouldn't impact an only-icon rendering.
  const isIconOnly = props.hasIcon && !props.hasLabel;
  const size = props.sizeProp;

  if (
    !isIconOnly &&
    size &&
    props.theme.button.size &&
    props.theme.button.size[size]
  ) {
    return props.theme.button.size[size].border.radius;
  }
  return props.theme.button.border.radius;
};

const fontStyle = props => {
  const size = props.sizeProp || 'medium';
  const data = props.theme.text[size];
  return css`
    font-size: ${data.size};
    line-height: ${data.height};
  `;
};

const padStyle = props => {
  const size = props.sizeProp;

  if (size && props.theme.button.size && props.theme.button.size[size]) {
    return css`
      ${props.theme.button.size[size].pad.vertical}
      ${props.theme.button.size[size].pad.horizontal}
    `;
  }
  return css`
    ${props.theme.button.padding.vertical}
    ${props.theme.button.padding.horizontal}
  `;
};

const basicStyle = props => css`
  border: ${props.theme.button.border.width} solid
    ${normalizeColor(
      props.colorValue || props.theme.button.border.color || 'control',
      props.theme,
    )};
  border-radius: ${radiusStyle(props)};
  color: ${normalizeColor(props.theme.button.color || 'text', props.theme)};
  padding: ${padStyle(props)};
  ${fontStyle(props)}
`;

const primaryStyle = props => css`
  ${backgroundStyle(
    normalizeColor(
      props.colorValue ||
        props.theme.button.primary.background ||
        props.theme.button.primary.color ||
        'control',
      props.theme,
    ),
    props.theme,
    props.theme.button.color,
  )}
  ${
    // For backwards compatibility and to align with convention that `color`
    // should now refer to label color, only apply primary.color as label
    // color if user has defined primary.background
    props.theme.button.primary.color &&
      props.theme.button.primary.background &&
      `color: ${normalizeColor(props.theme.button.primary.color, props.theme)};`
  }
  border-radius: ${radiusStyle(props)};
  ${props.theme.button.primary.extend}
`;

function getHoverColor(props) {
  if (props.colorValue) {
    return normalizeColor(props.colorValue, props.theme);
  }

  if (props.active) {
    let activeButtonPrefix;
    if (props.primary && props.theme.button.active.primary)
      activeButtonPrefix = props.theme.button.active.primary;
    else activeButtonPrefix = props.theme.button.active;
    if (
      activeButtonPrefix &&
      activeButtonPrefix.border &&
      activeButtonPrefix.border.color
    ) {
      return normalizeColor(activeButtonPrefix.border.color, props.theme);
    }
  }

  return normalizeColor(
    props.theme.button.border.color || 'control',
    props.theme,
  );
}

const hoverStyle = css`
  &:hover {
    ${props =>
      props.hoverIndicator &&
      getHoverIndicatorStyle(props.hoverIndicator, props.theme)} ${props =>
      !props.plain &&
      css`
        box-shadow: 0px 0px 0px 2px ${getHoverColor(props)};
      `};
  }
`;

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

const plainStyle = props => css`
  color: ${normalizeColor(props.colorValue || 'inherit', props.theme)};
  border: none;
  padding: 0;
  text-align: inherit;
`;

const activeButtonStyle = props => {
  let activeButtonPrefix;
  if (props.primary) {
    // backwards compatibility for theme styling introduced in v2.13.0
    if (props.theme.button.primary.active)
      activeButtonPrefix = props.theme.button.primary.active;
    if (props.theme.button.active.primary)
      activeButtonPrefix = props.theme.button.active.primary;
  }
  if (!activeButtonPrefix) activeButtonPrefix = props.theme.button.active;

  return css`
  ${activeStyle}
  ${!props.plain &&
    activeButtonPrefix.border &&
    activeButtonPrefix.border.color &&
    `border: ${props.theme.button.border.width} solid
    ${normalizeColor(activeButtonPrefix.border.color, props.theme)};`}
  ${activeButtonPrefix.background &&
    backgroundStyle(
      normalizeColor(activeButtonPrefix.background, props.theme),
      props.theme,
      props.theme.button.color,
    )}
  ${activeButtonPrefix.color &&
    `color: ${normalizeColor(activeButtonPrefix.color, props.theme)};`}
  ${activeButtonPrefix && activeButtonPrefix.extend}
  ${props.primary && activeButtonPrefix && activeButtonPrefix.extend}
`;
};

const disabledButtonStyle = props => {
  let disabledButtonPrefix;
  if (props.primary && props.theme.button.disabled.primary)
    disabledButtonPrefix = props.theme.button.disabled.primary;
  else disabledButtonPrefix = props.theme.button.disabled;

  return css`
  ${disabledStyle(props.theme.button.disabled.opacity)}
  ${!props.plain &&
    disabledButtonPrefix.border &&
    disabledButtonPrefix.border.color &&
    `border: ${props.theme.button.border.width} solid
    ${normalizeColor(disabledButtonPrefix.border.color, props.theme)};`}
  ${disabledButtonPrefix.background &&
    backgroundStyle(
      normalizeColor(disabledButtonPrefix.background, props.theme),
      props.theme,
      props.theme.button.color,
    )}
  ${disabledButtonPrefix.color &&
    `color: ${normalizeColor(disabledButtonPrefix.color, props.theme)};`}
  ${props.theme.button.disabled.extend}
  ${props.primary &&
    props.theme.button.disabled.primary &&
    props.theme.button.disabled.primary.extend}
`;
};

// Deprecate props.theme.button.disabled.opacity in V3
const StyledButton = styled.button`
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  font: inherit;
  text-decoration: none;
  margin: 0;
  background: transparent;
  overflow: visible;
  text-transform: none;

  ${genericStyles}
  ${props => props.plain && plainStyle(props)}
  ${props => !props.plain && basicStyle(props)}
  ${props => props.primary && primaryStyle(props)}

  ${props => !props.disabled && !props.focus && hoverStyle}

  ${props => !props.disabled && props.active && activeButtonStyle(props)}
  ${props =>
    props.disabled &&
    props.theme.button &&
    props.theme.button.disabled &&
    disabledButtonStyle(props)}
  ${props =>
    props.focus && (!props.plain || props.focusIndicator) && focusStyle}
  ${props =>
    !props.plain &&
    props.theme.button.transition &&
    `
    transition-property: ${props.theme.button.transition.properties.join(',')};
    transition-duration: ${props.theme.button.transition.duration}s;
    transition-timing-function: ${props.theme.button.transition.timing};
  `}
  ${props => props.fillContainer && fillStyle(props.fillContainer)}
  ${props =>
    props.hasIcon &&
    !props.hasLabel &&
    `
    line-height: 0;
  `}
  ${props =>
    props.pad &&
    props.hasIcon &&
    !props.hasLabel &&
    `
    padding: ${props.theme.global.edgeSize.small};
  `}
  ${props => props.theme.button && props.theme.button.extend}
`;

StyledButton.defaultProps = {};
Object.setPrototypeOf(StyledButton.defaultProps, defaultProps);

export { StyledButton };
