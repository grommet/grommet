import styled, { css } from 'styled-components';

import { focusStyle } from '../../utils';

const disabledStyle = `
  opacity: 0.5;
  cursor: default;
`;

const hoverStyle = css`
  :hover input:not([disabled]) + div,
  :hover input:not([disabled]) + span {
    border-color: ${props => (props.theme.dark
      ? props.theme.checkBox.hover.border.color.dark
      : props.theme.checkBox.hover.border.color.light)};
  }
`;

export const StyledCheckBoxContainer = styled.label`
  display: flex;
  flex-direction: ${props => (props.reverse ? 'row-reverse' : 'row')};
  align-items: center;
  cursor: pointer;
  user-select: none;
  ${props => props.disabled && disabledStyle}

  > div:first-child {
    ${props => (props.reverse
      ? `margin-left: ${props.theme.global.edgeSize.small};`
      : `margin-right: ${props.theme.global.edgeSize.small};`
    )}
  }

  ${props => props.theme.checkBox.hover.border.color && hoverStyle}
`;

export const StyledCheckBoxInput = styled.input`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  z-index: 1;
  cursor: pointer;

  :checked + div {
    border-color: ${props => (props.theme.checkBox.check.color
      || props.theme.global.control.color)[props.theme.dark ? 'dark' : 'light']};
  }

  :checked + div > svg {
    display: block;
  }

  :checked + span > span {
    left: ${props => props.theme.checkBox.size};
    background: ${props => (props.theme.checkBox.check.color
      || props.theme.global.control.color)[props.theme.dark ? 'dark' : 'light']};
  }
`;

export const StyledCheckBoxBox = styled.div`
  box-sizing: border-box;
  position: relative;
  top: -1px;
  display: inline-block;
  width: ${props => props.theme.checkBox.size};
  height: ${props => props.theme.checkBox.size};
  vertical-align: middle;
  background: inherit;
  border: ${props => props.theme.checkBox.border.width} solid;
  border-color: ${props => props.theme.checkBox.border.color[props.theme.dark ? 'dark' : 'light']};
  border-radius: ${props => props.theme.checkBox.border.radius};

  > svg {
    box-sizing: border-box;
    position: absolute;
    top: -2px;
    left: -2px;
    display: none;
    width: ${props => props.theme.checkBox.size};
    height: ${props => props.theme.checkBox.size};
    stroke-width: ${props => props.theme.checkBox.check.width};
    stroke: ${props => (props.theme.checkBox.check.color
      || props.theme.global.control.color)[props.theme.dark ? 'dark' : 'light']};
  }

  ${props => props.focus && focusStyle};
`;

export const StyledCheckBoxToggle = styled.span`
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  display: inline-block;
  width: ${props => props.theme.checkBox.toggle.size};
  height: ${props => props.theme.checkBox.size};
  border: ${props => props.theme.checkBox.border.width} solid;
  border-color: ${props => props.theme.checkBox.border.color[props.theme.dark ? 'dark' : 'light']};
  border-radius: ${props => props.theme.checkBox.toggle.radius};

  ${props => props.focus && focusStyle};
`;

export const StyledCheckBoxKnob = styled.span`
  box-sizing: border-box;
  position: absolute;
  top: -${props => props.theme.checkBox.border.width};
  left: -${props => props.theme.checkBox.border.width};
  transition: all 0.3s;
  width: ${props => props.theme.checkBox.size};
  height: ${props => props.theme.checkBox.size};
  background: ${props => props.theme.checkBox.toggle.color[props.theme.dark ? 'dark' : 'light']};
  border-radius: ${props => props.theme.checkBox.toggle.radius};
`;

export const StyledCheckBox = styled.div`
  position: relative;

  ${props => props.theme.checkBox && props.theme.checkBox.extend}
`;
