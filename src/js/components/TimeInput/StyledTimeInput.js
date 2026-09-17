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
  roundStyle,
  styledComponentsConfig,
} from '../../utils';
import { Box } from '../Box';

export const StyledTimeInputContainer = styled(Box).withConfig({
  // Keep Box styling props like border and round flowing into Box.
  shouldForwardProp: (prop) => prop !== 'disabled' && prop !== 'readOnlyProp',
})`
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

const getCursorBorderSize = (theme) => {
  const cursorBorderToken = theme.timeInput?.cursor?.border?.size;
  return (
    theme.global.borderSize?.[cursorBorderToken] ||
    theme.global.edgeSize?.[cursorBorderToken] ||
    cursorBorderToken ||
    theme.global.borderSize.small
  );
};

const getCursorBorderSide = (theme) => {
  const side = theme.timeInput?.cursor?.border?.side;
  return ['top', 'bottom', 'left', 'right'].includes(side) ? side : 'bottom';
};

const getCursorActiveRound = (theme) => {
  const activeRound =
    theme.timeInput?.cursor?.active?.round || theme.global.edgeSize?.hair;
  if (activeRound === 'full') return '100%';
  if (typeof activeRound !== 'string') return activeRound;

  const radius = theme.global.radius ? 'radius' : 'edgeSize';
  return theme.global[radius]?.[activeRound] || activeRound;
};
export const StyledTimeInputSegment = styled.span.withConfig(
  styledComponentsConfig,
)`
  &:focus {
    outline: none;
  }
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  line-height: inherit;
  ${(props) => {
    const cursorBorderSide = getCursorBorderSide(props.theme);
    return css`
      border-${cursorBorderSide}-width: ${getCursorBorderSize(props.theme)};
      border-${cursorBorderSide}-style: solid;
      border-${cursorBorderSide}-color: transparent;
    `;
  }}
  padding-inline: ${(props) => {
    const padToken = props.theme.timeInput?.cursor?.pad;

    return props.theme.global.edgeSize?.[padToken] || padToken;
  }};
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

  ${(props) => {
    if (!props.$active) return '';

    const activeRound = getCursorActiveRound(props.theme);
    const cursorBorderSide = getCursorBorderSide(props.theme);

    return css`
      border-${cursorBorderSide}-color: ${normalizeColor(
      props.theme.timeInput?.cursor?.active?.border?.color || {
        dark: 'white',
        light: 'black',
      },
      props.theme,
    )};
      ${roundStyle(
        { size: activeRound, corner: cursorBorderSide },
        false,
        props.theme,
      )}

      &::before {
        content: '';
        position: absolute;
        inset: 0;
          z-index: -1;
        background-color: ${normalizeColor(
          props.theme.timeInput?.cursor?.active?.background,
          props.theme,
        )};
        border-top-left-radius: ${activeRound};
        border-top-right-radius: ${activeRound};
      }
        z-index: 0;
    `;
  }}
`;
