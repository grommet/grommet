import styled from 'styled-components';

import {
  disabledStyle,
  getInputPadBySide,
  inputStyle,
  normalizeColor,
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

  &::-webkit-input-placeholder {
    color: transparent;
  }

  &::-moz-placeholder {
    color: transparent;
  }

  &:-ms-input-placeholder {
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
  padding: ${(props) =>
    `${getInputPadBySide(props, 'top')} ${getInputPadBySide(
      props,
      'right',
    )} ${getInputPadBySide(props, 'bottom')} ${getInputPadBySide(
      props,
      'left',
    )}`};
  white-space: pre;
  overflow: hidden;
  font-size: ${(props) =>
    `${
      props.theme.global.input.font.size
        ? props.theme.text[props.theme.global.input.font.size]?.size ||
          props.theme.global.input.font.size
        : 'inherit'
    }`};
  font-weight: ${(props) =>
    props.theme.global.input?.font?.weight || props.theme.global.font.weight};
  line-height: ${(props) => props.theme.global.input.font.height || 'inherit'};
`;

export const StyledTimeInputSeparator = styled.span.withConfig(
  styledComponentsConfig,
)`
  display: inline-flex;
  align-items: center;
  line-height: inherit;
  margin-inline: ${(props) => {
    const gapToken =
      props.$kind === 'colon'
        ? props.theme.timeInput?.separator?.gap
        : props.theme.timeInput?.separator?.periodGap;

    return (
      props.theme.global.borderSize?.[gapToken] ||
      props.theme.global.edgeSize?.[gapToken] ||
      gapToken ||
      (props.$kind === 'colon'
        ? props.theme.global.edgeSize.xxsmall
        : props.theme.global.edgeSize.none)
    );
  }};
  color: ${(props) =>
    normalizeColor(
      props.$filled
        ? props.theme.timeInput?.color || 'text'
        : props.theme.timeInput?.placeholder?.color ||
            props.theme.global.colors.placeholder,
      props.theme,
    )};
`;

export const StyledTimeInputSegment = styled.span.withConfig(
  styledComponentsConfig,
)`
  display: inline-flex;
  align-items: center;
  position: relative;
  pointer-events: auto;
  line-height: inherit;
  color: ${(props) =>
    normalizeColor(
      props.$filled
        ? props.theme.timeInput?.color || 'text'
        : props.theme.timeInput?.placeholder?.color ||
            props.theme.global.colors.placeholder,
      props.theme,
    )};
  background-color: transparent;
  box-shadow: none;

  ${(props) =>
    props.$active &&
    `
      ${(() => {
        const activeRoundToken = props.theme.timeInput?.active?.round;
        const activeRound =
          props.theme.global.borderSize?.[activeRoundToken] ||
          props.theme.global.radius?.[activeRoundToken] ||
          props.theme.global.edgeSize?.[activeRoundToken] ||
          activeRoundToken ||
          props.theme.global.borderSize.small;

        const activeBorderToken = props.theme.timeInput?.active?.border?.size;
        const activeBorderSize =
          props.theme.global.borderSize?.[activeBorderToken] ||
          props.theme.global.edgeSize?.[activeBorderToken] ||
          activeBorderToken ||
          props.theme.global.borderSize.small;

        return `
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${normalizeColor(
          props.theme.timeInput?.active?.background || 'active-background',
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
          props.theme.timeInput?.active?.border?.color || 'focus',
          props.theme,
        )};
        border-bottom-left-radius: ${activeRound};
        border-bottom-right-radius: ${activeRound};
      }
        `;
      })()}
    `};
`;
