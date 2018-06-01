import styled, { css } from 'styled-components';

import { focusStyle, inputStyle } from '../../utils';

const placeholderColor = css`
  color: ${props => props.theme.global.colors.placeholder};
`;

const sizeStyle = (props) => {
  const data = props.theme.text[props.size];
  return css`
    font-size: ${data.size};
    line-height: ${data.height};
  `;
};

const plainStyle = css`
  border: none;
  -webkit-appearance: none;
`;

const StyledTextInput = styled.input`
  ${inputStyle}
  width: 100%;
  -webkit-appearance: textfield;

  ${props => props.size && sizeStyle(props)}
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

export const StyledTextInputContainer = styled.div`
  width: 100%;
`;

export const StyledSuggestions = styled.ol`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export default StyledTextInput.extend`
  ${props => props.theme.textInput && props.theme.textInput.extend}
`;
