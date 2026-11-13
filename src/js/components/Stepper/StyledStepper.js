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

const getIconSize = (theme, size) => theme.global?.edgeSize?.[size] || size;

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
      const gapValue = gap?.row || gap || '0px';

      let paddingBottom = '0px';
      if (!props.isSubStep && !props.isLast) {
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

// Groups the step button with its supporting content (description, error,
// disabled reason) while keeping connectors and sub-steps outside. In
// vertical direction it is a two-column grid (indicator | text); the step
// button subgrids these columns so the label (inside the button) and the
// supporting content (outside the button) share the text column and stay
// left aligned. max-content (not auto) keeps the indicator column from
// absorbing free space, and minmax(0, max-content) keeps the button's
// click target at content width while allowing long text to wrap instead
// of overflowing.
const StyledStepMain = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'isVertical',
})`
  display: flex;
  min-width: 0;
  ${(props) => {
    if (props.isVertical) {
      const columnGap = getMetricSize(
        props.theme,
        props.stepTheme?.button?.gap || 'small',
      );
      return css`
        display: grid;
        grid-template-columns: max-content minmax(0, max-content);
        column-gap: ${columnGap};
      `;
    }
    return css`
      flex-direction: column;
      align-items: center;
      max-width: 100%;
    `;
  }}
`;

const StyledStepButton = styled(Box)`
  &:focus-visible {
    outline: none;
  }
  ${(props) =>
    props.isVertical &&
    css`
      /* span and subgrid the step main grid's indicator/text columns so
         the label aligns with the supporting content rendered below */
      grid-column: 1 / -1;
      grid-row: 1;
      display: grid;
      grid-template-columns: subgrid;
    `}
`;

const StyledStepContent = styled(Box)`
  ${(props) =>
    props.isVertical
      ? css`
          /* no overflow:hidden here: a non-visible overflow would turn
             this into a scroll container whose baseline is synthesized
             from its border box, breaking the button's baseline
             alignment of label and indicator */
          text-align: start;
        `
      : css`
          overflow: hidden;
        `}
`;

// Description, error and disabled reason live outside the step button but
// must left align with the label in vertical direction (text column of the
// step main grid) and center under the button in horizontal direction.
const StyledStepSupportingContent = styled(Box)`
  overflow: hidden;
  ${(props) =>
    props.isVertical
      ? css`
          grid-column: 2;
          grid-row: 2;
          text-align: start;
        `
      : css`
          max-width: 100%;
          text-align: center;
        `}
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

  /* Expose a text baseline at the indicator's visual center (the Box
     centers its content) so the vertical step button can baseline-align
     the label's first line with the indicator, regardless of indicator
     size or how many lines the label wraps to. The zero-width space
     takes no horizontal space; matching the label's font metrics makes
     the indicator center coincide exactly with the first line center.
     row direction keeps the strut beside the icon: stacked in a column
     the icon would push the strut (and the exported baseline) upward. */
  flex-direction: row;
  &::before {
    content: '\\200b';
    ${(props) => {
      const labelSize = props.stepTheme?.label?.size || 'medium';
      return css`
        font-size: ${getTextMetric(props.theme, labelSize, 'size')};
        line-height: ${getTextMetric(props.theme, labelSize, 'height')};
      `;
    }}
  }

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
    const buttonPad = stepTheme?.button?.pad;
    const padTop = getPadSize(theme, buttonPad, 'top');
    const padLeft = getPadSize(theme, buttonPad, 'left');
    const connectorStrokeToken = stepTheme?.connector?.thickness || 'small';
    const connectorThickness = getBorderWidth(theme, connectorStrokeToken);
    const connectorRadius = theme.global?.edgeSize?.xsmall || '4px';
    const connectorGap = '4px';

    // height could be specified as a box prop in which case the t-shirt
    // values will be from theme.global.size. But use the size from the
    // theme if available. In that case the t-shirt values are icon sizes.
    const indicatorHeight = indicator?.height?.height || indicator?.height;
    const height = indicatorHeight
      ? theme.global.size[indicatorHeight] || indicatorHeight
      : getIconSize(theme, indicator?.size || 'medium');

    if (props.direction === 'horizontal') {
      const indicatorWidth = indicator?.width?.width || indicator?.width;
      const width = indicatorWidth
        ? theme.global.size[indicatorWidth] || indicatorWidth
        : getIconSize(theme, indicator?.size || 'medium');
      const padRight = getPadSize(theme, buttonPad, 'right');
      const centerTop = `calc(${height} / 2 + ${padTop})`;
      const centerLeft = `calc(${width} / 2 + ${padLeft})`;
      const centerRight = `calc(${width} / 2 + ${padRight})`;
      // positioned relative to the step item so it can span across to
      // the adjacent step
      return css`
        position: absolute;
        border-radius: ${connectorRadius};
        top: ${centerTop};
        left: calc(50% + ${centerLeft});
        right: calc(-50% + ${centerRight});
        height: ${connectorThickness};
        margin-inline-start: ${padLeft};
        margin-inline-end: ${padRight};
      `;
    }

    // Vertical: an in-flow grid item in the indicator column of the step
    // main grid. It is anchored to the first row (the button row) and
    // cleared past the indicator with margin-top so that a label wrapping
    // to multiple lines cannot push the connector away from the indicator,
    // then stretches through the supporting content and sub-steps rows.
    const indicatorBorderWidth = getBorderWidth(
      theme,
      indicator?.border?.size || '2px',
    );
    // indicator is box-sizing: content-box, so its borders add to height
    const indicatorBox = `${height} + ${indicatorBorderWidth} * 2`;
    const { gap } = stepTheme?.container || {};
    const gapValue = gap?.row || gap || '0px';
    // when there is a following step, extend through the step item's
    // bottom padding so the line approaches the next step's indicator
    const stepGap = props.spansStepGap ? getMetricSize(theme, gapValue) : '0px';
    return css`
      grid-column: 1;
      grid-row: 1 / span 3;
      align-self: stretch;
      width: ${connectorThickness};
      border-radius: ${connectorRadius};
      /* decorative; never steal clicks from the overlapping button row */
      pointer-events: none;
      /* the button's inline-start edge padding is part of the indicator
         column; offset the centered connector by it so it lines up with
         the center of the indicator */
      justify-self: center;
      margin-inline-start: ${padLeft};
      /* start connectorGap below the indicator, and end the same gap
         short of the next step's indicator (padTop supplies part of
         that gap) */
      margin-top: calc(${padTop} + ${indicatorBox} + ${connectorGap});
      margin-bottom: calc(${connectorGap} - ${padTop} - ${stepGap});
    `;
  }}
  background: ${(props) =>
    normalizeColor(props.stepTheme?.connector?.color || 'border', props.theme)};
`;

const StyledSubStepsList = styled(Box).withConfig({
  shouldForwardProp: (prop) => prop !== 'isVertical' && prop !== 'stepTheme',
})`
  list-style: none;
  ${(props) =>
    props.isVertical
      ? css`
          /* text column of the step main grid, below the supporting
             content, so sub-steps left align with the label */
          grid-column: 2;
          grid-row: 3;
        `
      : ''}
`;

export {
  StyledStepItem,
  StyledStepMain,
  StyledStepButton,
  StyledStepContent,
  StyledStepSupportingContent,
  StyledStepLabel,
  StyledIndicator,
  StyledConnector,
  StyledSubStepsList,
};
