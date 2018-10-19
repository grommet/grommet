import styled from 'styled-components';

import { focusStyle, normalizeColor } from '../../utils';

const disabledStyle = `
  opacity: 0.5;
  cursor: default;
`;

export const StyledRadioButtonContainer = styled.label`
  user-select: none;
  ${props => props.disabled && disabledStyle}
  ${props => !props.disabled && 'cursor: pointer;'}

  :hover input:not([disabled]) + div {
    border-color: ${props => (props.theme.dark
      ? props.theme.radioButton.hover.border.color.dark
      : props.theme.radioButton.hover.border.color.light)};
  }

  ${props => props.theme.radioButton.extend}
`;

export const StyledRadioButtonInput = styled.input`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  z-index: 1;
`;

export const StyledRadioButtonIcon = styled.svg`
  width: ${props => props.theme.radioButton.size};
  height: ${props => props.theme.radioButton.size};
  fill: ${props => normalizeColor(props.theme.radioButton.check.color || 'control', props.theme)};
  ${props => props.theme.radioButton.icon.extend}
`;

export const StyledRadioButtonBox = styled.div`
  ${props => props.focus && focusStyle};
  ${props => props.theme.radioButton.check.extend};
`;

export const StyledRadioButton = styled.div`
  position: relative;

  ${props => props.theme.radioButton && props.theme.radioButton.extend}
`;
