// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled, { css } from 'styled-components';

import {
  backgroundStyle,
  borderStyle,
  edgeStyle,
  focusStyle,
  normalizeColor,
  styledComponentsConfig,
} from '../../utils';
import { roundStyle } from '../../utils/styles';
import { Box } from '../Box';

const disabledStyle = `
  opacity: 0.5;
  cursor: default;
`;

const groupItemStyle = css`
  ${(props) =>
    props.$groupItemProps?.background &&
    backgroundStyle(props.$groupItemProps.background, props.theme)}
  ${(props) =>
    props.$groupItemProps?.border &&
    borderStyle(props.$groupItemProps.border, props.responsive, props.theme)}
  ${(props) =>
    props.$groupItemProps?.pad &&
    edgeStyle(
      'padding',
      props.$groupItemProps.pad,
      props.responsive,
      props.theme.box.responsiveBreakpoint,
      props.theme,
    )}
  ${(props) =>
    props.$groupItemProps?.round &&
    roundStyle(props.$groupItemProps.round, props.responsive, props.theme)}
  ${(props) =>
    !props.disabled &&
    props.$groupItemProps?.hover?.background &&
    css`
      &:hover {
        ${backgroundStyle(props.$groupItemProps.hover.background, props.theme)}
      }
    `}
`;

const StyledRadioButtonContainer = styled.label.withConfig(
  styledComponentsConfig,
)`
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  width: fit-content;
  ${(props) => props.disabled && disabledStyle} ${(props) =>
    !props.disabled && 'cursor: pointer;'}

  &:hover input:not([disabled]) + div,
  &:hover input:not([disabled]) + span {
    border-color: ${(props) =>
      normalizeColor(props.theme.radioButton.hover.border.color, props.theme)};
  }
  &:hover {
    background-color: ${(props) =>
      normalizeColor(
        !props.disabled &&
          props.theme.radioButton.hover &&
          props.theme.radioButton.hover.background &&
          props.theme.radioButton.hover.background.color,
        props.theme,
      )};
  }
  // when the RadioButton has focus but there is no focusIndicator,
  // apply the hover styling instead so that keyboard users know
  // which RadioButton is active
  ${(props) =>
    props.focus &&
    !props.focusIndicator &&
    `
      input:not([disabled]) + div,
      input:not([disabled]) + span {
      border-color: ${normalizeColor(
        props.theme.radioButton.hover.border.color,
        props.theme,
      )};
    }
    background-color: ${normalizeColor(
      !props.disabled &&
        props.theme.radioButton.hover &&
        props.theme.radioButton.hover.background &&
        props.theme.radioButton.hover.background.color,
      props.theme,
    )};
    `}
  ${(props) => props.theme.radioButton.container.extend};
`;

const StyledRadioButtonInput = styled.input.withConfig(styledComponentsConfig)`
  opacity: 0;
  -moz-appearance: none;
  width: 0;
  height: 0;
  margin: 0;
  ${(props) => !props.disabled && 'cursor: pointer;'};
`;

const StyledRadioButtonLabel = styled.span.withConfig(styledComponentsConfig)`
  ${(props) =>
    props.theme.radioButton.font.weight &&
    css`
      font-weight: ${props.theme.radioButton.font.weight};
    `}
`;

const StyledRadioButtonIcon = styled.svg.withConfig(styledComponentsConfig)`
  box-sizing: border-box;
  width: ${(props) =>
    props.theme.radioButton.icon.size || props.theme.radioButton.size};
  height: ${(props) =>
    props.theme.radioButton.icon.size || props.theme.radioButton.size};
  fill: ${(props) =>
    normalizeColor(
      props.theme.radioButton.check.color || 'control',
      props.theme,
    )};
  transform: scale(1); // prevent misalignment in certain browsers
  ${(props) => props.theme.radioButton.icon.extend};
`;

const StyledRadioButtonBox = styled(Box)`
  background-color: ${(props) => props.backgroundColor};
  transform: scale(1); // prevent misalignment in certain browsers
  ${(props) => props.focus && focusStyle()};
  ${(props) => props.theme.radioButton.check.extend};
`;

const StyledRadioButton = styled(Box)`
  ${(props) => props.theme.radioButton && props.theme.radioButton.extend};
`;

const StyledRadioButtonGroupItem = styled(StyledRadioButtonContainer)`
  ${groupItemStyle}
`;

export {
  StyledRadioButtonContainer,
  StyledRadioButtonGroupItem,
  StyledRadioButtonInput,
  StyledRadioButtonLabel,
  StyledRadioButtonIcon,
  StyledRadioButtonBox,
  StyledRadioButton,
};
