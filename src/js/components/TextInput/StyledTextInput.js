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
import { withTheme } from '../../default-props';

const getPlainStyle = (plain) => {
  if (plain === 'full') {
    return css`
      ${plainInputStyle} padding: 0;
    `;
  }
  return plain && plainInputStyle;
};

const StyledTextInput = styled.input
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  ${inputStyle}
  ${(props) =>
    props.readOnlyCopy
      ? `padding-${props.reverse ? 'left' : 'right'}: 0px;`
      : ''}
  // readOnly border is handled by StyledTextInputContainer
  ${(props) => props.readOnly && `border: none;`}
  ${(props) => getPlainStyle(props.plain)}
  ${(props) => props.icon && inputPadForIcon}
  ${(props) =>
    props.disabled &&
    disabledStyle(
      props.theme.textInput.disabled && props.theme.textInput.disabled.opacity,
    )}
  ${(props) => props.textAlign && textAlignStyle}
  ${(props) => props.widthProp && widthStyle(props.widthProp, props.theme)}
  ${(props) => props.theme.textInput && props.theme.textInput.extend};
`;

const StyledTextInputContainer = styled.div
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  position: relative;
  width: 100%;

  ${(props) => props.readOnlyProp && !props.plain && controlBorderStyle};

  ${(props) =>
    props.readOnlyCopy &&
    `
    box-sizing: border-box;
    flex-direction: row;
    display: flex;
  `};

  ${(props) => props.readOnlyProp && !props.plain && readOnlyStyle(props.theme)}

  ${(props) =>
    props.theme.textInput &&
    props.theme.textInput.container &&
    props.theme.textInput.container.extend};
`;

const StyledPlaceholder = styled.div
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
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

const StyledIcon = styled.div
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
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

const StyledSuggestions = styled.ol
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
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
  StyledSuggestions,
};
