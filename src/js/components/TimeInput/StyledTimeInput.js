import styled, { css } from 'styled-components';

import {
  disabledStyle,
  edgeStyle,
  focusStyle,
  inputStyle,
  normalizeColor,
  parseMetricToNum,
  plainInputStyle,
  readOnlyStyle,
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

export const StyledTimeInput = styled.input.withConfig(styledComponentsConfig)`
  ${inputStyle}
  ${plainInputStyle}
  position: relative;
  z-index: 1;
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
  z-index: 2;
  display: flex;
  align-items: center;
  overflow: hidden;
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
`;

export const StyledTimeInputSeparator = styled.span.withConfig(
  styledComponentsConfig,
)`
  display: inline-flex;
  align-items: center;
  line-height: inherit;
  margin-inline: ${(props) => {
    const gapToken = props.theme.timeInput?.separator?.gap;

    return props.theme.global.edgeSize?.[gapToken] || gapToken;
  }};
  color: ${(props) =>
    normalizeColor(
      props.$filled ? 'text' : props.theme.global.colors.placeholder,
      props.theme,
    )};
`;

export const StyledTimeInputSegment = styled.span.withConfig(
  styledComponentsConfig,
)`
  display: inline-flex;
  align-items: center;
  position: relative;
  line-height: inherit;
  color: ${(props) =>
    normalizeColor(
      props.$filled ? 'text' : props.theme.global.colors.placeholder,
      props.theme,
    )};

  ${(props) => {
    if (!props.$active) return '';

    const activeRoundToken = props.theme.timeInput?.active?.round;
    const activeRound =
      props.theme.global.radius?.[activeRoundToken] ||
      props.theme.global.edgeSize?.[activeRoundToken] ||
      activeRoundToken;

    const activeBorderToken = props.theme.timeInput?.active?.indicator?.size;
    const activeBorderSize =
      props.theme.global.borderSize?.[activeBorderToken] ||
      props.theme.global.edgeSize?.[activeBorderToken] ||
      activeBorderToken ||
      props.theme.global.borderSize.small;

    return css`
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-color: ${normalizeColor(
          props.theme.timeInput?.active?.background,
          props.theme,
        )};
        border-top-left-radius: ${activeRound};
        border-top-right-radius: ${activeRound};
      }
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: ${activeBorderSize};
        background-color: ${normalizeColor(
          props.theme.timeInput?.active?.indicator?.color || {
            dark: 'white',
            light: 'black',
          },
          props.theme,
        )};
        border-bottom-left-radius: ${activeRound};
        border-bottom-right-radius: ${activeRound};
      }
    `;
  }}
`;
