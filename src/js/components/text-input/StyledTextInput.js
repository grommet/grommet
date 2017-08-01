import styled, { css } from 'styled-components';

import { focusStyle } from '../utils';
import { inputStyle } from '../mixins';

const placeholderColor = css`
  color: ${props => props.theme.global.placeholder.color};
`;
const StyledTextInput = styled.input`
  ${inputStyle}

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
    ${focusStyle}
  }
`;

export default StyledTextInput.extend`
  ${props => props.theme.textInput && props.theme.textInput.extend}
`;
