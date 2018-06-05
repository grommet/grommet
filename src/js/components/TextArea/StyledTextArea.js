import styled, { css } from 'styled-components';

import { baseStyle, focusStyle, inputStyle } from '../../utils';

const placeholderColor = css`
  color: ${props => props.theme.global.colors.placeholder};
`;

const plainStyle = css`
  border: none;
  width: 100%;
  -webkit-appearance: none;
`;

const StyledTextArea = styled.textarea`
  ${baseStyle}
  ${inputStyle}
  width: 100%;

  ${props => props.plain && plainStyle}

  &::-webkit-input-placeholder {
    ${placeholderColor}
  }

  &::-moz-placeholder {
    ${placeholderColor}
  }

  &:-ms-input-placeholder {
    ${placeholderColor}
  }

  &::-moz-focus-inner {
    border: none;
    outline: none;
  }

  &:focus {
    ${props => (!props.plain || props.focusIndicator) && focusStyle}
  }
`;

export default StyledTextArea.extend`
  ${props => props.theme.textArea && props.theme.textArea.extend}
`;
