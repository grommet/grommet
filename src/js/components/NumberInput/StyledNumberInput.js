import styled, { css } from 'styled-components';
import {
  disabledStyle,
  focusStyle,
  inputStyle,
  parseMetricToNum,
  placeholderStyle,
} from '../../utils';

import { defaultProps } from '../../default-props';

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

const StyledNumberInput = styled.input`
  ${inputStyle} width: 100%;

  ${props => props.size && sizeStyle(props)}
  ${props => props.plain && plainStyle}

  ${placeholderStyle}

  &::-moz-focus-inner {
    border: none;
    outline: none;
  }

  ${props => props.focus && !props.plain && focusStyle};
  ${props =>
    props.disabled &&
    disabledStyle(
      props.theme.NumberInput.disabled &&
        props.theme.NumberInput.disabled.opacity,
    )}
  ${props => props.theme.NumberInput && props.theme.NumberInput.extend};
`;

StyledNumberInput.defaultProps = {};
Object.setPrototypeOf(StyledNumberInput.defaultProps, defaultProps);

const StyledNumberInputContainer = styled.div`
  position: relative;
  width: 100%;

  ${props =>
    props.theme.NumberInput &&
    props.theme.NumberInput.container &&
    props.theme.NumberInput.container.extend};
`;

StyledNumberInputContainer.defaultProps = {};
Object.setPrototypeOf(StyledNumberInputContainer.defaultProps, defaultProps);

const StyledPlaceholder = styled.div`
  position: absolute;
  left: ${props =>
    parseMetricToNum(props.theme.global.input.padding) -
    parseMetricToNum(props.theme.global.control.border.width)}px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  pointer-events: none;

  ${props =>
    props.theme.NumberInput &&
    props.theme.NumberInput.placeholder &&
    props.theme.NumberInput.placeholder.extend};
`;

StyledPlaceholder.defaultProps = {};
Object.setPrototypeOf(StyledPlaceholder.defaultProps, defaultProps);

export { StyledNumberInput, StyledNumberInputContainer, StyledPlaceholder };
