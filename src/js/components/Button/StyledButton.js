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
  if (props.size) {
    return props.theme.button.size[props.size].border.radius;
  }
  return props.theme.button.border.radius;
};

const basicStyle = props => css`
  border: ${props.theme.button.border.width} solid
    ${normalizeColor(
      props.colorValue || props.theme.button.border.color || 'control',
      props.theme,
    )};
  border-radius: ${radiusStyle(props)};
  color: ${normalizeColor(props.theme.button.color || 'text', props.theme)};
  padding: ${props.theme.button.padding.vertical}
    ${props.theme.button.padding.horizontal};
  font-size: ${props.theme.text.medium.size};
  line-height: ${props.theme.text.medium.height};
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
  border-radius: ${radiusStyle(props)};
`;

const sizeStyle = props => {
  const size = props.size || 'medium';
  const data = props.theme.button.size[size];
  if (data) {
    return css`
      font-size: ${data.size};
      line-height: ${data.height};
    `;
  }
  return css`
    font-size: ${size};
    line-height: normal;
  `;
};

function getHoverColor(props) {
  if (props.colorValue) {
    return normalizeColor(props.colorValue, props.theme);
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

  ${props => !props.disabled && props.active && activeStyle}
  ${props =>
    props.disabled &&
    props.theme.button &&
    disabledStyle(
      props.theme.button.disabled && props.theme.button.disabled.opacity,
    )}
  ${props =>
    props.focus && (!props.plain || props.focusIndicator) && focusStyle}
  ${props =>
    !props.plain &&
    `
    transition-property: color,
      background-color,
      border-color,
      box-shadow;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
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
  ${props => props.size && sizeStyle(props)}
  ${props => props.theme.button && props.theme.button.extend}
`;

StyledButton.defaultProps = {};
Object.setPrototypeOf(StyledButton.defaultProps, defaultProps);

export { StyledButton };
