import styled, { css } from 'styled-components';

import {
  activeStyle,
  backgroundStyle,
  focusStyle,
  genericStyles,
  normalizeColor,
} from '../../utils';

const basicStyle = props => css`
  border: ${props.theme.button.border.width} solid
    ${normalizeColor(
      props.colorValue || props.theme.button.border.color || 'control',
      props.theme,
    )};
  border-radius: ${props.theme.button.border.radius};
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
  )}
  border-radius: ${props.theme.button.border.radius};
`;

const disabledStyle = css`
  opacity: ${props => props.theme.button.disabled.opacity};
  cursor: default;
`;

function getHoverColor(props) {
  if (props.colorValue) {
    return normalizeColor(props.colorValue, props.theme);
  }
  return normalizeColor(
    props.theme.button.border.color || 'control',
    props.theme,
  );
}

function getHoverIndicatorStyle(hoverIndicator, theme) {
  let background;
  if (hoverIndicator === true || hoverIndicator === 'background') {
    ({ background } = theme.global.hover);
  } else {
    background = hoverIndicator;
  }
  return css`
    ${backgroundStyle(background, theme)}
    color: ${normalizeColor(theme.global.hover.color, theme)};
  `;
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

const fillStyle = `
  width: 100%;
  height: 100%;
  max-width: none;
  flex: 1 0 auto;
`;

const plainStyle = css`
  color: inherit;
  border: none;
  padding: 0;
  text-align: inherit;
`;

export const StyledButton = styled.button`
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
  ${props => props.plain && plainStyle}
  ${props => !props.plain && basicStyle(props)}
  ${props => props.primary && primaryStyle(props)}

  ${props => !props.disabled && !props.focus && hoverStyle}

  ${props => !props.disabled && props.active && activeStyle}
  ${props => props.disabled && disabledStyle}
  ${props =>
    props.focus && (!props.plain || props.focusIndicator) && focusStyle}
  ${props =>
    !props.plain &&
    `
    transition: 0.1s ease-in-out;
  `}
  ${props => props.fillContainer && fillStyle}
  ${props =>
    props.hasIcon &&
    !props.hasLabel &&
    `
    padding: ${props.theme.global.edgeSize.small};
  `}
  ${props => props.theme.button.extend}
`;
