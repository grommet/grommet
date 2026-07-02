/* eslint-disable max-len */
import styled from 'styled-components';

import {
  disabledStyle,
  focusStyle,
  getInputPadBySide,
  inputStyle,
  normalizeColor,
  plainInputStyle,
  readOnlyStyle,
  styledComponentsConfig,
} from '../../utils';
import { Box } from '../Box';
import { Button } from '../Button';

export const StyledTimeInputContainer = styled(Box).withConfig({
  // Keep Box styling props like border and round flowing into Box.
  shouldForwardProp: (prop) => prop !== 'disabled' && prop !== 'readOnlyProp',
})`
  ${(props) => props.disabled && disabledStyle()}
  ${(props) => props.readOnlyProp && readOnlyStyle(props.theme)}
  &:focus-within {
    ${(props) => props.focusIndicator && focusStyle({ justBorder: true })}
  }
  ${(props) =>
    props.theme.timeInput &&
    props.theme.timeInput.container &&
    props.theme.timeInput.container.extend}
`;

export const StyledTimeInput = styled.input.withConfig(styledComponentsConfig)`
  ${inputStyle}
  ${(props) => props.plain && plainInputStyle}
  position: relative;
  z-index: 1;
  width: 100%;
  color: transparent;
  caret-color: transparent;
  font-size: ${(props) => props.theme.timeInput?.fontSize};
  line-height: ${(props) => props.theme.timeInput?.lineHeight};
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

  ${(props) => props.theme.timeInput && props.theme.timeInput.extend}
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
  pointer-events: auto;
  white-space: pre;
  overflow: hidden;
  font-family: ${(props) => props.theme.global.font.family};
  font-size: ${(props) => props.theme.timeInput?.fontSize};
  font-weight: ${(props) =>
    props.theme.global.input?.font?.weight || props.theme.global.font.weight};
  line-height: ${(props) => props.theme.timeInput?.lineHeight};
`;

export const StyledTimeInputSeparator = styled.span.withConfig(
  styledComponentsConfig,
)`
  display: inline-flex;
  align-items: center;
  pointer-events: auto;
  line-height: inherit;
  margin-inline: ${(props) =>
    props.$kind === 'colon'
      ? props.theme.timeInput?.separator?.gap ||
        props.theme.global.edgeSize.xxsmall
      : props.theme.timeInput?.separator?.periodGap || '0'};
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
  background: ${(props) => {
    if (!props.$active) return 'transparent';

    const activeBackground = normalizeColor(
      props.theme.timeInput?.active?.background || 'active-background',
      props.theme,
    );
    const activeBorderColor = normalizeColor(
      props.theme.timeInput?.active?.border?.color || 'focus',
      props.theme,
    );
    const activeBorderSize =
      props.theme.timeInput?.active?.border?.size || '2px';

    return `linear-gradient(${activeBorderColor}, ${activeBorderColor}) bottom / 100% ${activeBorderSize} no-repeat, ${activeBackground}`;
  }};
  border-radius: ${(props) =>
    props.theme.timeInput?.active?.round || '2px 2px 0 0'};
`;

export const StyledTimeInputToggleButton = styled(Button)`
  align-self: center;
  flex: 0 0 auto;
  background: transparent;
  border: 0;
  min-width: ${(props) => props.theme.timeInput?.toggle?.size || '36px'};
  min-height: ${(props) => props.theme.timeInput?.toggle?.size || '36px'};
  border-radius: ${(props) => props.theme.timeInput?.toggle?.round || '12px'};
  padding: ${(props) => props.theme.timeInput?.toggle?.pad || '8px'};

  &:hover,
  &:focus,
  &:focus-visible,
  &:active {
    background: transparent;
  }

  &:focus-visible {
    box-shadow: ${(props) =>
      `0 0 0 ${
        props.theme.timeInput?.toggle?.focus?.outerSize || '2px'
      } ${normalizeColor(
        props.theme.timeInput?.toggle?.focus?.outerColor || '#292d3a',
        props.theme,
      )}, inset 0 0 0 ${
        props.theme.timeInput?.toggle?.focus?.innerSize || '2px'
      } ${normalizeColor(
        props.theme.timeInput?.toggle?.focus?.innerColor || '#d9dcde',
        props.theme,
      )}`};
    outline: none;
  }
`;
