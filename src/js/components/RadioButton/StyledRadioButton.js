import styled from 'styled-components';

import { focusStyle } from '../../utils';

const disabledStyle = `
  opacity: 0.5;
  cursor: default;
`;

export const StyledRadioButtonContainer = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  user-select: none;
  ${props => props.disabled && disabledStyle}

  > div:first-child {
    ${props => `margin-right: ${props.theme.global.edgeSize.small};`}
  }

  :hover input:not([disabled]) + div {
    border-color: ${props => (props.theme.dark ? props.theme.global.colors.white : props.theme.global.colors.black)};
  }
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

  :focus + div,
  :focus + span {
    ${focusStyle}
  }

  :checked + div {
    border-color: ${props => (props.theme.radioButton.check.color ||
      props.theme.global.control.color)[props.theme.dark ? 'dark' : 'light']};
  }

  :checked + div > svg {
    display: block;
  }

  :checked + span > span {
    left: ${props => props.theme.radioButton.size};
    background: ${props => (props.theme.radioButton.check.color ||
      props.theme.global.control.color)[props.theme.dark ? 'dark' : 'light']};
  }
`;

export const StyledRadioButtonButton = styled.div`
  box-sizing: border-box;
  position: relative;
  top: -1px;
  display: inline-block;
  width: ${props => props.theme.radioButton.size};
  height: ${props => props.theme.radioButton.size};
  vertical-align: middle;
  background: inherit;
  border: ${props => props.theme.radioButton.border.width} solid;
  border-color: ${props => props.theme.radioButton.border.color[props.theme.dark ? 'dark' : 'light']};
  border-radius: ${props => props.theme.radioButton.border.radius};

  > svg {
    box-sizing: border-box;
    position: absolute;
    top: -2px;
    left: -2px;
    display: none;
    width: ${props => props.theme.radioButton.size};
    height: ${props => props.theme.radioButton.size};
    fill: ${props => (props.theme.radioButton.check.color ||
      props.theme.global.control.color)[props.theme.dark ? 'dark' : 'light']};
  }
`;

export const StyledRadioButton = styled.div`
  position: relative;

  ${props => props.theme.radioButton && props.theme.radioButton.extend}
`;
