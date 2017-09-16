import styled, { css } from 'styled-components';

import { focusStyle, inputStyle } from '../utils';

const placeholderColor = css`
  color: ${props => props.theme.global.placeholder.color};
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
  width: 100%;
`;

const StyledTextInput = styled.input`
  ${inputStyle}

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
    ${props => !props.plain && focusStyle}
  }
`;

export const StyledTextInputContainer = styled.div`
  ${props => props.plain && 'width: 100%'}
`;

const selectedStyle = css`
  background-color: ${
    props => props.theme.global.selected.backgroundColor
  };
  color: ${props => props.theme.global.selected.textColor};
`;

export const StyledSuggestion = styled.div`
  ${props => props.selected && selectedStyle}
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
