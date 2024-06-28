import styled from 'styled-components';

import {
  disabledStyle,
  getInputPadBySide,
  inputStyle,
  plainInputStyle,
  textAlignStyle,
  styledComponentsConfig,
} from '../../utils';
import { inputPadForIcon } from '../../utils/styles';
import { withTheme } from '../../default-props';

export const StyledMaskedInput = styled.input
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  ${inputStyle}
  ${(props) => props.plain && plainInputStyle}
  ${(props) => props.icon && inputPadForIcon}
  ${(props) =>
    props.disabled &&
    disabledStyle(
      props.theme.maskedInput.disabled &&
        props.theme.maskedInput.disabled.opacity,
    )}
  ${(props) => props.textAlign && textAlignStyle}
  ${(props) => props.theme.maskedInput && props.theme.maskedInput.extend};
`;

export const StyledMaskedInputContainer = styled.div
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  position: relative;
  width: 100%;

  ${(props) =>
    props.theme.maskedInput &&
    props.theme.maskedInput.container &&
    props.theme.maskedInput.container.extend};
`;

export const StyledIcon = styled.div
  .withConfig(styledComponentsConfig)
  .attrs(withTheme)`
  position: absolute;
  display: flex;
  justify: center;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  ${(props) =>
    props.reverse
      ? `right: ${getInputPadBySide(props, 'right')};`
      : `left: ${getInputPadBySide(props, 'left')};`}
`;
