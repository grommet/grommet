import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import { focusStyle, fontSize, lapAndUp, parseMetricToInt } from '../utils';

const primaryStyle = css`
  background-color: ${props => props.theme.global.colors.brand};
  color: ${props => props.theme.global.colors.white};

  // TODO: revisit this
  svg {
    fill: ${props => props.theme.global.colors.white};
    stroke: ${props => props.theme.global.colors.white};
    transition: none;
  }
`;

const accentStyle = css`
  border-color: ${props => props.theme.button.colors.accent};
`;

const criticalStyle = css`
  border-color: ${props => props.theme.button.colors.critical};
`;

const secondaryStyle = css`
  border-color: ${props => props.theme.button.colors.secondary};
`;

const disabledStyle = `
  opacity: 0.3;
  cursor: default;
`;

function getHoverColor(props) {
  if (props.accent) {
    return props.theme.button.colors.accent;
  } else if (props.critical) {
    return props.theme.button.colors.critical;
  } else if (props.secondary) {
    return props.theme.button.colors.secondary;
  }
  return props.theme.button.border.color || props.theme.global.colors.brand;
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
      `box-shadow: 0px 0px 0px 2px ${getHoverColor(props)};`
    )}

    ${props => !props.plain && !props.primary && (
      `
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
  max-width: none;
  flex-grow: 1;
`;

const plainFocusStyle = css`
  box-shadow: 0 0 2px 2px ${
    props => (
      props.theme.global.focus.border.color ||
      props.theme.global.colors.accent[0]
    )
  };
`;

const plainStyle = css`
  color: inherit;
  border: none;
  padding: 0;

  ${props => props.focus && plainFocusStyle}
`;

const StyledButton = styled.button`
  cursor: pointer;
  outline: none;
  font: inherit;
  text-decoration: none;
  font: inherit;
  margin: 0;
  background-color: transparent;
  overflow: visible;
  text-transform: none;

  ${props => !props.plain && css`
    border: ${props.theme.button.border.width} solid ${props.theme.button.border.color || props.theme.global.colors.brand};
    border-radius: ${props.theme.button.border.radius};
    color: ${props.theme.button.color || props.theme.global.colors.text};
    text-align: center;
    display: inline-block;
    min-width: ${props.theme.button.minWidth};
    max-width: ${props.theme.button.maxWidth};
    font-weight: ${props.theme.global.control.font.weight};
  `}

  ${props => (
    !props.disabled && !props.focus && hoverStyle
  )}

  ${props => props.disabled && disabledStyle}

  ${props => (
    !props.plain && (
      fontSize(props.theme.global.control.font.size, props.theme.global.spacing)
    )
  )}
  ${props => (
    !props.plain && !props.box && (
      `padding: ${props.theme.button.padding.vertical} ${props.theme.button.padding.horizontal};`
    )
  )}
  ${(props) => {
    if (props.primary) {
      return primaryStyle;
    } else if (props.accent) {
      return accentStyle;
    } else if (props.critical) {
      return criticalStyle;
    } else if (props.secondary) {
      return secondaryStyle;
    }
    return '';
  }}
  ${props => props.focus && focusStyle}
  ${lapAndUp(`
    transition: 0.1s ease-in-out;
  `)}
  ${props => props.plain && plainStyle}
  ${props => props.fill && fillStyle}
  ${props => props.icon && !props.label && `
    padding: 12px;
  `}
`;

export const StyledLabel = styled.span`
  &:first-child:not(:last-child) {
    margin-right: ${props => parseMetricToInt(props.theme.global.spacing) / 2}px;
  }
`;

export const StyledIcon = styled.span`
  display: inline-block;

  &:first-child:not(:last-child) {
    margin-right: ${props => parseMetricToInt(props.theme.global.spacing) / 2}px;
  }

  > * {
    vertical-align: bottom;
  }
`;

export default StyledButton.extend`
  ${props => props.theme.button.extend}
`;
