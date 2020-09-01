import styled from 'styled-components';

import { inputStyle } from '../../utils';
import { defaultProps } from '../../default-props';

const StyledFileInput = styled.input`
  ${inputStyle}
  height: 100%;
  width: 100%;
  opacity: 0;
  border: none;
  cursor: pointer;

  &::-moz-focus-inner {
    border: none;
    outline: none;
  }
`;

StyledFileInput.defaultProps = {};
Object.setPrototypeOf(StyledFileInput.defaultProps, defaultProps);

export { StyledFileInput };
