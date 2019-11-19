import styled, { css } from 'styled-components';

import {
  disabledStyle,
  focusStyle,
  inputStyle,
  placeholderStyle,
} from '../../utils';
import { defaultProps } from '../../default-props';

const plainStyle = css`
  border: none;
  width: 100%;
  -webkit-appearance: none;
`;

const sizeStyle = props => {
  const data = props.theme.text[props.size];
  return css`
    font-size: ${data.size};
    line-height: ${data.height};
  `;
};

const resizeStyle = resize => {
  if (resize === 'horizontal') {
    return 'resize: horizontal;';
  }
  if (resize === 'vertical') {
    return 'resize: vertical;';
  }
  if (resize) {
    return 'resize: both;';
  }
  return 'resize: none;';
};

const StyledTextArea = styled.textarea`
  ${inputStyle} width: 100%;
  ${props => props.resize !== undefined && resizeStyle(props.resize)}

  ${props => props.fillArg && 'height: 100%;'}
  ${props => props.size && sizeStyle(props)}
  ${props => props.plain && plainStyle}
  ${props =>
    props.disabled &&
    disabledStyle(
      props.theme.textArea.disabled && props.theme.textArea.disabled.opacity,
    )}

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
