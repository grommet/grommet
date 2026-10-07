// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled, { css } from 'styled-components';

import {
  backgroundStyle,
  borderStyle,
  disabledStyle,
  edgeStyle,
  focusStyle,
  inputStyle,
  normalizeColor,
  parseMetricToNum,
  plainInputStyle,
  readOnlyStyle,
  roundStyle,
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

export const StyledTimeInput = styled.input.withConfig(styledComponentsConfig)`
  ${inputStyle}
  ${plainInputStyle}
  position: relative;
  pointer-events: none;
  color: transparent;
  caret-color: transparent;
  text-shadow: none;

  &::selection {
    background: transparent;
    color: transparent;
  }

  &::placeholder {
    color: transparent;
  }
`;

export const StyledTimeInputField = styled.div.withConfig(
  styledComponentsConfig,
)`
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
`;

export const StyledTimeInputDisplay = styled.div.withConfig(
  styledComponentsConfig,
)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  ${(props) => {
    const displayPad = props.theme.timeInput?.display?.pad;
    if (displayPad !== undefined) {
      return edgeStyle(
        'padding',
        displayPad,
        props.responsive,
        props.theme.box.responsiveBreakpoint,
        props.theme,
      );
    }
    const inputPadding = props.theme.global.input.padding;
    if (!inputPadding) return undefined;
    if (typeof inputPadding !== 'object')
      return `padding: ${
        parseMetricToNum(
          props.theme.global.edgeSize[inputPadding] || inputPadding,
        ) - parseMetricToNum(props.theme.global.control.border.width)
      }px;`;
    return edgeStyle(
      'padding',
      inputPadding,
      props.responsive,
      props.theme.box.responsiveBreakpoint,
      props.theme,
    );
  }}
  ${(props) => {
    const lineHeight = props.theme.timeInput?.display?.lineHeight;
    return css`
      ${lineHeight && `line-height: ${lineHeight};`}
    `;
  }}
`;

export const StyledTimeInputSeparator = styled.span.withConfig(
  styledComponentsConfig,
)`
  display: inline-flex;
  align-items: center;
  line-height: inherit;
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
`;

// Paints the active-segment background and border as independent ::before/
// ::after overlays (absolutely positioned, inset: 0) rather than real Box
// props, so the overlay's own shape/rounding never has to match - or affect
// the layout of - the segment's own box model.
const cursorOverlayStyle = (theme) => {
  const { background, border, round } = theme.timeInput?.value?.cursor || {};
  if (background === undefined && !border && round === undefined) return '';

  const roundCss = round !== undefined && roundStyle(round, false, theme);

  return css`
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      ${background !== undefined && backgroundStyle(background, theme, false)}
      ${roundCss}
    }
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      ${border && borderStyle(border, false, theme)}
      ${roundCss}
    }
  `;
};

// `cursor` is a nested, active-only theme sub-object, not itself a Box prop,
// so it must never be spread onto the always-rendered base segment. Its own
// `background`/`border`/`round` render as ::before/::after overlays (see
// cursorOverlayStyle) instead, so only `pad`/`elevation` (layout-neutral,
// native Box props) get spread here.
export const getSegmentThemeProps = (theme, active) => {
  const {
    cursor,
    color: _color,
    size: _size,
    weight: _weight,
    placeholder: _placeholder,
    ...boxProps
  } = theme.timeInput?.value || {};
  if (!active) return boxProps;

  const { background, border, round, color, size, weight, ...cursorBoxProps } =
    cursor || {};
  return { ...boxProps, ...cursorBoxProps };
};

// Resolves the segment text color/size/weight, in priority order: active
// `cursor` override > filled `value` > unfilled `value.placeholder`. `size`
// accepts either a theme text size token (e.g. 'large') or a literal CSS size.
const segmentTextStyle = (theme, { active, filled }) => {
  const value = theme.timeInput?.value || {};
  const cursor = active ? value.cursor : undefined;
  const placeholder = value.placeholder || {};

  const color =
    cursor?.color ??
    (filled
      ? value.color || 'text'
      : placeholder.color || theme.global.colors.placeholder);
  const weight =
    cursor?.weight ??
    (filled ? value.weight : placeholder.weight) ??
    theme.global.input.weight ??
    theme.global.input.font.weight;
  const sizeToken = cursor?.size ?? (filled ? value.size : placeholder.size);
  const fontSize = sizeToken && (theme.text?.[sizeToken]?.size || sizeToken);

  return css`
    color: ${normalizeColor(color, theme)};
    ${weight && `font-weight: ${weight};`}
    ${fontSize && `font-size: ${fontSize};`}
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
  /* Establishes a stacking context so the cursor overlay's z-index: -1
     (see cursorOverlayStyle) stays behind this segment's own text instead
     of leaking out to compete with unrelated siblings/ancestors. */
  z-index: 0;
  ${(props) =>
    segmentTextStyle(props.theme, {
      active: props.$active,
      filled: props.$filled,
    })}
  ${(props) => props.$active && cursorOverlayStyle(props.theme)}
`;
