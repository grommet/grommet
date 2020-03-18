import styled, { css } from 'styled-components';

import { focusStyle, inputStyle, placeholderStyle } from '../../utils';

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

export const StyledMaskedInput = styled.input`
  ${inputStyle} width: 100%;

  ${props => props.size && sizeStyle(props)} ${props =>
  props.plain && plainStyle}

  ${placeholderStyle}
  ${props =>
    props.icon &&
    (props.reverse
      ? `padding-right: ${props.theme.global.edgeSize.large};`
      : `padding-left: ${props.theme.global.edgeSize.large};`)}

  &::-moz-focus-inner {
    border: none;
    outline: none;
  }

  ${props => props.focus && !props.plain && focusStyle};
  ${props => props.theme.maskedInput && props.theme.maskedInput.extend};
`;

export const StyledMaskedInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledIcon = styled.div`
  position: absolute;
  display: flex;
  justify: center;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  ${props =>
    props.reverse
      ? `right: ${props.theme.global.input.padding};`
      : `left: ${props.theme.global.input.padding};`}
`;
