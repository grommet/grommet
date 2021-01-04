import styled, { css } from 'styled-components';

import { disabledStyle, inputStyle } from '../../utils';
import { defaultProps } from '../../default-props';

const plainStyle = css`
  outline: none;
  border: none;
  width: 100%;
  -webkit-appearance: none;
`;

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
  ${inputStyle}
  ${props => props.resize !== undefined && resizeStyle(props.resize)}
  ${props => props.fillArg && 'height: 100%;'}
  ${props => props.plain && plainStyle}
  ${props =>
    props.disabled &&
    disabledStyle(
      props.theme.textArea.disabled && props.theme.textArea.disabled.opacity,
    )}
  ${props => props.theme.textArea && props.theme.textArea.extend};
`;

StyledTextArea.defaultProps = {};
Object.setPrototypeOf(StyledTextArea.defaultProps, defaultProps);

export { StyledTextArea };
