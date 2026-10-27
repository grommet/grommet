// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled, { css } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import {
  focusStyle,
  normalizeColor,
  styledComponentsConfig,
} from '../../utils';
import { Box } from '../Box';

const getMetricSize = (theme, size) =>
  theme.global?.edgeSize?.[size] || theme.global?.size?.[size] || size;

// const getTextMetric = (theme, size, metric) =>
//   theme.text?.[size]?.[metric] || theme.text?.medium?.[metric];

const getBorderWidth = (theme, size) =>
  theme.global?.borderSize?.[size] || size || theme.global?.borderSize?.xsmall;

// const getSubStepSizeToken = (indicatorSize) => {
//   switch (indicatorSize) {
//     case 'large':
//       return 'small';
//     case 'small':
//       return 'xsmall';
//     default:
//       return 'small';
//   }
// };

const getConnectorColor = (stepStatus, theme) =>
  normalizeColor(
    theme.stepper?.[stepStatus]?.connector?.color || 'border',
    theme,
  );

const StyledStepItem = styled.li.withConfig({
  shouldForwardProp: (prop) =>
    isPropValid(prop) && prop !== 'direction',
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

// transition: transform 0.1s ease, background-color 0.15s ease,
//   border-color 0.15s ease, color 0.15s ease;
const StyledIndicator = styled(Box)`
  box-sizing: content-box;

  ${(props) =>
    (() => {
      const indicatorSizeToken =
        props.stepTheme?.indicator?.size || 'medium';
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
    // if (!props.isClickable) return '';

    // const { theme } = props;
    // const stateTheme= theme.stepper?.[props.effectiveState]?.indicator || {};
    // const backgroundColor = stateTheme?.background
    //   ? normalizeColor(stateTheme.background, theme)
    //   : undefined;
    // const borderColor = stateTheme?.border
    //   ? normalizeColor(stateTheme.border, theme)
    //   : undefined;
    // const color = stateTheme?.color
    //   ? normalizeColor(stateTheme.color, theme)
    //   : undefined;

    // const stateBackgroundHoverColor = stateTheme?.hover?.background
    //   ? normalizeColor(stateTheme.hover.background, theme)
    //   : undefined;
    // const stateBorderHoverColor = stateTheme?.hover?.border
    //   ? normalizeColor(stateTheme.hover.border, theme)
    //   : undefined;
    // const stateColorHoverColor = stateTheme?.hover?.color
    //   ? normalizeColor(stateTheme.hover.color, theme)
    //   : undefined;

    // const defaultBackgroundHoverColor = backgroundColor
    //   ? `color-mix(in srgb, ${backgroundColor} 80%, black)`
    //   : normalizeColor(
    //       theme.stepper?.hover?.background || 'background-contrast',
    //       theme,
    //     );
    // const defaultBorderHoverColor = borderColor
    //   ? `color-mix(in srgb, ${borderColor} 80%, black)`
    //   : normalizeColor(theme.stepper?.hover?.border || 'text', theme);
    // const defaultColorHoverColor = color
    //   ? `color-mix(in srgb, ${color} 80%, black)`
    //   : normalizeColor('text-strong', theme);

    // const hoverBackgroundColor =
    //   stateBackgroundHoverColor || defaultBackgroundHoverColor;
    // const hoverBorderColor =stateBorderHoverColor || defaultBorderHoverColor;
    // const hoverColor = stateColorHoverColor || defaultColorHoverColor;

    // const hoverStyles = (() => css`
    //   background: ${hoverBackgroundColor};
    //   border-color: ${hoverBorderColor};
    //   color: ${hoverColor};
    // `)();

    const hoverBackgroundColor = normalizeColor(
      props.theme.stepper?.hover?.background || 'background-contrast',
      props.theme,
    );
    const hoverBorderColor = normalizeColor(
      props.theme.stepper?.hover?.border || 'text',
      props.theme,
    );
    const hoverColor = normalizeColor('text-strong', props.theme);
    const hoverStyles = css`
      background: ${hoverBackgroundColor};
      border-color: ${hoverBorderColor};
      color: ${hoverColor};
    `;

    //   ${StyledStepButton}:not([aria-disabled]):active & {
    //     transform: scale(0.95);
    //   }
    return css`
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
    const { theme } = props;
    const indicatorSizeToken = theme.stepper?.indicator?.size || 'medium';
    const parentSize = getMetricSize(theme, indicatorSizeToken);
    const indicatorBorderWidth = getMetricSize(
      theme,
      theme.stepper?.indicator?.border?.width || '2px',
    );
    const buttonPad =
      props.theme.global?.edgeSize?.[
        props.theme.stepper?.button?.pad || 'xxsmall'
      ];
    const connectorStrokeToken =
      theme.stepper?.connector?.stroke?.width || 'small';
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
              props.theme.stepper?.horizontal?.connector?.margin || 'xxsmall'
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
  background: ${(props) => getConnectorColor(props.status, props.theme)};
`;

const StyledSubStepsList = styled.ol.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'direction',
})`
  list-style: none;
  margin: 0;
  padding: 0;
  ${(props) => {
    if (props.direction !== 'vertical') return '';

    const indicatorSizeToken = props.theme.stepper?.indicator?.size || 'medium';
    const indicatorSize = getMetricSize(props.theme, indicatorSizeToken);
    const textGap =
      props.theme.global?.edgeSize?.[
        props.theme.stepper?.vertical?.button?.gap || 'small'
      ];
    const buttonPad =
      props.theme.global?.edgeSize?.[
        props.theme.stepper?.button?.pad || 'xxsmall'
      ];
    return css`
      padding-inline-start: calc(${indicatorSize} + ${textGap} + ${buttonPad});
    `;
  }}
`;

export {
  StyledStepItem,
  StyledStepButton,
  StyledIndicator,
  StyledConnector,
  StyledSubStepsList,
};
