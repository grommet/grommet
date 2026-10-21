// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled, { css } from 'styled-components';

import {
  backgroundStyle,
  borderStyle,
  edgeStyle,
  elevationStyle,
  focusStyle,
  heightStyle,
  normalizeColor,
  roundStyle,
  styledComponentsConfig,
  widthStyle,
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

const boxPartStyles = (part, props, container = false) => {
  const { theme } = props;
  const responsive = props.responsive ?? true;
  const styles = [];
  if (part.border !== undefined)
    styles.push(
      part.border === false
        ? 'border: none;'
        : borderStyle(part.border, responsive, theme),
    );
  if (part.elevation !== undefined) styles.push(elevationStyle(part.elevation));
  if (part.height !== undefined) styles.push(heightStyle(part.height, theme));
  if (part.width !== undefined) styles.push(widthStyle(part.width, theme));
  if (part.margin !== undefined)
    styles.push(
      edgeStyle(
        'margin',
        part.margin,
        responsive,
        theme.box.responsiveBreakpoint,
        theme,
      ),
    );
  if (part.pad !== undefined && (!container || props.pad === undefined))
    styles.push(
      edgeStyle(
        'padding',
        part.pad,
        responsive,
        theme.box.responsiveBreakpoint,
        theme,
      ),
    );
  if (part.round !== undefined)
    styles.push(
      part.round === false
        ? 'border-radius: 0;'
        : roundStyle(part.round, responsive, theme),
    );
  return styles;
};

const mergeControlBorder = (base, override) => {
  if (override === undefined) return base;
  if (
    base &&
    override &&
    typeof base === 'object' &&
    typeof override === 'object' &&
    !Array.isArray(base) &&
    !Array.isArray(override)
  )
    return { ...base, ...override };
  return override;
};

const controlHoverStyle = (props) => {
  const { control } = props.theme.checkBox;
  if (props.disabled) return undefined;

  const selected = props.checked || props.indeterminate;
  const state = selected ? control?.selected?.hover : control?.hover;
  const part = { ...state };
  if (state?.border !== undefined) {
    const { checkBox } = props.theme;
    const baseBorder = {
      size: checkBox.border.width,
      color: props.checked
        ? checkBox.color || 'control'
        : checkBox.border.color,
    };
    part.border = mergeControlBorder(
      mergeControlBorder(
        mergeControlBorder(baseBorder, control?.border),
        selected ? control?.selected?.border : undefined,
      ),
      state.border,
    );
  }
  const styles = boxPartStyles(part, props);
  if (state?.background != null)
    styles.push(backgroundStyle(state.background, props.theme, false));
  if (styles.length === 0) return undefined;
  return css`
    input:not([disabled])
      + ${
        // eslint-disable-next-line no-use-before-define
        StyledCheckBoxBox
      } {
      ${styles}
    }
  `;
};

const containerBackgroundStyle = (props) => {
  const { container, hover } = props.theme.checkBox;
  const normalStyles = boxPartStyles(container || {}, props, true);
  const hoverStyles = boxPartStyles(container?.hover || {}, props, true);
  if (
    container?.background == null &&
    container?.hover?.background == null &&
    normalStyles.length === 0 &&
    hoverStyles.length === 0
  )
    return undefined;

  const hoverBackground =
    container?.hover?.background != null
      ? backgroundStyle(container.hover.background, props.theme, false)
      : hover?.background?.color !== undefined &&
        css`
          background-color: ${normalizeColor(
            hover.background.color,
            props.theme,
          )};
        `;

  return css`
    ${normalStyles.length > 0 && 'box-sizing: border-box;'}
    ${normalStyles}
    ${backgroundStyle(container?.background, props.theme, false)}
    ${!props.disabled &&
    (hoverBackground || hoverStyles.length > 0) &&
    css`
      &:hover {
        ${hoverBackground}
        ${hoverStyles}
      }
      ${props.focus &&
      !props.focusIndicator &&
      css`
        ${hoverBackground}
        ${hoverStyles}
      `}
    `}
  `;
};

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
        !props.disabled &&
          props.theme.checkBox.container?.hover?.background == null &&
          props.theme.checkBox.hover?.background?.color,
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
      !props.disabled &&
        props.theme.checkBox.container?.hover?.background == null &&
        props.theme.checkBox.hover?.background?.color,
      props.theme,
    )};`}
  ${(props) => {
    const controlStyle = controlHoverStyle(props);
    const containerStyle = containerBackgroundStyle(props);
    if (containerStyle) {
      return css`
        ${containerStyle}
        ${controlStyle &&
        css`
          &:hover {
            ${controlStyle}
          }
          ${props.focus && !props.focusIndicator && controlStyle}
        `}
        ${props.theme.checkBox.extend}
      `;
    }
    return controlStyle
      ? css`
          &:hover {
            ${controlStyle}
          }
          ${props.focus && !props.focusIndicator && controlStyle}
          ${props.theme.checkBox.extend}
        `
      : props.theme.checkBox.extend;
  }}
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
  ${(props) => {
    const { control, check } = props.theme.checkBox;
    const selected = props.checked || props.indeterminate;
    const selectedState = selected ? control?.selected : undefined;
    const part = { ...control, ...selectedState };
    if (control?.border !== undefined || selectedState?.border !== undefined)
      part.border = mergeControlBorder(
        mergeControlBorder(props.border, control?.border),
        selectedState?.border,
      );
    const partStyles = boxPartStyles(part, props);
    const background = selectedState?.background ?? control?.background;
    if (background != null) {
      return css`
        ${partStyles}
        ${backgroundStyle(background, props.theme, false)}
        ${check.extend}
      `;
    }

    if (partStyles.length === 0) return check.extend;
    return css`
      ${partStyles}
      ${check.extend}
    `;
  }};
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
