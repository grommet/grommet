import styled, { css } from 'styled-components';

import { focusStyle, inputStyle, parseMetricToInt } from '../utils';

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

// TODO: remove cursor pointer and hover when using button
const suggestionBackgroundStyle = css`
  background-color: ${props => props.theme.global.hover.backgroundColor};
`;

export const StyledSuggestion = styled.li`
  padding: ${props => (
    `${parseMetricToInt(props.theme.global.spacing) / 4}px ${props.theme.global.spacing}`
  )};
  cursor: pointer;

  &:hover {
    ${suggestionBackgroundStyle}
  }

  ${props => props.active && suggestionBackgroundStyle}
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
