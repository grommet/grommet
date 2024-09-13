import styled, { css } from 'styled-components';

import {
  edgeStyle,
  focusStyle,
  normalizeColor,
  styledComponentsConfig,
} from '../../utils';
import { Box } from '../Box';

// Note: since `fillStyle` is only used in one place, `justify-content` was
// added to it to simplify its logic. If this is ever reused somewhere else,
// consider the need of separating those once again.
const fillStyle = () => `
      width: auto;
      height: 100%;
      max-width: none;
      flex: 1 0 auto;
      justify-content: space-between;
    `;

const disabledStyle = `
  opacity: 0.5;
  cursor: default;
`;

const hoverStyle = css`
  &:hover input:not([disabled]) + div,
  &:hover input:not([disabled]) + span {
    border-color: ${(props) =>
      normalizeColor(props.theme.checkBox.hover?.border?.color, props.theme)};
    ${(props) => props.theme.checkBox.hover?.extend}
  }
  &:hover {
    background-color: ${(props) =>
      normalizeColor(
        !props.disabled && props.theme.checkBox.hover?.background?.color,
        props.theme,
      )};
  }
`;

const StyledCheckBoxIcon = styled.svg.withConfig(styledComponentsConfig)`
  box-sizing: border-box;
  stroke-width: ${(props) => props.theme.checkBox.check.thickness};
  stroke: ${(props) =>
    normalizeColor(props.theme.checkBox.color || 'control', props.theme)};
  width: ${(props) =>
    props.theme.checkBox.icon.size || props.theme.checkBox.size};
  height: ${(props) =>
    props.theme.checkBox.icon.size || props.theme.checkBox.size};
  ${(props) => props.theme.checkBox.icon.extend};
`;

const StyledCheckBoxContainer = styled.label.withConfig(styledComponentsConfig)`
  display: flex;
  flex-direction: row;
  align-items: ${(props) =>
    typeof props.labelProp === 'string'
      ? props.theme.checkBox.label.align
      : undefined};
  user-select: none;
  -webkit-user-select: none;
  ${(props) => (props.fillProp ? fillStyle() : 'width: fit-content;')}
  ${(props) =>
    (props.pad || props.theme.checkBox.pad) &&
    edgeStyle(
      'padding',
      props.pad || props.theme.checkBox.pad,
      props.responsive,
      props.theme.box.responsiveBreakpoint,
      props.theme,
    )}
  ${(props) => props.disabled && disabledStyle}
  ${(props) => !props.disabled && 'cursor: pointer;'}
  ${hoverStyle}
  // when the CheckBox has focus but there is no focusIndicator,
  // apply the hover styling instead so that keyboard users know
  // which CheckBox is active
  ${(props) =>
    props.focus &&
    !props.focusIndicator &&
    `
    input:not([disabled]) + div,
    input:not([disabled]) + span {
      border-color: ${normalizeColor(
        props.theme.checkBox.hover?.border?.color,
        props.theme,
      )};
    }

    background-color: ${normalizeColor(
      !props.disabled && props.theme.checkBox.hover?.background?.color,
      props.theme,
    )};`}
  ${(props) => props.theme.checkBox.extend}
`;

const StyledCheckBoxInput = styled.input.withConfig(styledComponentsConfig)`
  opacity: 0;
  -moz-appearance: none;
  width: 0;
  height: 0;
  margin: 0;

  ${(props) => !props.disabled && 'cursor: pointer;'} &:checked + span > span {
    ${(props) => (!props.theme.dir ? 'left' : 'right')}: calc(
      ${(props) => props.theme.checkBox.toggle.size} -
        ${(props) => props.theme.checkBox.size}
    );
    background: ${(props) =>
      normalizeColor(props.theme.checkBox.color || 'control', props.theme)};
  }
`;

const StyledCheckBoxBox = styled(Box)`
  ${(props) => props.focus && props.focusIndicator && focusStyle()};
  ${(props) => props.theme.checkBox.check.extend};
`;

const StyledCheckBoxToggle = styled.span.withConfig(styledComponentsConfig)`
  box-sizing: border-box;
  vertical-align: middle;
  display: inline-block;
  width: ${(props) => props.theme.checkBox.toggle.size};
  height: ${(props) => props.theme.checkBox.size};
  border: ${(props) => props.theme.checkBox.border.width} solid;
  border-color: ${(props) =>
    normalizeColor(props.theme.checkBox.border.color, props.theme)};
  border-radius: ${(props) => props.theme.checkBox.toggle.radius};
  background-color: ${(props) =>
    props.theme.checkBox.toggle.background
      ? normalizeColor(props.theme.checkBox.toggle.background, props.theme)
      : 'transparent'};

  ${(props) => props.focus && props.focusIndicator && focusStyle()};
  ${(props) => props.theme.checkBox.toggle.extend};
`;

const StyledCheckBoxKnob = styled.span.withConfig(styledComponentsConfig)`
  box-sizing: border-box;
  position: relative;
  display: inherit;
  top: -${(props) => props.theme.checkBox.border.width};
  ${(props) => (!props.theme.dir ? 'left' : 'right')}: -${(props) =>
    props.theme.checkBox.border.width};
  transition: all 0.3s;
  width: ${(props) => props.theme.checkBox.size};
  height: ${(props) => props.theme.checkBox.size};
  background: ${(props) =>
    normalizeColor(props.theme.checkBox.toggle.color, props.theme)};
  border-radius: ${(props) => props.theme.checkBox.toggle.radius};
  ${(props) => props.theme.checkBox.toggle.knob.extend};
`;

const StyledCheckBox = styled(Box)`
  flex-shrink: 0;
`;

export {
  StyledCheckBoxIcon,
  StyledCheckBoxContainer,
  StyledCheckBoxInput,
  StyledCheckBoxBox,
  StyledCheckBoxToggle,
  StyledCheckBoxKnob,
  StyledCheckBox,
};
