import styled from 'styled-components';

import { inputStyle } from '../../utils';
import { defaultProps } from '../../default-props';

const StyledFileInput = styled.input`
  position: absolute;
  height: 100%;
  width: 100%;
  ${inputStyle}
  opacity: 0;
  border: none;
  ${props => !props.disabled && 'cursor: pointer;'}
  ${props => props.offset && `right: ${props.offset}px;`}

  &::-moz-focus-inner {
    border: none;
    outline: none;
  }
`;

StyledFileInput.defaultProps = {};
Object.setPrototypeOf(StyledFileInput.defaultProps, defaultProps);

export { StyledFileInput };
