import styled from 'styled-components';

import {
  disabledStyle,
  getInputPadBySide,
  inputStyle,
  plainInputStyle,
} from '../../utils';

export const StyledMaskedInput = styled.input`
  ${inputStyle}
  ${props => props.plain && plainInputStyle}
  ${props =>
    props.icon &&
    (props.reverse
      ? `padding-right: ${props.theme.global.edgeSize.large};`
      : `padding-left: ${props.theme.global.edgeSize.large};`)}
  ${props =>
    props.disabled &&
    disabledStyle(
      props.theme.maskedInput.disabled &&
        props.theme.maskedInput.disabled.opacity,
    )}
  ${props => props.theme.maskedInput && props.theme.maskedInput.extend};
`;

export const StyledMaskedInputContainer = styled.div`
  position: relative;
  width: 100%;

  ${props =>
    props.theme.maskedInput &&
    props.theme.maskedInput.container &&
    props.theme.maskedInput.container.extend};
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
      ? `right: ${getInputPadBySide(props, 'right')};`
      : `left: ${getInputPadBySide(props, 'left')};`}
`;
