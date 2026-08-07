// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled, { css } from 'styled-components';

import {
  controlBorderStyle,
  disabledStyle,
  getInputPadBySide,
  inputStyle,
  parseMetricToNum,
  plainInputStyle,
  textAlignStyle,
  widthStyle,
  styledComponentsConfig,
} from '../../utils';
import { inputPadForIcon } from '../../utils/styles';
import { readOnlyStyle } from '../../utils/readOnly';

const getInputIconPad = (props) => {
  if (props.theme?.icon?.matchSize) {
    return `${
      parseMetricToNum(props.theme.icon?.size?.[props?.size || 'medium']) +
      parseMetricToNum(props.theme.global.edgeSize.medium)
    }px`;
  }
  return props.theme.global.edgeSize.large;
};

const getInlineButtonPad = (props) => {
  const rightInset = parseMetricToNum(getInputPadBySide(props, 'right'));
  const iconPad = parseMetricToNum(getInputIconPad(props));
  // Reserve both the icon space and the control's edge inset so text clears
  // the flush-right password toggle.
  return `${iconPad + rightInset}px`;
};

const getPlainStyle = (plain) => {
  if (plain === 'full') {
    return css`
      ${plainInputStyle} padding: 0;
    `;
  }
  return plain && plainInputStyle;
};

const StyledTextInput = styled.input.withConfig(styledComponentsConfig)`
  ${inputStyle}
  ${(props) => (props.hasButton || props.readOnlyCopy) && 'flex: 1 1 auto;'}
  ${(props) => (props.hasButton || props.readOnlyCopy) && 'min-width: 0;'}
  ${(props) =>
    props.readOnlyCopy || props.hasButton
      ? `padding-${props.reverse ? 'left' : 'right'}: 0px;`
      : ''}
  // readOnly border is handled by StyledTextInputContainer
  ${(props) => props.readOnly && `border: none;`}
  ${(props) => getPlainStyle(props.plain)}
  ${(props) => props.icon && inputPadForIcon}
  ${(props) =>
    props.hasInlineButton && `padding-right: ${getInlineButtonPad(props)};`}
  ${(props) =>
    props.disabled &&
    disabledStyle(
      props.theme.textInput.disabled && props.theme.textInput.disabled.opacity,
    )}
  ${(props) => props.textAlign && textAlignStyle}
  ${(props) =>
    props.widthProp &&
    !props.readOnly &&
    widthStyle(props.widthProp, props.theme)}
  ${(props) => props.theme.textInput && props.theme.textInput.extend};
`;

const StyledTextInputContainer = styled.div.withConfig(styledComponentsConfig)`
  position: relative;
  width: 100%;

  ${(props) =>
    props.widthProp &&
    props.readOnlyProp &&
    widthStyle(props.widthProp, props.theme)}

  ${(props) => props.readOnlyProp && !props.plain && controlBorderStyle};

  ${(props) =>
    (props.readOnlyCopy || props.hasButton) &&
    `
    box-sizing: border-box;
    flex-direction: row;
    display: flex;
    align-items: stretch;
  `};

  ${(props) => props.readOnlyProp && !props.plain && readOnlyStyle(props.theme)}

  ${(props) =>
    props.theme.textInput &&
    props.theme.textInput.container &&
    props.theme.textInput.container.extend};
`;

const StyledPlaceholder = styled.div.withConfig(styledComponentsConfig)`
  position: absolute;
  left: ${(props) =>
    parseMetricToNum(getInputPadBySide(props, 'left')) -
    parseMetricToNum(props.theme.global.control.border.width)}px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  pointer-events: none;

  ${(props) =>
    props.theme.textInput &&
    props.theme.textInput.placeholder &&
    props.theme.textInput.placeholder.extend};
`;

const StyledIcon = styled.div.withConfig(styledComponentsConfig)`
  position: absolute;
  display: flex;
  justify: center;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  ${(props) =>
    props.reverse
      ? `right: ${getInputPadBySide(props, 'right')};`
      : `left: ${getInputPadBySide(props, 'left')};`}
`;

const StyledInlineButton = styled.div.withConfig(styledComponentsConfig)`
  position: absolute;
  display: flex;
  align-items: stretch;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const StyledSuggestions = styled.ol.withConfig(styledComponentsConfig)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin: 0;
  padding: 0;
  list-style-type: none;

  ${(props) =>
    props.theme.textInput &&
    props.theme.textInput.suggestions &&
    props.theme.textInput.suggestions.extend};
`;

export {
  StyledTextInput,
  StyledTextInputContainer,
  StyledPlaceholder,
  StyledIcon,
  StyledInlineButton,
  StyledSuggestions,
};
