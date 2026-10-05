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

// Bottom indicator line painted as a separate ::after layer (not a real Box
// border/box-shadow on the segment itself) so it never interacts with the
// segment's own background fill or corner rounding. Side is intentionally
// hardcoded to bottom - only size/color are themeable (keyed as `border`
// to match the Box-prop-like naming elsewhere in this theme).
const cursorIndicatorStyle = (theme) => {
  const border = theme.timeInput?.value?.cursor?.border;
  if (!border) return '';

  const sizeToken = typeof border === 'object' ? border.size : undefined;
  const size = parseMetricToNum(
    theme.global.borderSize?.[sizeToken] || sizeToken || 'xsmall',
  );
  const color = normalizeColor(
    (typeof border === 'object' && border.color) || 'border',
    theme,
  );

  return css`
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: ${size}px;
      background-color: ${color};
    }
  `;
};

// Wraps Box directly (not via styledComponentsConfig/isPropValid) so
// Box's own styling props (round, background) keep flowing through
// instead of being filtered out as invalid DOM attributes.
export const StyledTimeInputSegment = styled(Box)`
  &:focus {
    outline: none;
  }
  display: inline-flex;
  position: relative;
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
  ${(props) => props.$active && cursorIndicatorStyle(props.theme)}
`;
