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
      props.colorValue || props.theme.button.primary.color || 'control',
      props.theme,
    ),
    props.theme,
    props.theme.button.color,
  )}
  ${props.theme.button.primary.border.color &&
    `border:
      ${props.theme.button.border.width} solid
      ${normalizeColor(
        props.colorValue || props.theme.button.primary.border.color,
        props.theme,
      )};`}
  border-radius: ${radiusStyle(props)};
`;

const simpleStyle = props => css`
  ${backgroundStyle(
    normalizeColor(
      props.colorValue || props.theme.button.simple.color,
      props.theme,
    ),
    props.theme,
    props.theme.button.color,
  )}
  border: ${
    props.theme.button.simple.border.color
      ? `${props.theme.button.border.width} solid
    ${normalizeColor(
      props.colorValue || props.theme.button.simple.border.color,
      props.theme,
    )};`
      : 'none;'
  }
  border-radius: ${radiusStyle(props)};
  text-align: inherit;
  ${props.theme.button.simple.extend} 
`;

function getHoverColor(props) {
  if (props.colorValue) {
    return normalizeColor(props.colorValue, props.theme);
  }
  const { buttonType } = props;
  if (buttonType) {
    if (
      props.active &&
      props.theme.button[buttonType].active &&
      props.theme.button[buttonType].active.border &&
      props.theme.button[buttonType].active.border.color
    ) {
      return normalizeColor(
        props.theme.button[buttonType].active.border.color,
        props.theme,
      );
    }
    return normalizeColor(
      props.theme.button[buttonType].hover.border.color ||
        props.theme.button[buttonType].border.color ||
        props.theme.button[buttonType].hover.color ||
        props.theme.button[buttonType].color ||
        props.theme.button.border.color ||
        'control',
      props.theme,
    );
  }
  return normalizeColor(
    props.theme.button.border.color || 'control',
    props.theme,
  );
}

const hoverStyle = css`
  &:hover {
    ${props =>
      props.buttonType &&
      props.theme.button[props.buttonType].hover.color &&
      css`
        ${backgroundStyle(
          normalizeColor(
            props.theme.button[props.buttonType].hover.color,
            props.theme,
          ),
          props.theme,
          props.theme.button.color,
        )}
      `};
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

const activeButtonStyle = props => css`
  ${activeStyle(
    props.theme.button[props.buttonType] &&
      props.theme.button[props.buttonType].active &&
      props.theme.button[props.buttonType].active.color,
  )}
  ${props[props.buttonType] &&
    props.theme.button[props.buttonType].active &&
    props.theme.button[props.buttonType].active.border &&
    props.theme.button[props.buttonType].active.border.color &&
    `border: ${props.theme.button.border.width} solid
    ${normalizeColor(
      props.theme.button[props.buttonType].active.border.color,
      props.theme,
    )};
    `}
  ${props[props.buttonType] &&
    props.theme.button[props.buttonType].active &&
    props.theme.button[props.buttonType].active.extend}
`;

const disabledButtonStyle = props => {
  // if buttonType is specified, use those styles
  // otherwise, use generic button styles
  const disabledButtonTheme =
    props.buttonType &&
    props.theme.button[props.buttonType] &&
    props.theme.button[props.buttonType].disabled
      ? props.theme.button[props.buttonType].disabled
      : props.theme.button.disabled;

  return css`
  ${disabledStyle(disabledButtonTheme.opacity)}
  ${!props.plain &&
    disabledButtonTheme.border &&
    disabledButtonTheme.border.color &&
    `border: ${props.theme.button.border.width} solid
    ${normalizeColor(disabledButtonTheme.border.color, props.theme)};`}
  ${disabledButtonTheme.color &&
    // if primary button, apply disabled color to background. otherwise,
    // apply disabled color to the label
    (props.primary
      ? backgroundStyle(
          normalizeColor(
            (props.theme.button.primary &&
              props.theme.button.primary.disabled &&
              props.theme.button.primary.disabled.color) ||
              props.theme.button.disabled.color,
            props.theme,
          ),
          props.theme,
          props.theme.button.color,
        )
      : `color: ${normalizeColor(disabledButtonTheme.color, props.theme)};`)}
  ${disabledButtonTheme && disabledButtonTheme.extend}
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
  ${props =>
    !props.plain && props.simple && !props.primary && simpleStyle(props)}
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
