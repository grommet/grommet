import styled, { css } from 'styled-components';

import { focusStyle, inputStyle } from '../../utils';
import { defaultProps } from '../../default-props';

const placeholderColor = css`
  color: ${props => props.theme.global.colors.placeholder};
`;

const plainStyle = css`
  border: none;
  width: 100%;
  -webkit-appearance: none;
`;

const StyledTextArea = styled.textarea`
  ${inputStyle} width: 100%;

  ${props => props.fillArg && 'height: 100%;'} ${props =>
    props.plain && plainStyle} &::-webkit-input-placeholder {
    ${placeholderColor};
  }

  &::-moz-placeholder {
    ${placeholderColor};
  }

  &:-ms-input-placeholder {
    ${placeholderColor};
  }

  &::-moz-focus-inner {
    border: none;
    outline: none;
  }

  ${props => props.focus && !props.plain && focusStyle};
  ${props => props.theme.textArea && props.theme.textArea.extend};
`;

StyledTextArea.defaultProps = {};
Object.setPrototypeOf(StyledTextArea.defaultProps, defaultProps);

export { StyledTextArea };
