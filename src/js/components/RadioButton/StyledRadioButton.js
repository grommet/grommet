// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled, { css } from 'styled-components';

import {
  backgroundStyle,
  focusStyle,
  normalizeColor,
  styledComponentsConfig,
} from '../../utils';
import { Box } from '../Box';

const disabledStyle = `
  opacity: 0.5;
  cursor: default;
`;

const controlHoverStyle = (props) => {
  const { control, check } = props.theme.radioButton;
  if (props.disabled) return undefined;

  const legacyColor = check.hover?.background?.color;
  const hasStateHover =
    control?.hover?.background != null ||
    control?.selected?.hover?.background != null;
  if (!hasStateHover) {
    if (legacyColor === undefined) return undefined;
    return css`
      input:not([disabled])
        + ${
          // eslint-disable-next-line no-use-before-define
          StyledRadioButtonBox
        } {
        background-color: ${normalizeColor(legacyColor, props.theme)};
      }
    `;
  }

  const stateStyle = (background) =>
    background != null
      ? backgroundStyle(background, props.theme, false)
      : legacyColor !== undefined &&
        css`
          background-color: ${normalizeColor(legacyColor, props.theme)};
        `;
  const normal = stateStyle(control?.hover?.background);
  const selected = stateStyle(control?.selected?.hover?.background);
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
  if (container.background == null && container.hover?.background == null)
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
    ${backgroundStyle(container.background, props.theme, false)}
    ${!props.disabled &&
    hoverBackground &&
    css`
      &:hover {
        ${hoverBackground}
      }
      ${props.focus && !props.focusIndicator && hoverBackground}
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
  ${(props) =>
    props.$controlBackground != null
      ? css`
          ${backgroundStyle(props.$controlBackground, props.theme, false)}
          ${props.theme.radioButton.check.extend}
        `
      : props.theme.radioButton.check.extend};
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
