// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled, { css } from 'styled-components';

import {
  disabledStyle,
  focusStyle,
  getBreakpointStyle,
  normalizeColor,
  readOnlyStyle,
  styledComponentsConfig,
} from '../../utils';
import { breakpointStyle } from '../../utils/mixins';
import { Box } from '../Box';
import { Text } from '../Text';

export const StyledDateTimeRangeInputContainer = styled(Box)`
  font-variant-numeric: tabular-nums;
  ${(props) => {
    const inputPadding = props.theme.global.input?.padding;
    const verticalPadding =
      typeof inputPadding === 'object' ? inputPadding.vertical : undefined;

    return verticalPadding
      ? css`
          && [role='group'] {
            padding-block: ${verticalPadding};
          }
        `
      : '';
  }}
  ${(props) => {
    const responsiveBreakpoint =
      props.theme.dateTimeRangeInput?.responsiveBreakpoint;
    return responsiveBreakpoint
      ? breakpointStyle(
          getBreakpointStyle(props.theme, responsiveBreakpoint),
          'flex-wrap: wrap;',
        )
      : '';
  }}
  ${(props) => props.$disabled && disabledStyle()}
  ${(props) => props.$readOnly && readOnlyStyle(props.theme)}
  ${(props) =>
    props.$focusIndicator !== false &&
    css`
      &:focus-within {
        ${focusStyle()}
      }
    `}
`;

export const StyledDateTimeRangeInputSeparator = styled(Text).withConfig(
  styledComponentsConfig,
)`
  white-space: nowrap;
`;

export const StyledDateTimeRangeInputField = styled(Box)`
  position: relative;
  ${(props) => {
    if (!props.$active) return '';
    const indicator = props.theme.dateTimeRangeInput?.active?.indicator;
    const indicatorSize =
      props.theme.global.borderSize?.[indicator?.size] ||
      indicator?.size ||
      props.theme.global.borderSize.small;

    return css`
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: ${indicatorSize};
        background-color: ${normalizeColor(
          indicator?.color || 'control',
          props.theme,
        )};
      }
    `;
  }}
`;
