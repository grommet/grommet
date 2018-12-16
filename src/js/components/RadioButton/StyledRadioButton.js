import styled from 'styled-components';

import { focusStyle, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

const disabledStyle = `
  opacity: 0.5;
  cursor: default;
`;

const StyledRadioButtonContainer = styled.label`
  user-select: none;
  ${props => props.disabled && disabledStyle} ${props =>
    !props.disabled &&
    'cursor: pointer;'}

  :hover input:not([disabled]) + div,
  :hover input:not([disabled]) + span {
    border-color: ${props =>
      normalizeColor(props.theme.radioButton.hover.border.color, props.theme)};
  }

  ${props => props.theme.radioButton.extend};
`;

StyledRadioButtonContainer.defaultProps = {};
Object.setPrototypeOf(StyledRadioButtonContainer.defaultProps, defaultProps);

const StyledRadioButtonInput = styled.input`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  z-index: 1;
  ${props => !props.disabled && 'cursor: pointer;'};
`;

StyledRadioButtonInput.defaultProps = {};
Object.setPrototypeOf(StyledRadioButtonInput.defaultProps, defaultProps);

const StyledRadioButtonIcon = styled.svg`
  box-sizing: border-box;
  position: absolute;
  width: ${props =>
    props.theme.radioButton.icon.size || props.theme.radioButton.size};
  height: ${props =>
    props.theme.radioButton.icon.size || props.theme.radioButton.size};
  fill: ${props =>
    normalizeColor(
      props.theme.radioButton.check.color || 'control',
      props.theme,
    )};
  ${props => props.theme.radioButton.icon.extend};
`;

StyledRadioButtonIcon.defaultProps = {};
Object.setPrototypeOf(StyledRadioButtonIcon.defaultProps, defaultProps);

const StyledRadioButtonBox = styled.div`
  ${props => props.focus && focusStyle};
  ${props => props.theme.radioButton.check.extend};
`;

StyledRadioButtonBox.defaultProps = {};
Object.setPrototypeOf(StyledRadioButtonBox.defaultProps, defaultProps);

const StyledRadioButton = styled.div`
  position: relative;

  ${props => props.theme.radioButton && props.theme.radioButton.extend};
`;

StyledRadioButton.defaultProps = {};
Object.setPrototypeOf(StyledRadioButton.defaultProps, defaultProps);

export {
  StyledRadioButtonContainer,
  StyledRadioButtonInput,
  StyledRadioButtonIcon,
  StyledRadioButtonBox,
  StyledRadioButton,
};
