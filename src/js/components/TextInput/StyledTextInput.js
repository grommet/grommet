import styled, { css } from 'styled-components';

import { inputStyle, parseMetricToNum } from '../../utils';

const placeholderColor = css`
  color: ${props => props.theme.global.colors.placeholder};
`;

const sizeStyle = props => {
  const data = props.theme.text[props.size];
  return css`
    font-size: ${data.size};
    line-height: ${data.height};
  `;
};

const plainStyle = css`
  border: none;
`;

export const StyledTextInput = styled.input`
  ${inputStyle} width: 100%;

  ${props => props.size && sizeStyle(props)} ${props => props.plain && plainStyle}

  &::-webkit-input-placeholder {
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

  ${props => props.theme.textInput && props.theme.textInput.extend};
`;

export const StyledTextInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledPlaceholder = styled.div`
  position: absolute;
  left: ${props => parseMetricToNum(props.theme.global.spacing) / 2 - parseMetricToNum(props.theme.global.control.border.width)}px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
`;

export const StyledSuggestions = styled.ol`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;
