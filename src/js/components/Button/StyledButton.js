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
  // if buttonType is specified, use those styles
  // otherwise, use generic button styles
  const padButtonTheme =
    props.buttonType &&
    props.theme.button[props.buttonType] &&
    props.theme.button[props.buttonType].padding
      ? props.theme.button[props.buttonType].padding
      : props.theme.button.padding;

  if (size && props.theme.button.size && props.theme.button.size[size]) {
    return css`
      ${props.theme.button.size[size].pad.vertical}
      ${props.theme.button.size[size].pad.horizontal}
    `;
  }

  return css`
    ${props.theme.global.edgeSize[padButtonTheme.vertical] ||
      padButtonTheme.vertical}
    ${props.theme.global.edgeSize[padButtonTheme.horizontal] ||
      padButtonTheme.horizontal}
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

const buttonTypeStyle = props => {
  const { buttonType } = props;
  return css`
  ${backgroundStyle(
    normalizeColor(props.theme.button[buttonType].background, props.theme),
    props.theme,
    props.theme.global.colors[props.theme.button[buttonType].color] ||
      props.theme.button[buttonType].color ||
      props.theme.button.color,
  )}
  border: ${
    props.colorValue ||
    (props.theme.button[buttonType].border &&
      props.theme.button[buttonType].border.color)
      ? `${props.theme.button.border.width} solid
    ${normalizeColor(
      props.colorValue || props.theme.button[buttonType].border.color,
      props.theme,
    )};`
      : 'none;'
  }
  ${props.theme.button[buttonType].color &&
    `color: ${props.theme.button[buttonType].color};`}
  border-radius: ${radiusStyle(props)};
  text-align: inherit;
  ${props.theme.button[buttonType].extend} 
`;
};

function getHoverColor(props) {
  if (props.colorValue) {
    return normalizeColor(props.colorValue, props.theme);
  }

  const { buttonType } = props;
  if (buttonType) {
    if (
      props.theme.button.hover[buttonType] &&
      props.theme.button.hover[buttonType].border &&
      props.theme.button.hover[buttonType].border.color
    )
      return normalizeColor(
        props.theme.button.hover[buttonType].border.color,
        props.theme,
      );
    // if no hover border color for buttonType, try to match buttonType border
    if (
      props.theme.button[buttonType] &&
      props.theme.button[buttonType].border &&
      props.theme.button[buttonType].border.color
    )
      return normalizeColor(
        props.theme.button[buttonType].border.color,
        props.theme,
      );
  }

  const hoverBorderColor =
    props.theme.button.hover &&
    props.theme.button.hover.border &&
    props.theme.button.hover.border.color;

  return normalizeColor(
    hoverBorderColor || props.theme.button.border.color || 'control',
    props.theme,
  );
}

const hoverStyle = props => {
  let hoverButtonPrefix;
  if (props.buttonType && props.theme.button.hover[props.buttonType])
    hoverButtonPrefix = props.theme.button.hover[props.buttonType];
  else hoverButtonPrefix = props.theme.button.hover;

  return css`
    &:hover {
      ${!props.plain &&
        (hoverButtonPrefix.background || hoverButtonPrefix.color) &&
        css`
          ${backgroundStyle(
            normalizeColor(
              hoverButtonPrefix.background || hoverButtonPrefix.color,
              props.theme,
            ),
            props.theme,
            hoverButtonPrefix.color ||
              props.theme.button.hover.color ||
              props.theme.button.color,
          )}
        `};
      ${props.hoverIndicator &&
        getHoverIndicatorStyle(
          props.hoverIndicator,
          props.theme,
        )} ${!props.plain &&
        css`
          box-shadow: 0px 0px 0px 2px ${getHoverColor(props)};
        `};
    }
  `;
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

const plainStyle = props => css`
  color: ${normalizeColor(props.colorValue || 'inherit', props.theme)};
  outline: none;
  border: none;
  padding: 0;
  text-align: inherit;
`;

const activeButtonStyle = props => {
  let activeButtonPrefix;
  if (props.buttonType) {
    // backwards compatibility for theme styling introduced in v2.13.0
    if (props.theme.button[props.buttonType].active)
      activeButtonPrefix = props.theme.button[props.buttonType].active;
    if (props.theme.button.active[props.buttonType])
      activeButtonPrefix = props.theme.button.active[props.buttonType];
  }
  if (!activeButtonPrefix) activeButtonPrefix = props.theme.button.active;

  return css`
  ${activeStyle}
  ${!props.plain &&
    activeButtonPrefix.border &&
    activeButtonPrefix.border.color &&
    `border: ${props.theme.button.border.width} solid
    ${normalizeColor(activeButtonPrefix.border.color, props.theme)};`}
  ${backgroundStyle(
    normalizeColor(
      activeButtonPrefix.background ||
        props.theme.button.active.background ||
        props.theme.global.active.background,
      props.theme,
    ),
    props.theme,
    props.theme.global.colors[activeButtonPrefix.color] ||
      activeButtonPrefix.color ||
      props.theme.button.color,
  )}
  ${activeButtonPrefix && activeButtonPrefix.extend}
  ${props.primary && activeButtonPrefix && activeButtonPrefix.extend}
`;
};

const disabledButtonStyle = props => {
  let disabledButtonPrefix;
  if (props.buttonType && props.theme.button.disabled[props.buttonType])
    disabledButtonPrefix = props.theme.button.disabled[props.buttonType];
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
  ${props.buttonType &&
    props.theme.button.disabled[props.buttonType] &&
    props.theme.button.disabled[props.buttonType].extend}
`;
};

// Deprecate props.theme.button.disabled.opacity in V3
const StyledButton = styled.button`
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
  ${props => !props.plain && basicStyle(props)}
  ${props =>
    !props.plain &&
    props.buttonType &&
    !props.primary &&
    buttonTypeStyle(props)}
  ${props => props.primary && primaryStyle(props)}

  ${props => !props.disabled && !props.focus && hoverStyle(props)}
  ${props => !props.disabled && props.active && activeButtonStyle(props)}
  ${props =>
    props.disabled &&
    props.theme.button &&
    props.theme.button.disabled &&
    disabledButtonStyle(props)}
  ${props =>
    props.focus && (!props.plain || props.focusIndicator) && focusStyle()}
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
