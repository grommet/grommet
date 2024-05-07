import styled, { css } from 'styled-components';

import { focusStyle, normalizeColor } from '../../utils';
import { getDefaultProps } from '../../default-props';

const disabledStyle = `
  opacity: 0.5;
  cursor: default;
`;

const StyledRadioButtonContainer = styled.label.attrs(getDefaultProps)`
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  width: fit-content;
  ${(props) => props.disabled && disabledStyle} ${(props) =>
    !props.disabled && 'cursor: pointer;'}

  :hover input:not([disabled]) + div,
  :hover input:not([disabled]) + span {
    border-color: ${(props) =>
      normalizeColor(props.theme.radioButton.hover.border.color, props.theme)};
  }
  :hover {
    background-color: ${(props) =>
      normalizeColor(
        !props.disabled &&
          props.theme.radioButton.hover &&
          props.theme.radioButton.hover.background &&
          props.theme.radioButton.hover.background.color,
        props.theme,
      )};
  }
  // when the RadioButton has focus but there is no focusIndicator,
  // apply the hover styling instead so that keyboard users know
  // which RadioButton is active
  ${(props) =>
    props.focus &&
    !props.focusIndicator &&
    `
      input:not([disabled]) + div,
      input:not([disabled]) + span {
      border-color: ${normalizeColor(
        props.theme.radioButton.hover.border.color,
        props.theme,
      )};
    }
    background-color: ${normalizeColor(
      !props.disabled &&
        props.theme.radioButton.hover &&
        props.theme.radioButton.hover.background &&
        props.theme.radioButton.hover.background.color,
      props.theme,
    )};
    `}
  ${(props) => props.theme.radioButton.container.extend};
`;

const StyledRadioButtonInput = styled.input.attrs(getDefaultProps)`
  opacity: 0;
  -moz-appearance: none;
  width: 0;
  height: 0;
  margin: 0;
  ${(props) => !props.disabled && 'cursor: pointer;'};
`;

const StyledRadioButtonLabel = styled.span.attrs(getDefaultProps)`
  ${(props) =>
    props.theme.radioButton.font.weight &&
    css`
      font-weight: ${props.theme.radioButton.font.weight};
    `}
`;

const StyledRadioButtonIcon = styled.svg.attrs(getDefaultProps)`
  box-sizing: border-box;
  width: ${(props) =>
    props.theme.radioButton.icon.size || props.theme.radioButton.size};
  height: ${(props) =>
    props.theme.radioButton.icon.size || props.theme.radioButton.size};
  fill: ${(props) =>
    normalizeColor(
      props.theme.radioButton.check.color || 'control',
      props.theme,
    )};
  ${(props) => props.theme.radioButton.icon.extend};
`;

const StyledRadioButtonBox = styled.div.attrs(getDefaultProps)`
  background-color: ${(props) => props.backgroundColor};
  ${(props) => props.focus && focusStyle()};
  ${(props) => props.theme.radioButton.check.extend};
`;

const StyledRadioButton = styled.div.attrs(getDefaultProps)`
  ${(props) => props.theme.radioButton && props.theme.radioButton.extend};
`;

export {
  StyledRadioButtonContainer,
  StyledRadioButtonInput,
  StyledRadioButtonLabel,
  StyledRadioButtonIcon,
  StyledRadioButtonBox,
  StyledRadioButton,
};
