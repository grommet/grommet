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
  // Mirrors a native text input's default sizing (~20 characters) now that
  // there's no real <input> in the layout to drive this naturally.
  width: 20ch;
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

// Maps a Box border `side` to the inset box-shadow offset(s) needed to
// visually approximate that border without occupying layout space. The
// offset is doubled and paired with a negative spread equal to the
// requested size; the negative spread retracts the shadow away from the
// perpendicular edges (avoiding a thin sliver leaking in at rounded
// corners), while the doubled offset restores the intended thickness on
// the selected side.
const cursorBoxShadow = (theme) => {
  const border = theme.timeInput?.value?.cursor?.border;
  if (!border) return '';

  const size = parseMetricToNum(
    theme.global.borderSize?.[border.size] || border.size || 'xsmall',
  );
  const color = normalizeColor(border.color || 'border', theme);
  const offset = size * 2;
  const shadows = {
    bottom: `inset 0 -${offset}px 0 -${size}px ${color}`,
    top: `inset 0 ${offset}px 0 -${size}px ${color}`,
    left: `inset ${offset}px 0 0 -${size}px ${color}`,
    right: `inset -${offset}px 0 0 -${size}px ${color}`,
    all: `inset 0 0 0 ${size}px ${color}`,
  };

  return `box-shadow: ${shadows[border.side] || shadows.all};`;
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
