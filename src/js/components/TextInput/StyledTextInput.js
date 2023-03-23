import styled, { css } from 'styled-components';

import {
  disabledStyle,
  getInputPadBySide,
  inputStyle,
  parseMetricToNum,
  plainInputStyle,
  textAlignStyle,
  widthStyle,
} from '../../utils';
import { defaultProps } from '../../default-props';
import { inputPadForIcon } from '../../utils/styles';

const getPlainStyle = (plain) => {
  if (plain === 'full') {
    return css`
      ${plainInputStyle} padding: 0;
    `;
  }
  return plain && plainInputStyle;
};

const StyledTextInput = styled.input`
  ${inputStyle}
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

StyledTextInput.defaultProps = {};
Object.setPrototypeOf(StyledTextInput.defaultProps, defaultProps);

const StyledTextInputContainer = styled.div`
  position: relative;
  width: 100%;

  ${(props) =>
    props.theme.textInput &&
    props.theme.textInput.container &&
    props.theme.textInput.container.extend};
`;

StyledTextInputContainer.defaultProps = {};
Object.setPrototypeOf(StyledTextInputContainer.defaultProps, defaultProps);

const StyledPlaceholder = styled.div`
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

StyledPlaceholder.defaultProps = {};
Object.setPrototypeOf(StyledPlaceholder.defaultProps, defaultProps);

const StyledIcon = styled.div`
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

const StyledSuggestions = styled.ol`
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

StyledSuggestions.defaultProps = {};
Object.setPrototypeOf(StyledSuggestions.defaultProps, defaultProps);

export {
  StyledTextInput,
  StyledTextInputContainer,
  StyledPlaceholder,
  StyledIcon,
  StyledSuggestions,
};
