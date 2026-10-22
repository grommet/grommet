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

const disabledStyle = `
  opacity: 0.5;
  cursor: default;
`;

const boxPartStyles = (part, props) => {
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
  if (part.pad !== undefined)
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
  const { control } = props.theme.radioButton;
  if (props.disabled) return undefined;

  const stateStyle = (state, checked) => {
    const part = { ...state };
    if (state?.border !== undefined) {
      const { radioButton } = props.theme;
      const baseBorder = {
        size: radioButton.border.width,
        color: checked
          ? radioButton.color || 'control'
          : radioButton.border.color,
      };
      part.border = mergeControlBorder(
        mergeControlBorder(
          mergeControlBorder(baseBorder, control?.border),
          checked ? control?.selected?.border : undefined,
        ),
        state.border,
      );
    }
    const styles = boxPartStyles(part, props);
    if (state?.background != null)
      styles.push(backgroundStyle(state.background, props.theme, false));
    return styles.length > 0
      ? css`
          ${styles}
        `
      : undefined;
  };
  const normal = stateStyle(control?.hover, false);
  const selected = stateStyle(control?.selected?.hover, true);
  if (normal === undefined && selected === undefined) return undefined;

  return css`
    ${normal &&
    css`
      input:not([disabled]):not(:checked)
        + ${
          // eslint-disable-next-line no-use-before-define
          StyledRadioButtonBox
        } {
        ${normal}
      }
    `}
    ${selected &&
    css`
      input:not([disabled]):checked
        + ${
          // eslint-disable-next-line no-use-before-define
          StyledRadioButtonBox
        } {
        ${selected}
      }
    `}
  `;
};

const containerBackgroundStyle = (props) => {
  const { container, hover } = props.theme.radioButton;
  const normalStyles = boxPartStyles(container, props);
  const hoverStyles = boxPartStyles(container.hover || {}, props);
  if (
    container.background == null &&
    container.hover?.background == null &&
    normalStyles.length === 0 &&
    hoverStyles.length === 0
  )
    return undefined;

  const hoverBackground =
    container.hover?.background != null
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
    ${backgroundStyle(container.background, props.theme, false)}
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

const StyledRadioButtonContainer = styled.label.withConfig(
  styledComponentsConfig,
)`
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  width: fit-content;
  ${(props) => props.disabled && disabledStyle} ${(props) =>
    !props.disabled && 'cursor: pointer;'}

  &:hover input:not([disabled]) + div,
  &:hover input:not([disabled]) + span {
    border-color: ${(props) =>
      normalizeColor(props.theme.radioButton.hover.border.color, props.theme)};
  }
  &:hover {
    background-color: ${(props) =>
      normalizeColor(
        !props.disabled &&
          props.theme.radioButton.container.hover?.background == null &&
          props.theme.radioButton.hover &&
          props.theme.radioButton.hover.background &&
          props.theme.radioButton.hover.background.color,
        props.theme,
      )};
  }
  // when the RadioButton has focus but there is no focusIndicator,
  // apply the hover styling instead so that keyboard users know
  // which RadioButton is active
  ${(props) =>
    props.focus &&
    !props.focusIndicator &&
    `
      input:not([disabled]) + div,
      input:not([disabled]) + span {
      border-color: ${normalizeColor(
        props.theme.radioButton.hover.border.color,
        props.theme,
      )};
    }
    background-color: ${normalizeColor(
      !props.disabled &&
        props.theme.radioButton.container.hover?.background == null &&
        props.theme.radioButton.hover &&
        props.theme.radioButton.hover.background &&
        props.theme.radioButton.hover.background.color,
      props.theme,
    )};
    `}
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
        ${props.theme.radioButton.container.extend}
      `;
    }
    return controlStyle
      ? css`
          &:hover {
            ${controlStyle}
          }
          ${props.focus && !props.focusIndicator && controlStyle}
          ${props.theme.radioButton.container.extend}
        `
      : props.theme.radioButton.container.extend;
  }};
`;

const StyledRadioButtonInput = styled.input.withConfig(styledComponentsConfig)`
  opacity: 0;
  -moz-appearance: none;
  width: 0;
  height: 0;
  margin: 0;
  ${(props) => !props.disabled && 'cursor: pointer;'};
`;

const StyledRadioButtonLabel = styled.span.withConfig(styledComponentsConfig)`
  ${(props) =>
    props.theme.radioButton.font.weight &&
    css`
      font-weight: ${props.theme.radioButton.font.weight};
    `}
`;

const StyledRadioButtonIcon = styled.svg.withConfig(styledComponentsConfig)`
  box-sizing: border-box;
  width: ${(props) =>
    props.theme.radioButton.icon.size || props.theme.radioButton.size};
  height: ${(props) =>
    props.theme.radioButton.icon.size || props.theme.radioButton.size};
  fill: ${(props) =>
    normalizeColor(
      props.theme.radioButton.check.color || 'control',
      props.theme,
    )};
  transform: scale(1); // prevent misalignment in certain browsers
  ${(props) => props.theme.radioButton.icon.extend};
`;

const StyledRadioButtonBox = styled(Box)`
  background-color: ${(props) => props.backgroundColor};
  transform: scale(1); // prevent misalignment in certain browsers
  ${(props) => props.focus && focusStyle()};
  ${(props) => {
    const { control, check } = props.theme.radioButton;
    const selected = props.$checked ? control?.selected : undefined;
    const part = { ...control, ...selected };
    if (control?.border !== undefined || selected?.border !== undefined)
      part.border = mergeControlBorder(
        mergeControlBorder(props.border, control?.border),
        selected?.border,
      );
    const styles = boxPartStyles(part, props);
    if (props.$controlBackground != null)
      return css`
        ${styles}
        ${backgroundStyle(props.$controlBackground, props.theme, false)}
        ${check.extend}
      `;
    if (styles.length === 0) return check.extend;
    return css`
      ${styles}
      ${check.extend}
    `;
  }};
`;

const StyledRadioButton = styled(Box)`
  ${(props) => props.theme.radioButton && props.theme.radioButton.extend};
`;

export {
  StyledRadioButtonContainer,
  StyledRadioButtonInput,
  StyledRadioButtonLabel,
  StyledRadioButtonIcon,
  StyledRadioButtonBox,
  StyledRadioButton,
};
