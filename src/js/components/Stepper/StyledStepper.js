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
  heightStyle,
  widthStyle,
  edgeStyle,
  elevationStyle,
  roundStyle,
} from '../../utils';
import { Box } from '../Box';
import { Text } from '../Text';

const getIconSize = (theme, size) =>
  theme.global?.edgeSize?.[size] || size;

const getMetricSize = (theme, size) =>
  theme.global?.edgeSize?.[size] || theme.global?.size?.[size] || size;

const getPadSize = (theme, pad = 'xxsmall', side) => {
  let value = pad;
  if (typeof pad === 'object' && pad !== null) {
    const axis =
      side === 'top' || side === 'bottom' ? 'vertical' : 'horizontal';
    let logicalSide;
    if (side === 'left') logicalSide = theme.dir === 'rtl' ? 'end' : 'start';
    if (side === 'right') logicalSide = theme.dir === 'rtl' ? 'start' : 'end';

    // Match Box's edgeStyle: logical sides override physical sides and axes.
    value = pad[logicalSide] ?? pad[side] ?? pad[axis] ?? 'none';
  }
  return theme.global?.edgeSize?.[value] || (value === 'none' ? '0px' : value);
};

const getTextMetric = (theme, size, metric) =>
  theme.text?.[size]?.[metric] || theme.text?.medium?.[metric];

const getBorderWidth = (theme, size) =>
  theme.global?.borderSize?.[size] || size || theme.global?.borderSize?.xsmall;

const adjustHoverColor = (color, theme) =>
  `color-mix(in srgb, ${normalizeColor(color, theme)} 90%, ${
    theme.dark ? 'white' : 'black'
  } 10%)`;

const sizeStyle = (sizeProp, theme) => {
  const size = sizeProp || 'medium';
  const data = theme.text[size];
  if (data) {
    return css`
      font-size: ${data.size};
      line-height: ${data.height};
    `;
  }
  return css`
    font-size: ${size};
    line-height: normal;
  `;
};

const iconSizeStyle = (sizeProp, theme) => {
  const size = getIconSize(theme, sizeProp);
  return css`
    width: ${size};
    max-width: ${size};
    height: ${size};
    max-height: ${size};
  `;
};

const StyledStepItem = styled.li.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'direction',
})`
  display: flex;
  position: relative;
  ${(props) => {
    if (props.direction === 'vertical') {
      const { gap } = props.stepTheme?.container || {};
      const gapValue =
        gap?.row ||
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
      const indicator = props.stepTheme?.indicator;
      const indicatorBorderWidth = getBorderWidth(
        props.theme,
        indicator?.border?.size || '2px',
      );
      const indicatorHeight = indicator?.height?.height || indicator?.height;
      const indicatorSize = indicatorHeight
        ? (props.theme.global.size[indicatorHeight] || indicatorHeight)
        : getIconSize(props.theme, indicator?.size || 'medium');
      const lineHeight = getTextMetric(props.theme,
        props.stepTheme?.label?.size || 'medium', 'height');
      return css`
        padding-top: calc(
          (${indicatorSize} - ${lineHeight}) / 2 + ${indicatorBorderWidth}
        );
      `;
    }
    return '';
  }}
`;

const StyledStepLabel = styled(Text)`
  ${(props) => {
    if (!props.isClickable || !props.stepTheme?.hover?.label) return '';

    // For hover colors we'll use the hover part of the stepper theme
    // that resolved for the step.
    const { theme } = props;
    const hoverTheme = props.stepTheme?.hover?.label;

    return css`
      ${StyledStepButton}:not([aria-disabled]):hover & {
        ${hoverTheme?.color
          ? `color: ${normalizeColor(hoverTheme?.color, theme)};`
          : ''}
        ${hoverTheme?.weight ? `font-weight: ${hoverTheme?.weight};` : ''}
        ${hoverTheme?.size ? sizeStyle(hoverTheme?.size, theme) : ''}
      }
    `;
  }}
`;

const StyledIndicator = styled(Box)`
  box-sizing: content-box;

  ${(props) =>
    (() => css`
        color: ${normalizeColor(
          props.stepTheme?.indicator?.color || 'text',
          props.theme,
        )};
      `)()}

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
      ${hoverTheme.size && iconSizeStyle(hoverTheme.size, theme)}
      ${hoverTheme.height && heightStyle(hoverTheme.height, theme)}
      ${hoverTheme.width && widthStyle(hoverTheme.width, theme)}
      ${hoverTheme.margin &&
        edgeStyle(
          'margin',
          hoverTheme.margin,
          false,
          props?.theme?.box?.responsiveBreakpoint,
          theme,
        )}
      ${hoverTheme.pad &&
        edgeStyle(
          'padding',
          hoverTheme.pad,
          false,
          props?.theme?.box?.responsiveBreakpoint,
          theme,
        )}
      ${hoverTheme.round && roundStyle(hoverTheme.round, false, theme)}
      ${hoverTheme.elevation && elevationStyle(hoverTheme.elevation, theme)}
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
    const indicator = stepTheme?.indicator;

    // width and height could be specified as box props in which case
    // the t-shirt values will be from theme.global.size.
    // But use the size from the theme if available. In that case
    // the t-shirt values are icon sizes. 
    const indicatorWidth = indicator?.width?.width || indicator?.width;
    const indicatorHeight = indicator?.height?.height || indicator?.height;
    const width = indicatorWidth
      ? (theme.global.size[indicatorWidth] || indicatorWidth)
      : getIconSize(theme, indicator?.size || 'medium');
    const height = indicatorHeight
      ? (theme.global.size[indicatorHeight] || indicatorHeight)
      : getIconSize(theme, indicator?.size || 'medium');
    const indicatorBorderWidth = getBorderWidth(
      theme,
      indicator?.border?.size || '2px',
    );
    const buttonPad = stepTheme?.button?.pad;
    const padTop = getPadSize(theme, buttonPad, 'top');
    const padLeft = getPadSize(theme, buttonPad, 'left');
    const padRight = getPadSize(theme, buttonPad, 'right');
    const connectorStrokeToken = stepTheme?.connector?.thickness || 'small';
    const connectorThickness = getBorderWidth(theme, connectorStrokeToken);

    const connectorRadius = theme.global?.edgeSize?.xsmall || '4px';
    const connectorTop = `calc(${height} / 2 + ${padTop})`;
    const connectorLeft = `calc(${width} / 2 + ${padLeft})`;
    const connectorRight = `calc(${width} / 2 + ${padRight})`;
    const connectorGap = '4px';
    const nonBetweenTop = `calc(${height} + ${padTop} +
      (${indicatorBorderWidth} * 2) + ${connectorGap})`;

    return css`
      border-radius: ${connectorRadius};
      ${props.direction === 'horizontal'
        ? css`
            top: ${connectorTop};
            left: calc(${props.isBetween ? '-' : ''}50% + ${connectorLeft});
            right: calc(-50% + ${connectorRight});
            height: ${connectorThickness};
            margin-inline-start: ${padLeft};
            margin-inline-end: ${padRight};
          `
        : css`
            left: calc(
              ${connectorLeft} + ${indicatorBorderWidth} -
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

    const indicator = props.stepTheme?.indicator || {};
    const indicatorWidth = indicator?.width?.width || indicator?.width;
    const indicatorSize = indicatorWidth
      ? (props.theme.global.size[indicatorWidth] || indicatorWidth)
      : getIconSize(props.theme, indicator?.size || 'medium');
    const textGap =
      props.theme.global?.edgeSize?.[
        props.stepTheme?.button?.gap || 'small'
      ] || props.stepTheme?.button?.gap;
    const buttonPad = getPadSize(
      props.theme,
      props.stepTheme?.button?.pad,
      'left',
    );
    return css`
      left: calc(${indicatorSize} + ${textGap} + ${buttonPad});
    `;
  }}
`;

export {
  StyledStepItem,
  StyledStepButton,
  StyledStepContent,
  StyledStepLabel,
  StyledIndicator,
  StyledConnector,
  StyledSubStepsList,
};
