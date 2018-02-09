import styled from 'styled-components';

import { focusStyle } from '../../utils';

export const StyledCheckBoxContainer = styled.label`
  display: flex;
  flex-direction: ${props => (props.reverse ? 'row-reverse' : 'row')};
  align-items: center;
  cursor: pointer;
  user-select: none;

  > div:first-child {
    ${props => (props.reverse ?
      `margin-left: ${props.theme.global.edgeSize.small};` :
      `margin-right: ${props.theme.global.edgeSize.small};`
    )}
  }

  :hover input:not([disabled]) + div,
  :hover input:not([disabled]) + span {
    border-color: ${props => (props.grommet.dark ? props.theme.global.colors.white : props.theme.global.colors.black)};
  }
`;

export const StyledCheckBoxInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;

  :focus + div,
  :focus + span {
    ${focusStyle}
  }

  :checked + div {
    border-color: ${props => (props.grommet.dark ? props.theme.global.colors.white : props.theme.checkBox.check.color)};
  }

  :checked + div > svg {
    display: block;
  }

  :checked + span > span {
    left: ${props => props.theme.checkBox.size};
    background-color: ${props => (props.grommet.dark ? props.theme.global.colors.white : props.theme.checkBox.check.color)};
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
  background-color: inherit;
  border: ${props => props.theme.checkBox.border.width} solid;
  border-color: ${props => props.theme.checkBox.border.color[props.grommet.dark ? 'dark' : 'light']};
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
    stroke: ${props => (props.grommet.dark ? props.theme.global.colors.white : props.theme.checkBox.check.color)};
  }
`;

export const StyledCheckBoxToggle = styled.span`
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  display: inline-block;
  width: ${props => props.theme.checkBox.toggle.size};
  height: ${props => props.theme.checkBox.size};
  border: ${props => props.theme.checkBox.border.width} solid;
  border-color: ${props => props.theme.checkBox.border.color[props.grommet.dark ? 'dark' : 'light']};
  border-radius: ${props => props.theme.checkBox.toggle.radius};
`;

export const StyledCheckBoxKnob = styled.span`
  box-sizing: border-box;
  position: absolute;
  top: -${props => props.theme.checkBox.border.width};
  left: -${props => props.theme.checkBox.border.width};
  transition: all 0.3s;
  width: ${props => props.theme.checkBox.size};
  height: ${props => props.theme.checkBox.size};
  background-color: ${props => props.theme.checkBox.toggle.color};
  border-radius: ${props => props.theme.checkBox.toggle.radius};
`;

const StyledCheckBox = styled.div`
`;

export default StyledCheckBox.extend`
  ${props => props.theme.checkBox && props.theme.checkBox.extend}
`;
