// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled, { css } from 'styled-components';

import {
  backgroundStyle,
  borderStyle,
  disabledStyle,
  edgeStyle,
  elevationStyle,
  focusStyle,
  heightStyle,
  inputStyle,
  normalizeColor,
  parseMetricToNum,
  plainInputStyle,
  readOnlyStyle,
  roundStyle,
  styledComponentsConfig,
  widthStyle,
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

export const StyledTimeInputDisplay = styled(Box)`
  position: absolute;
  inset: 0;
  overflow: hidden;
  ${(props) => {
    const valuePad = props.theme.timeInput?.value?.pad;
    if (valuePad !== undefined) {
      return edgeStyle(
        'padding',
        valuePad,
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
`;

export const StyledTimeInputSeparator = styled.span.withConfig(
  styledComponentsConfig,
)`
  display: inline-flex;
  line-height: inherit;
  align-items: center;
  color: ${(props) =>
    normalizeColor(
      props.$filled
        ? props.theme.timeInput?.segment?.color || 'text'
        : props.theme.timeInput?.segment?.placeholder?.color ||
            props.theme.global.colors.placeholder,
      props.theme,
    )};
  ${(props) => {
    const { segment } = props.theme.timeInput || {};
    const weight =
      segment?.weight ||
      props.theme.global.input.weight ||
      props.theme.global.input.font.weight;
    const size = segment?.size || props.theme.global.input.font.size;
    const fontSize = props.theme.text?.[size]?.size || size;
    return css`
      ${weight && `font-weight: ${weight};`}
      ${fontSize && `font-size: ${fontSize};`}
    `;
  }}
  ${(props) => {
    const placeholder = props.theme.timeInput?.segment?.placeholder;
    if (props.$filled || !placeholder) return '';
    const fontSize =
      props.theme.text?.[placeholder.size]?.size || placeholder.size;
    return css`
      ${placeholder.weight !== undefined &&
      `font-weight: ${placeholder.weight};`}
      ${fontSize && `font-size: ${fontSize};`}
    `;
  }}
`;

export const StyledTimeInputSegment = styled.span.withConfig(
  styledComponentsConfig,
)`
  &:focus {
    outline: none;
  }
  display: inline-flex;
  align-items: center;
  position: relative;
  line-height: inherit;
  ${(props) => {
    const segment = props.theme.timeInput?.segment;
    const responsive = props.responsive === undefined ? true : props.responsive;
    const styles = [];

    if (segment?.background !== undefined)
      styles.push(backgroundStyle(segment.background, props.theme));
    if (segment?.border)
      styles.push(borderStyle(segment.border, responsive, props.theme));
    if (segment?.elevation) styles.push(elevationStyle(segment.elevation));
    if (segment?.height) styles.push(heightStyle(segment.height, props.theme));
    if (segment?.margin)
      styles.push(
        edgeStyle(
          'margin',
          segment.margin,
          responsive,
          props.theme.box.responsiveBreakpoint,
          props.theme,
        ),
      );
    if (segment?.pad)
      styles.push(
        edgeStyle(
          'padding',
          segment.pad,
          responsive,
          props.theme.box.responsiveBreakpoint,
          props.theme,
        ),
      );
    if (segment?.round !== undefined) {
      styles.push(
        segment.round === false
          ? 'border-radius: 0;'
          : roundStyle(segment.round, responsive, props.theme),
      );
    }
    if (segment?.width) styles.push(widthStyle(segment.width, props.theme));

    return styles;
  }};
  color: ${(props) =>
    normalizeColor(
      props.$filled
        ? props.theme.timeInput?.segment?.color || 'text'
        : props.theme.timeInput?.segment?.placeholder?.color ||
            props.theme.global.colors.placeholder,
      props.theme,
    )};
  ${(props) => {
    const { segment } = props.theme.timeInput || {};
    const weight =
      segment?.weight ||
      props.theme.global.input.weight ||
      props.theme.global.input.font.weight;
    const size = segment?.size || props.theme.global.input.font.size;
    const fontSize = props.theme.text?.[size]?.size || size;
    return css`
      ${weight && `font-weight: ${weight};`}
      ${fontSize && `font-size: ${fontSize};`}
    `;
  }}
  ${(props) => {
    const placeholder = props.theme.timeInput?.segment?.placeholder;
    if (props.$filled || !placeholder) return '';
    const fontSize =
      props.theme.text?.[placeholder.size]?.size || placeholder.size;
    return css`
      ${placeholder.weight !== undefined &&
      `font-weight: ${placeholder.weight};`}
      ${fontSize && `font-size: ${fontSize};`}
    `;
  }}

  ${(props) => {
    if (!props.$active) return '';

    const { active } = props.theme.timeInput?.segment || {};
    if (!active) return '';

    const responsive = props.responsive === undefined ? true : props.responsive;
    const styles = [];
    if (active.elevation !== undefined)
      styles.push(elevationStyle(active.elevation));
    if (active.pad !== undefined)
      styles.push(
        edgeStyle(
          'padding',
          active.pad,
          responsive,
          props.theme.box.responsiveBreakpoint,
          props.theme,
        ),
      );
    if (active.round !== undefined) {
      styles.push(
        active.round === false
          ? 'border-radius: 0;'
          : roundStyle(active.round, responsive, props.theme),
      );
    }
    if (active.color !== undefined)
      styles.push(`color: ${normalizeColor(active.color, props.theme)};`);
    if (active.size !== undefined) {
      const { size } = active;
      styles.push(`font-size: ${props.theme.text?.[size]?.size || size};`);
    }
    if (active.weight !== undefined)
      styles.push(`font-weight: ${active.weight};`);
    return styles;
  }}

  ${(props) => {
    if (!props.$active) return '';

    const { active, round: segmentRound } =
      props.theme.timeInput?.segment || {};
    const responsive = props.responsive === undefined ? true : props.responsive;
    const activeRound = active?.round ?? segmentRound;
    const activeRoundStyle =
      activeRound && roundStyle(activeRound, responsive, props.theme);
    const activeRoundValue =
      activeRound === false ? '0' : props.theme.global.edgeSize?.hair;
    const underlineBorder = active?.border;
    const underlineBorderStyle =
      underlineBorder === false ||
      (Array.isArray(underlineBorder) && underlineBorder.length === 0)
        ? 'border: none;'
        : borderStyle(underlineBorder, responsive, props.theme);

    return css`
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        ${active?.background !== undefined
          ? backgroundStyle(active.background, props.theme, false)
          : ''}
        ${activeRoundStyle ||
        css`
          border-top-left-radius: ${activeRoundValue};
          border-top-right-radius: ${activeRoundValue};
          border-bottom-left-radius: ${activeRoundValue};
          border-bottom-right-radius: ${activeRoundValue};
        `}
      }
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        ${underlineBorderStyle}
        ${activeRoundStyle ||
        css`
          border-bottom-left-radius: ${activeRoundValue};
          border-bottom-right-radius: ${activeRoundValue};
        `}
      }
    `;
  }}
`;
