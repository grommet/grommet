import styled from 'styled-components';

import { normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

const disabledStyle = `
  opacity: 0.5;
  cursor: default;
`;

const StyledToggleButtonGroupContainer = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  width: fit-content;
  ${(props) => props.disabled && disabledStyle} ${(props) =>
    !props.disabled && 'cursor: pointer;'}

  :hover input:not([disabled]) + div,
  :hover input:not([disabled]) + span {
    border-color: ${(props) =>
      // eslint-disable-next-line max-len
      normalizeColor(
        props.theme.toggleButtonGroup.hover.border.color,
        props.theme,
      )};
  }
  :hover {
    background-color: ${(props) =>
      normalizeColor(
        !props.disabled &&
          props.theme.toggleButtonGroup.hover &&
          props.theme.toggleButtonGroup.hover.background &&
          props.theme.toggleButtonGroup.hover.background.color,
        props.theme,
      )};
  }
  ${(props) =>
    props.focus &&
    !props.focusIndicator &&
    `
      input:not([disabled]) + div,
      input:not([disabled]) + span {
      border-color: ${normalizeColor(
        props.theme.toggleButtonGroup.hover.border.color,
        props.theme,
      )};
    }
    `}
`;

StyledToggleButtonGroupContainer.defaultProps = {};
Object.setPrototypeOf(
  StyledToggleButtonGroupContainer.defaultProps,
  defaultProps,
);

export { StyledToggleButtonGroupContainer };
