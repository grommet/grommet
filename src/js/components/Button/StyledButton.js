import styled, { css } from 'styled-components';

import {
  activeStyle,
  backgroundStyle,
  disabledStyle,
  edgeStyle,
  focusStyle,
  unfocusStyle,
  genericStyles,
  getHoverIndicatorStyle,
  normalizeColor,
} from '../../utils';
import { defaultProps } from '../../default-props';

const radiusStyle = (props) => {
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

const fontStyle = (props) => {
  const size = props.sizeProp || 'medium';
  const data = props.theme.text[size];
  return css`
    font-size: ${data.size};
    line-height: ${data.height};
  `;
};

const padStyle = (props) => {
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

const basicStyle = (props) => css`
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

const primaryStyle = (props) => css`
  ${backgroundStyle(
    normalizeColor(
      props.colorValue ||
        (props.theme.button.primary && props.theme.button.primary.color) ||
        'control',
      props.theme,
    ),
    props.theme,
    props.theme.button.color,
  )}
  border-radius: ${radiusStyle(props)};
  ${props.theme.button.primary && props.theme.button.primary.extend}
`;

function getHoverColor(props) {
  if (props.colorValue) {
    return normalizeColor(props.colorValue, props.theme);
  }
  if (
    props.active &&
    props.primary &&
    props.theme.button.primary &&
    props.theme.button.primary.active &&
    props.theme.button.primary.active.border &&
    props.theme.button.primary.active.border.color
  ) {
    return normalizeColor(
      props.theme.button.primary.active.border.color,
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
    ${(props) =>
      props.hoverIndicator &&
      getHoverIndicatorStyle(props.hoverIndicator, props.theme)} ${(props) =>
      !props.plain &&
      css`
        box-shadow: 0px 0px 0px 2px ${getHoverColor(props)};
      `};
  }
`;

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
  color: ${normalizeColor(props.colorValue || 'inherit', props.theme)};
  outline: none;
  border: none;
  padding: 0;
  text-align: inherit;
`;

const activeButtonStyle = (props) => css`
  ${activeStyle}
  ${props.primary &&
  props.theme.button.primary &&
  props.theme.button.primary.active &&
  props.theme.button.primary.active.border &&
  props.theme.button.primary.active.border.color &&
  `border: ${props.theme.button.border.width} solid
    ${normalizeColor(
      props.theme.button.primary.active.border.color,
      props.theme,
    )};
    `}
  ${props.primary &&
  props.theme.button.primary &&
  props.theme.button.primary.active &&
  props.theme.button.primary.active.extend}
`;

const disabledButtonStyle = (props) => css`
  ${disabledStyle(props.theme.button.disabled.opacity)}
  ${!props.plain &&
  props.theme.button.disabled.border &&
  props.theme.button.disabled.border.color &&
  `border: ${props.theme.button.border.width} solid
    ${normalizeColor(props.theme.button.disabled.border.color, props.theme)};`}
  ${props.theme.button.disabled.color &&
  // if primary button, apply disabled color to background. otherwise,
  // apply disabled color to the label
  (props.primary
    ? backgroundStyle(
        normalizeColor(props.theme.button.disabled.color, props.theme),
        props.theme,
        props.theme.button.color,
      )
    : `color: ${normalizeColor(
        props.theme.button.disabled.color,
        props.theme,
      )};`)}
  ${props.theme.button.disabled && props.theme.button.disabled.extend}
`;

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
  ${(props) => props.plain && plainStyle(props)}
  ${(props) => !props.plain && basicStyle(props)}
  ${(props) => props.primary && primaryStyle(props)}

  ${(props) =>
    !props.disabled &&
    !props.selected &&
    !props.focus &&
    !props.busy &&
    !props.success &&
    hoverStyle}

  ${(props) => !props.disabled && props.active && activeButtonStyle(props)}
  ${(props) =>
    props.disabled &&
    props.theme.button &&
    props.theme.button.disabled &&
    disabledButtonStyle(props)}

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
  ${(props) =>
    props.hasIcon &&
    !props.hasLabel &&
    `
    line-height: 0;
  `}
  ${(props) =>
    props.pad === true &&
    props.hasIcon &&
    !props.hasLabel &&
    `
    padding: ${props.theme.global.edgeSize.small};
  `}
  ${(props) =>
    !props.plain &&
    props.pad &&
    edgeStyle('padding', props.pad, false, undefined, props.theme)}
  ${(props) => props.theme.button && props.theme.button.extend}

  ${(props) =>
    (props.busy || props.success) &&
    `
    cursor: default;
  `}
`;

StyledButton.defaultProps = {};
Object.setPrototypeOf(StyledButton.defaultProps, defaultProps);

export { StyledButton };
