import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import { fontSize, lapAndUp } from '../mixins';
import { focusStyle, parseMetricToInt } from '../utils';

const primaryStyle = css`
  background-color: ${props => props.theme.colors.brand};
  color: ${props => props.theme.colors.activeTextColor};

  // TODO: revisit this
  svg {
    fill: ${props => props.theme.colors.activeTextColor};
    stroke: ${props => props.theme.colors.activeTextColor};
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
  return props.theme.button.border.color || props.theme.colors.brand;
}

function getHoverIndicatorStyle(hoverIndicator, theme) {
  let backgroundColor = theme.brand.hover.backgroundColor;
  if (typeof hoverIndicator === 'object') {
    if (
      typeof hoverIndicator.background === 'string'
    ) {
      const colorGroup = hoverIndicator.background.split('-');
      const colorType = colorGroup[0];
      if (!theme.colors[colorType]) {
        console.warn(
          `Invalid color ${hoverIndicator.background}, using ${backgroundColor} instead`
        );
      } else if (colorGroup.length > 1) {
        // subtract one to use the array
        const colorIndex = colorGroup[1] - 1;
        if (theme.colors[colorType].length < colorGroup[1]) {
          console.warn(
            `Invalid color ${hoverIndicator.background}, using ${backgroundColor} instead`
          );
        } else {
          backgroundColor = `${rgba(theme.colors[colorType][colorIndex], 0.3)};`;
        }
      } else if (typeof theme.colors[colorType] !== 'string') {
        console.warn(
          `Invalid color ${hoverIndicator.background}, using ${backgroundColor} instead`
        );
      } else {
        backgroundColor = `${rgba(theme.colors[colorType], 0.3)};`;
      }
    }
  }
  return css`
    background-color: ${backgroundColor};
    color: ${theme.brand.hover.textColor};
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
          fill: ${props.theme.colors.hoverTextColor};
          stroke: ${props.theme.colors.hoverTextColor};
          transition: none;
        }
      `
    )}
    
  }
`;

const plainStyle = css`
  width: auto;
  height: auto;
  min-width: 0;
  max-width: none;
  text-align: inherit;
  font-weight: inherit;
  padding: ${props => parseMetricToInt(props.theme.brand.spacing) / 4}px;
  
  ${props => !props.focus && 'border-color: transparent;'}
`;

const StyledButton = styled.button`
  border: ${props => props.theme.button.border.width} solid ${props => props.theme.button.border.color || props.theme.colors.brand};
  border-radius: ${props => props.theme.button.border.radius};
  color: ${props => props.theme.button.color || props.theme.colors.text};
  cursor: pointer;
  text-align: center;
  outline: none;
  min-width: ${props => props.theme.button.minWidth};
  max-width: ${props => props.theme.button.maxWidth};
  margin: 0;
  overflow: visible;
  text-transform: none;
  background-color: transparent;
  font: inherit;
  font-weight: ${props => props.theme.brand.control.font.weight};

  ${props => (
    !props.disabled && !props.focus && hoverStyle
  )}

  ${props => props.disabled && disabledStyle}

  ${props => fontSize(props.theme.brand.control.font.size, props.theme.brand.spacing)}
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
  ${props => props.plain && plainStyle}
  ${props => props.focus && focusStyle}
  ${lapAndUp(`
    transition: 0.1s ease-in-out;
  `)}
`;

export const StyledLabel = styled.span`
  &:first-child:not(:last-child) {
    margin-right: ${props => parseMetricToInt(props.theme.brand.spacing) / 2}px;
  }
`;

export const StyledIcon = styled.span`
  display: inline-block;

  &:first-child:not(:last-child) {
    margin-right: ${props => parseMetricToInt(props.theme.brand.spacing) / 2}px;
  }

  > * {
    vertical-align: bottom;
  }
`;

export default StyledButton.extend`
  ${props => props.theme.button.extend}
`;
