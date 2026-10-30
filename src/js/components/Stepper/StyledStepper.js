// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled, { css } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import {
  backgroundStyle,
  borderStyle,
  focusStyle,
  normalizeColor,
  styledComponentsConfig,
} from '../../utils';
import { Box } from '../Box';

const getMetricSize = (theme, size) =>
  theme.global?.edgeSize?.[size] || theme.global?.size?.[size] || size;

const getTextMetric = (theme, size, metric) =>
  theme.text?.[size]?.[metric] || theme.text?.medium?.[metric];

const getBorderWidth = (theme, size) =>
  theme.global?.borderSize?.[size] || size || theme.global?.borderSize?.xsmall;

const adjustHoverColor = (color, theme) =>
  `color-mix(in srgb, ${normalizeColor(color, theme)} 90%, ${
    theme.dark ? 'white' : 'black'
  } 10%)`;

const StyledStepItem = styled.li.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'direction',
})`
  display: flex;
  position: relative;
  ${(props) => {
    if (props.direction === 'vertical') {
      const { gap } = props.stepTheme?.container || {};
      const gapValue =
        gap?.[props.direction === 'vertical' ? 'row' : 'column'] ||
        gap ||
        '0px';

      let paddingBottom = '0px';
      if (!props.isSubStep && !props.isLast && !props.hasSubSteps) {
        paddingBottom = getMetricSize(props.theme, gapValue);
      }

      return css`
        flex-direction: column;
        align-items: flex-start;
        padding-bottom: ${paddingBottom};
      `;
    }
    if (props.isSubStep) {
      // horizontal and sub-steps isn't supported
      return css`
        flex-direction: row;
        align-items: center;
        flex: none;
        min-width: 0;
        overflow: hidden;
      `;
    }
    return css`
      flex-direction: column;
      align-items: center;
      flex: 1;
      min-width: 0;
      overflow: visible;
    `;
  }}
`;

const StyledStepButton = styled(Box)`
  &:focus-visible {
    outline: none;
  }
`;

const StyledStepContent = styled(Box)`
  overflow: hidden;
  ${(props) => {
    if (props.isVertical) {
      return css`
        text-align: start;
      `;
    }
    return '';
  }}
  ${(props) => {
    if (props.isVertical && !props.isSubStep && !props.hasDescription) {
      const indicatorSizeToken =
        props.theme.stepper?.indicator?.size || 'medium';
      const indicatorSize = getMetricSize(props.theme, indicatorSizeToken);
      const lineHeight = getTextMetric(props.theme, 'small', 'height');
      return css`
        padding-top: calc((${indicatorSize} - ${lineHeight}) / 2);
      `;
    }
    return '';
  }}
`;

const StyledIndicator = styled(Box)`
  box-sizing: content-box;

  ${(props) =>
    (() => {
      const indicatorSizeToken = props.stepTheme?.indicator?.size || 'medium';
      const size = getMetricSize(props.theme, indicatorSizeToken);

      return css`
        width: ${size};
        height: ${size};
        min-width: ${size};
        min-height: ${size};
        color: ${normalizeColor(
          props.stepTheme?.indicator?.color || 'text',
          props.theme,
        )};
      `;
    })()}

  ${StyledStepButton}:focus-visible & {
    ${focusStyle()}
  }

  ${(props) => {
    if (!props.isClickable) return '';

    // For hover colors we'll use the hover part of the stepper theme
    // that resolved for the step. If there isn't one we try to
    // just darken the various colors for the step.
    const { theme } = props;
    const indicatorTheme = props.stepTheme?.indicator || {};
    const hoverTheme = props.stepTheme?.hover?.indicator || {};

    const hoverBackground =
      hoverTheme.background ??
    (indicatorTheme.background
      ? adjustHoverColor(indicatorTheme.background, theme)
      : undefined);

    const hoverBorder = indicatorTheme.border
      ? {
          ...indicatorTheme.border,
          ...hoverTheme.border,
          color:
            hoverTheme.border?.color ??
            adjustHoverColor(indicatorTheme.border.color || 'border', theme),
        }
      : hoverTheme.border;
    
    const hoverColor = normalizeColor(
      hoverTheme?.color ?? indicatorTheme?.color ?? 'text',
      theme,
    );

    const hoverStyles = (() => css`
      ${backgroundStyle(hoverBackground, theme)};
      ${hoverBorder ? borderStyle(hoverBorder, false, theme) : ''};
      color: ${hoverColor};
    `)();
      
      return css`
      ${StyledStepButton}:not([aria-disabled]):active & {
        transform: scale(0.95);
      }
      /* Hover: darkens state-specific colors via color-mix.
         Uses the parent button selector so sub-step children (which rely on
         currentColor) inherit the hover color automatically.
         Only applies to clickable (interactive) steps. */
      ${StyledStepButton}:not([aria-disabled]):hover & {
        ${hoverStyles}
      }
    `;
  }}
`;

const StyledConnector = styled.span.withConfig(styledComponentsConfig)`
  ${(props) => {
    const { theme, stepTheme } = props;
    const indicatorSizeToken = stepTheme?.indicator?.size || 'medium';
    const parentSize = getMetricSize(theme, indicatorSizeToken);
    const indicatorBorderWidth = getBorderWidth(
      theme,
      stepTheme?.indicator?.border?.size || '2px',
    );
    const buttonPad =
      props.theme.global?.edgeSize?.[stepTheme?.button?.pad || 'xxsmall'];
    const connectorStrokeToken = stepTheme?.connector?.thickness || 'small';
    const connectorThickness = getBorderWidth(theme, connectorStrokeToken);

    const connectorRadius = theme.global?.edgeSize?.xsmall || '4px';
    const connectorOffset = `calc(${parentSize} / 2 + ${buttonPad})`;
    const connectorGap = '4px';
    const nonBetweenTop = `calc(${parentSize} + ${buttonPad} +
      (${indicatorBorderWidth} * 2) + ${connectorGap})`;

    return css`
      border-radius: ${connectorRadius};
      ${props.direction === 'horizontal'
        ? css`
            top: ${connectorOffset};
            left: calc(${props.isBetween ? '-' : ''}50% + ${connectorOffset});
            right: calc(-50% + ${connectorOffset});
            height: ${connectorThickness};
            margin-inline: ${props.theme.global.edgeSize[
              stepTheme?.connector?.margin || 'xxsmall'
            ]};
          `
        : css`
            left: calc(
              ${connectorOffset} + ${indicatorBorderWidth} -
                ${connectorThickness} / 2
            );
            top: ${props.isBetween ? 0 : nonBetweenTop};
            bottom: 0;
            ${!props.isBetween &&
            css`
              min-height: 12px;
            `}
            width: ${connectorThickness};
            margin-block: 0;
          `}
    `;
  }}
  position: absolute;
  background: ${(props) =>
    normalizeColor(props.stepTheme?.connector?.color || 'border', props.theme)};
`;

const StyledSubStepsList = styled(Box).withConfig({
  shouldForwardProp: (prop) => prop !== 'isVertical' && prop !== 'stepTheme',
})`
  list-style: none;
  position: relative;
  ${(props) => {
    if (!props.isVertical) return '';

    const indicatorSizeToken = props.stepTheme.indicator?.size || 'medium';
    const indicatorSize = getMetricSize(props.theme, indicatorSizeToken);
    const textGap =
      props.theme.global?.edgeSize?.[
        props.stepTheme?.button?.gap || 'small'
      ];
    const buttonPad =
      props.theme.global?.edgeSize?.[
        props.stepTheme?.button?.pad || 'xxsmall'
      ];
    return css`
      left: calc(${indicatorSize} + ${textGap} + ${buttonPad});
    `;
  }}
`;

export {
  StyledStepItem,
  StyledStepButton,
  StyledStepContent,
  StyledIndicator,
  StyledConnector,
  StyledSubStepsList,
};
