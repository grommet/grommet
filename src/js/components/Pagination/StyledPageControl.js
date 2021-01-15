import styled from 'styled-components';

import { Button } from '../Button';

const BUTTON_STATES = ['normal', 'active', 'disabled', 'hover'];
const defaultStyles = {
  border: {
    radius: '4px',
  },
  pad: '4px',
};

// Assemble button theme object for each button state
const buildButtonStyle = (buttonTheme, kind) => {
  const style = buttonTheme[kind];
  BUTTON_STATES.forEach(state => {
    if (state !== 'normal') style[state] = buttonTheme[state][kind];
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

// sizeStyle is exploratory, but would allow user to apply a size
// prop to their Pagination component which would scale everything
// up or down. This does not necessarily have to be part of the first pass,
// but we wanted to explore the possibility
const sizeStyle = props => {
  const style =
    props.theme.pagination.control &&
    props.theme.pagination.control.size &&
    // need to create a size prop if this is functionality we desire
    props.theme.pagination.control.size[props.sizeProp || 'medium'];

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
    const adjustedPadding = calcAdjustedPadding(buttonStyle, defaultStyles.pad);
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
  
  border-radius: ${defaultStyles.border.radius};
  ${props => sizeStyle(props).content};
`;

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px; // default line-height + default padding
  max-width: 100%;
  min-width: 32px; // default line-height + default padding
  ${props => sizeStyle(props).container};
  ${props =>
    props.theme.pagination.control && props.theme.pagination.control.extend};
`;
