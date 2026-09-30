// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled, { css } from 'styled-components';

import {
  disabledStyle,
  edgeStyle,
  focusStyle,
  normalizeColor,
  parseMetricToNum,
  readOnlyStyle,
  styledComponentsConfig,
} from '../../utils';
import { Box } from '../Box';

export const StyledTimeInputContainer = styled(Box).withConfig({
  // Keep Box styling props like border and round flowing into Box.
  shouldForwardProp: (prop) => prop !== 'disabled' && prop !== 'readOnlyProp',
})`
  position: relative;
  ${(props) => props.disabled && disabledStyle()}
  ${(props) => props.readOnlyProp && readOnlyStyle(props.theme)}
  ${(props) =>
    props.focusIndicator !== false &&
    css`
      &:focus-within {
        ${focusStyle()}
      }
    `}
`;

// A real, labelable input so a FormField's <label htmlFor={id}> can focus
// the field natively (a div, unlike an input, is never labelable).
export const StyledTimeInputLabelTarget = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
  width: 1px;
`;

export const StyledTimeInputSegmentGroup = styled.div.withConfig(
  styledComponentsConfig,
)`
  box-sizing: border-box;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  min-width: 0;
  overflow: hidden;
  font-family: inherit;
  font-size: ${(props) =>
    props.theme.global.input.font.size
      ? props.theme.text[props.theme.global.input.font.size]?.size ||
        props.theme.global.input.font.size
      : 'inherit'};
  line-height: ${(props) => props.theme.global.input.font.height || 'inherit'};
  ${(props) =>
    props.theme.global.input.padding &&
    (typeof props.theme.global.input.padding !== 'object'
      ? `padding: ${
          parseMetricToNum(
            props.theme.global.edgeSize[props.theme.global.input.padding] ||
              props.theme.global.input.padding,
          ) - parseMetricToNum(props.theme.global.control.border.width)
        }px;`
      : edgeStyle(
          'padding',
          props.theme.global.input.padding,
          props.responsive,
          props.theme.box.responsiveBreakpoint,
          props.theme,
        ))}
  ${(props) => {
    const weight =
      props.theme.global.input.weight || props.theme.global.input.font.weight;
    return weight && `font-weight: ${weight};`;
  }}
`;

export const StyledTimeInputSeparator = styled.span.withConfig(
  styledComponentsConfig,
)`
  color: ${(props) =>
    normalizeColor(
      props.$filled ? 'text' : props.theme.global.colors.placeholder,
      props.theme,
    )};
`;

// Maps a Box border `side` to the CSS offset(s) an inset box-shadow needs
// to visually approximate that border without occupying layout space.
const cursorBoxShadow = (theme) => {
  const border = theme.timeInput?.cursor?.border;
  if (!border) return '';

  const size = parseMetricToNum(
    theme.global.borderSize?.[border.size] || border.size,
  );
  const color = normalizeColor(border.color, theme);
  const shadows = {
    bottom: `inset 0 -${size}px 0 0 ${color}`,
    top: `inset 0 ${size}px 0 0 ${color}`,
    left: `inset ${size}px 0 0 0 ${color}`,
    right: `inset -${size}px 0 0 0 ${color}`,
    all: `inset 0 0 0 ${size}px ${color}`,
  };

  return `box-shadow: ${shadows[border.side || 'all']};`;
};

// Wraps Box directly (not via styledComponentsConfig/isPropValid) so
// Box's own styling props (round, background) keep flowing through
// instead of being filtered out as invalid DOM attributes.
export const StyledTimeInputSegment = styled(Box)`
  &:focus {
    outline: none;
  }
  display: inline-flex;
  color: ${(props) =>
    normalizeColor(
      props.$filled ? 'text' : props.theme.global.colors.placeholder,
      props.theme,
    )};
  ${(props) => {
    const weight =
      props.theme.global.input.weight || props.theme.global.input.font.weight;
    return weight && `font-weight: ${weight};`;
  }}
  ${(props) => props.$active && cursorBoxShadow(props.theme)}
`;

// The cursor (any Box props except `border`, which is painted as a
// layout-neutral inset box-shadow via `$active` instead - see
// `cursorBoxShadow` above) only renders while the segment is active/focused.
export const getSegmentCursorProps = (theme, active) => {
  if (!active) return {};

  const { border, ...boxProps } = theme.timeInput?.cursor || {};
  return boxProps;
};
