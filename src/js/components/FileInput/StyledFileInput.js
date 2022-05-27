import styled from 'styled-components';

import { inputStyle } from '../../utils';
import { defaultProps } from '../../default-props';

const StyledFileInput = styled.input`
  position: absolute;
  height: 100%;
  width: 100%;
  ${inputStyle}
  font-size: 0;
  opacity: 0;
  border: none;
  ${(props) => !props.disabled && 'cursor: pointer;'}
  ${(props) =>
    props.rightOffset &&
    `
    width: calc(100% - ${props.rightOffset}px);
    right: ${props.rightOffset}px;
    `}

  &::-moz-focus-inner {
    border: none;
    outline: none;
  }
  &::-webkit-file-upload-button {
    cursor: pointer;
  }
`;

StyledFileInput.defaultProps = {};
Object.setPrototypeOf(StyledFileInput.defaultProps, defaultProps);

export { StyledFileInput };
