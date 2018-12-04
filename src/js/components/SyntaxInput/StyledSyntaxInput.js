import styled, { css } from 'styled-components';

import { focusStyle, inputStyle } from '../../utils';

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

export const StyledSyntaxInput = styled.input`
  ${inputStyle} width: 100%;

  ${props => props.size && sizeStyle(props)} ${props =>
    props.plain && plainStyle}

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

  ${props => props.focus && !props.plain && focusStyle};
  ${props => props.theme.SyntaxInput && props.theme.SyntaxInput.extend};
`;

export const StyledSyntaxInputContainer = styled.div`
  position: relative;
  width: 100%;
`;
