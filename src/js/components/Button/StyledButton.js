import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import {
  activeStyle, backgroundStyle, colorForName, colorIsDark, focusStyle,
  fontSize, lapAndUp,
} from '../../utils';

const basicStyle = props => css`
  border: ${props.theme.button.border.width} solid ${props.color ? colorForName(props.color, props.theme) : props.theme.button.border.color};
  border-radius: ${props.theme.button.border.radius};
  color: ${(props.theme.dark ?
    props.theme.global.colors.darkBackground.text :
    props.theme.button.colors.text)};
`;

const primaryStyle = props => css`
  ${backgroundStyle(props.color || 'brand', props.theme)}
  border: none;
  border-radius: ${props.theme.button.border.radius};

  // TODO: revisit this
  svg {
    fill: ${colorIsDark(colorForName('brand', props.theme)) ?
      props.theme.global.colors.darkBackground.text :
      props.theme.global.colors.lightBackground.text};
    stroke: ${colorIsDark(colorForName('brand', props.theme)) ?
      props.theme.global.colors.darkBackground.text :
      props.theme.global.colors.lightBackground.text};
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
  return props.theme.button.border.color;
}

function getHoverIndicatorStyle(hoverIndicator, theme) {
  let backgroundColor = theme.global.hover.backgroundColor;
  if (typeof hoverIndicator === 'object') {
    if (
      typeof hoverIndicator.background === 'string'
    ) {
      const colorGroup = hoverIndicator.background.split('-');
      const colorType = colorGroup[0];
      if (!theme.global.colors[colorType]) {
        console.warn(
          `Invalid color ${hoverIndicator.background}, using ${backgroundColor} instead`
        );
      } else if (colorGroup.length > 1) {
        // subtract one to use the array
        const colorIndex = colorGroup[1] - 1;
        if (theme.global.colors[colorType].length < colorGroup[1]) {
          console.warn(
            `Invalid color ${hoverIndicator.background}, using ${backgroundColor} instead`
          );
        } else {
          backgroundColor = `${rgba(theme.global.colors[colorType][colorIndex], 0.3)};`;
        }
      } else if (typeof theme.global.colors[colorType] !== 'string') {
        console.warn(
          `Invalid color ${hoverIndicator.background}, using ${backgroundColor} instead`
        );
      } else {
        backgroundColor = `${rgba(theme.global.colors[colorType], 0.3)};`;
      }
    }
  }
  return css`
    background-color: ${backgroundColor};
    color: ${theme.global.hover.textColor};
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
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  font: inherit;
  text-decoration: none;
  margin: 0;
  background-color: transparent;
  overflow: visible;
  text-transform: none;

  ${props => props.plain && plainStyle}
  ${props => !props.plain && css`
    text-align: center;
    display: inline-block;
    min-width: ${props.theme.button.minWidth};
    max-width: ${props.theme.button.maxWidth};
    font-weight: ${props.theme.global.control.font.weight};
  `}
  ${props => !props.plain && !props.primary && basicStyle(props)}
  ${props => props.primary && primaryStyle(props)}

  ${props => (
    !props.disabled && !props.focus && hoverStyle
  )}

  ${props => !props.disabled && props.active && activeStyle}
  ${props => props.disabled && disabledStyle}

  ${props => (
    !props.plain && (
      fontSize(props.theme.global.control.font.size, props.theme.global.spacing)
    )
  )}
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
  ${props => props.icon && !props.label && `
    padding: ${props.theme.global.edgeSize.small};
  `}
`;

export const StyledLabel = styled.span`
  &:first-child:not(:last-child) {
    margin-right: ${props => props.theme.global.edgeSize.small};
  }
`;

export const StyledIcon = styled.span`
  display: inline-block;

  &:first-child:not(:last-child) {
    margin-right: ${props => props.theme.global.edgeSize.small};
  }

  > * {
    vertical-align: bottom;
  }
`;

export default StyledButton.extend`
  ${props => props.theme.button.extend}
`;
