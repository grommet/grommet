import styled from 'styled-components';

import { Button } from '../Button';
import { Text } from '../Text';

const BUTTON_STATES = ['normal', 'active', 'disabled', 'hover'];

// Assemble button theme object for each button state
const buildButtonStyle = (buttonTheme, kind) => {
  const style = buttonTheme[kind];
  BUTTON_STATES.forEach(state => {
    if (state !== 'normal' && buttonTheme[state])
      style[state] = buttonTheme[state][kind];
  });
  return style;
};

// Allow padding to flex when border is present. Calculated adjusted
// padding needed (if any) for each button state.
const calcAdjustedPadding = (buttonStyle, pad) => {
  const adjustedPadding = {};

  BUTTON_STATES.forEach(state => {
    const border =
      (buttonStyle[state] &&
        buttonStyle[state].border &&
        buttonStyle[state].border.width) ||
      (buttonStyle.border && buttonStyle.border.width) ||
      '0px';

    const adjustedPad = `${pad.replace('px', '') - border.replace('px', '')}px`;
    adjustedPadding[state] = { pad: undefined };
    adjustedPadding[state].pad = adjustedPad;
  });
  return adjustedPadding;
};

const sizeStyle = props => {
  const style =
    props.theme.pagination.control &&
    props.theme.pagination.control.size &&
    props.theme.pagination.control.size[props.controlSize || 'medium'];

  return style
    ? {
        content: {
          fontSize: style.font && style.font.size,
          lineHeight: style.font && style.font.height,
          borderRadius: style.border && style.border.radius,
          borderWidth: style.border && style.border.width,
        },
        container: {
          height: style.height,
          minWidth: style.width,
        },
      }
    : '';
};

export const StyledPaginationButton = styled(Button)`
  ${props => {
    const buttonStyle =
      typeof props.kind === 'string'
        ? buildButtonStyle(props.theme.button, props.kind)
        : props.kind;
    const adjustedPadding = calcAdjustedPadding(
      buttonStyle,
      props.theme.pagination.control.pad,
    );
    let buttonState = 'normal';
    if (props.active) buttonState = 'active';
    else if (props.disabled) buttonState = 'disabled';

    return `
      padding: ${adjustedPadding[buttonState].pad};
      ${
        buttonState === 'disabled'
          ? ''
          : `:hover { padding: ${adjustedPadding.hover.pad}; }`
      }
    `;
  }}

  > svg {
    vertical-align: middle;
  }
  ${props => sizeStyle(props).content};
`;

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  ${props => sizeStyle(props).container};
  ${props =>
    props.theme.pagination.control && props.theme.pagination.control.extend};
`;

export const StyledSeparator = styled(Text)`
  font-weight: bold;
  ${props => `font-size: ${sizeStyle(props).content.fontSize}`};
  ${props => `line-height: ${sizeStyle(props).content.lineHeight}`};
`;
