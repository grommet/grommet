import styled, { css } from 'styled-components';

import {
  focusStyle,
  inputStyle,
  parseMetricToNum,
  placeholderStyle,
} from '../../utils';

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
    props.decorator && `padding-right: ${props.theme.global.edgeSize.large};`}

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

export const StyledDecorator = styled.div`
  position: absolute;
  right: ${props =>
    parseMetricToNum(props.theme.global.input.padding) -
    parseMetricToNum(props.theme.global.control.border.width)}px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: flex-end;
  pointer-events: none;

  ${props =>
    props.theme.maskedInput &&
    props.theme.maskedInput.decorator &&
    props.theme.maskedInput.decorator.extend};
`;
