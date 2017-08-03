import styled, { css } from 'styled-components';
import { lighten } from 'polished';

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

const activeStyle = css`
  background-color: ${props => props.theme.global.hover.backgroundColor};
  color: ${props => props.theme.global.hover.textColor};
`;
const selectedStyle = css`
  background-color: ${
    props => props.theme.global.selected.backgroundColor ||
    lighten(0.23, props.theme.global.colors.brand)
  };
  color: ${props => props.theme.global.selected.textColor};
`;

export const StyledSuggestion = styled.div`
  padding: ${props => (
    `${parseMetricToInt(props.theme.global.spacing) / 4}px ${props.theme.global.spacing}`
  )};

  ${props => props.selected && selectedStyle}
  ${props => props.active && activeStyle}
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
