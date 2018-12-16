import styled, { css } from 'styled-components';

import { focusStyle, inputStyle, placeholderStyle } from '../../utils';
import { defaultProps } from '../../default-props';

const plainStyle = css`
  border: none;
  width: 100%;
  -webkit-appearance: none;
`;

const StyledTextArea = styled.textarea`
  ${inputStyle} width: 100%;

  ${props => props.fillArg && 'height: 100%;'} ${props =>
  props.plain && plainStyle}

  ${placeholderStyle}

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
