import styled, { css } from 'styled-components';

import { focusStyle, normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

const disabledStyle = `
  opacity: 0.5;
  cursor: default;
`;

const hoverStyle = css`
  :hover input:not([disabled]) + div,
  :hover input:not([disabled]) + span {
    border-color: ${props =>
      normalizeColor(props.theme.checkBox.hover.border.color, props.theme)};
  }
`;

const StyledCheckBoxIcon = styled.svg`
  box-sizing: border-box;
  position: absolute;
  stroke-width: ${props => props.theme.checkBox.check.thickness};
  stroke: ${props =>
    normalizeColor(props.theme.checkBox.color || 'control', props.theme)};
  width: ${props =>
    props.theme.checkBox.icon.size || props.theme.checkBox.size};
  height: ${props =>
    props.theme.checkBox.icon.size || props.theme.checkBox.size};
  ${props => props.theme.checkBox.icon.extend};
`;

StyledCheckBoxIcon.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxIcon.defaultProps, defaultProps);

const StyledCheckBoxContainer = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  ${props => props.disabled && disabledStyle}
  ${props => !props.disabled && 'cursor: pointer;'}
  ${props => props.theme.checkBox.hover.border.color && hoverStyle}
  ${props => props.theme.checkBox.extend}
`;

StyledCheckBoxContainer.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxContainer.defaultProps, defaultProps);

const StyledCheckBoxInput = styled.input`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  ${props => !props.disabled && 'cursor: pointer;'} :checked + span > span {
    left: calc(
      ${props => props.theme.checkBox.toggle.size} -
        ${props => props.theme.checkBox.size}
    );
    background: ${props =>
      normalizeColor(props.theme.checkBox.color || 'control', props.theme)};
  }
`;

StyledCheckBoxInput.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxInput.defaultProps, defaultProps);

const StyledCheckBoxBox = styled.div`
  ${props => props.focus && focusStyle};
  ${props => props.theme.checkBox.check.extend};
`;

StyledCheckBoxBox.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxBox.defaultProps, defaultProps);

const StyledCheckBoxToggle = styled.span`
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  display: inline-block;
  width: ${props => props.theme.checkBox.toggle.size};
  height: ${props => props.theme.checkBox.size};
  border: ${props => props.theme.checkBox.border.width} solid;
  border-color: ${props =>
    normalizeColor(props.theme.checkBox.border.color, props.theme)};
  border-radius: ${props => props.theme.checkBox.toggle.radius};
  background-color: ${props =>
    props.theme.checkBox.toggle.background
      ? normalizeColor(props.theme.checkBox.toggle.background, props.theme)
      : 'transparent'};

  ${props => props.focus && focusStyle};
  ${props => props.theme.checkBox.toggle.extend};
`;

StyledCheckBoxToggle.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxToggle.defaultProps, defaultProps);

const StyledCheckBoxKnob = styled.span`
  box-sizing: border-box;
  position: absolute;
  top: -${props => props.theme.checkBox.border.width};
  left: -${props => props.theme.checkBox.border.width};
  transition: all 0.3s;
  width: ${props => props.theme.checkBox.size};
  height: ${props => props.theme.checkBox.size};
  background: ${props =>
    normalizeColor(
      props.theme.checkBox.toggle.color[props.theme.dark ? 'dark' : 'light'],
      props.theme,
    )};
  border-radius: ${props => props.theme.checkBox.toggle.radius};
  ${props => props.theme.checkBox.toggle.knob.extend};
`;

StyledCheckBoxKnob.defaultProps = {};
Object.setPrototypeOf(StyledCheckBoxKnob.defaultProps, defaultProps);

const StyledCheckBox = styled.div`
  position: relative;
  flex-shrink: 0;
`;

StyledCheckBox.defaultProps = {};
Object.setPrototypeOf(StyledCheckBox.defaultProps, defaultProps);

export {
  StyledCheckBoxIcon,
  StyledCheckBoxContainer,
  StyledCheckBoxInput,
  StyledCheckBoxBox,
  StyledCheckBoxToggle,
  StyledCheckBoxKnob,
  StyledCheckBox,
};
