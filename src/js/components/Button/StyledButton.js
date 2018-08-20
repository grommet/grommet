import styled, { css } from 'styled-components';

import {
  activeStyle,
  backgroundStyle,
  colorForName,
  colorIsDark,
  focusStyle,
  lapAndUp,
  normalizeColor,
} from '../../utils';

const basicStyle = props => css`
  border: ${props.theme.button.border.width} solid ${props.color
    ? colorForName(props.color, props.theme)
    : normalizeColor((props.theme.button.border.color ||
      props.theme.global.control.color), props.theme)};
  border-radius: ${props.theme.button.border.radius};
  color: ${(props.theme.button.color ||
    props.theme.global.text.color)[props.theme.dark ? 'dark' : 'light']};
`;

const primaryStyle = props => css`
  ${
    backgroundStyle(
      normalizeColor(
        props.color || props.theme.button.primary.color || 'brand',
        props.theme
      ),
      props.theme
    )
  }
  border-radius: ${props.theme.button.border.radius};

  // TODO: revisit this
  svg {
    fill: ${props.theme.global.text.color[
      colorIsDark(colorForName('brand', props.theme)) ? 'dark' : 'light']};
    stroke: ${props.theme.global.text.color[
      colorIsDark(colorForName('brand', props.theme)) ? 'dark' : 'light']};
    transition: none;
  }
`;

const disabledStyle = css`
  opacity: ${props => props.theme.button.disabled.opacity};
  cursor: default;
`;

function getHoverColor(props) {
  if (props.color) {
    return colorForName(props.color, props.theme);
  }
  return (normalizeColor(props.theme.button.border.color ||
    props.theme.global.control.color, props.theme));
}

function getHoverIndicatorStyle(hoverIndicator, theme) {
  let background;
  if (hoverIndicator === true || hoverIndicator === 'background') {
    background = theme.global.hover.background;
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
    ${props => props.hoverIndicator && getHoverIndicatorStyle(
      props.hoverIndicator, props.theme
    )}

    ${props => !props.plain && (
      css`box-shadow: 0px 0px 0px 2px ${getHoverColor(props)};`
    )}

    ${props => !props.plain && !props.primary && (
      css`
        // TODO: revisit this
        svg {
          fill: ${props.theme.global.hover.textColor};
          stroke: ${props.theme.global.hover.textColor};
          transition: none;
        }
      `
    )}

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

  ${props => props.plain && plainStyle}
  ${props => !props.plain && basicStyle(props)}
  ${props => props.primary && primaryStyle(props)}

  ${props => (
    !props.disabled && !props.focus && hoverStyle
  )}

  ${props => !props.disabled && props.active && activeStyle}
  ${props => props.disabled && disabledStyle}

  ${props => (
    !props.plain && (
      `padding: ${props.theme.button.padding.vertical} ${props.theme.button.padding.horizontal};`
    )
  )}
  ${props => props.focus && (!props.plain || props.focusIndicator) && focusStyle}
  ${lapAndUp(`
    transition: 0.1s ease-in-out;
  `)}
  ${props => props.fillContainer && fillStyle}
  ${props => props.hasIcon && !props.label && !props.plain && `
    padding: ${props.theme.global.edgeSize.small};
  `}
`;

export default StyledButton.extend`
  ${props => props.theme.button.extend}
`;
