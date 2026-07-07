import styled, { css } from 'styled-components';
import { normalizeColor, styledComponentsConfig } from '../../utils';
import { base } from '../../themes/base';
import { Text } from '../Text';

const getStepperTheme = (theme) => (theme && theme.global ? theme : base);

const getMetricSize = (theme, size) =>
  theme.global?.edgeSize?.[size] || theme.global?.size?.[size] || size;

const getTextMetric = (theme, size, metric) =>
  theme.text?.[size]?.[metric] || theme.text?.medium?.[metric];

const getSubStepSizeToken = (indicatorSize) => {
  switch (indicatorSize) {
    case 'large':
      return 'small';
    case 'small':
      return 'xsmall';
    default:
      return 'small';
  }
};

const getGlobalFocusStyles = (theme) => {
  const focus = theme.global?.focus;

  if (!focus) {
    const color = normalizeColor('focus', theme);
    return css`
      outline: ${theme.global?.borderSize?.small || '2px'} solid ${color};
    `;
  }

  if (typeof focus !== 'object') {
    return css`
      outline: ${focus};
    `;
  }

  const getOutlineStyles = () => {
    if (!focus.outline) return '';

    if (typeof focus.outline === 'object') {
      const color = normalizeColor(focus.outline.color || 'focus', theme);
      const size = focus.outline.size || theme.global?.borderSize?.small;
      const offset = focus.outline.offset || theme.global?.edgeSize?.none;
      return `
        outline-offset: ${offset};
        outline: ${size} solid ${color};
      `;
    }

    return `outline: ${focus.outline};`;
  };

  const getShadowStyles = () => {
    if (!focus.shadow) return '';

    if (typeof focus.shadow === 'object') {
      const color = normalizeColor(
        (focus.border && focus.border.color) || focus.shadow.color || 'focus',
        theme,
      );
      const size = focus.shadow.size || theme.global?.borderSize?.small;
      const blur = focus.shadow.blur || size;
      const inset = focus.shadow.inset ? ' inset' : '';
      return `box-shadow: 0 0 ${blur} ${size} ${color}${inset};`;
    }

    return `box-shadow: ${focus.shadow};`;
  };

  const getBorderStyles = () => {
    if (!focus.border) return '';
    const color = normalizeColor(focus.border.color || 'focus', theme);
    return `border-color: ${color};`;
  };

  const outlineStyles = getOutlineStyles();
  if (outlineStyles && !focus.twoColor) {
    return css`
      ${outlineStyles}
    `;
  }

  const shadowStyles = getShadowStyles();
  if (shadowStyles && !focus.twoColor) {
    return css`
      outline: none;
      ${shadowStyles}
    `;
  }

  const borderStyles = getBorderStyles();
  if (borderStyles && !focus.twoColor) {
    return css`
      outline: none;
      ${borderStyles}
    `;
  }

  if (focus.twoColor) {
    return css`
      ${outlineStyles}
      ${shadowStyles}
      ${borderStyles}
    `;
  }

  const color = normalizeColor('focus', theme);
  return css`
    outline: ${theme.global?.borderSize?.small || '2px'} solid ${color};
  `;
};

const StyledStepper = styled.ol.withConfig(styledComponentsConfig)`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  overflow: hidden;
  ${(props) =>
    props.direction === 'vertical'
      ? css`
          flex-direction: column;
          height: 100%;
          gap: ${getStepperTheme(props.theme)?.stepper?.vertical?.gap || '0'};
        `
      : css`
          flex-direction: row;
          align-items: flex-start;
          gap: ${getStepperTheme(props.theme)?.stepper?.horizontal?.gap || '0'};
        `}
  ${(props) => getStepperTheme(props.theme)?.stepper?.container?.extend};
`;

const StyledStepItem = styled.li.withConfig(styledComponentsConfig)`
  display: flex;
  position: relative;
  ${(props) => {
    if (props.direction === 'vertical') {
      return css`
        flex-direction: column;
        align-items: flex-start;
        padding-bottom: ${getStepperTheme(props.theme)?.global?.edgeSize
          ?.xxsmall || '4px'};
      `;
    }
    if (props.isSubStep) {
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
      overflow: hidden;
    `;
  }}
`;

const StyledStepButton = styled.button.withConfig(styledComponentsConfig)`
  display: flex;
  background: none;
  border: none;
  padding: ${(props) =>
    getStepperTheme(props.theme)?.global?.edgeSize?.xxsmall || '4px'};
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'default')};
  outline: none;
  ${(props) =>
    props.direction === 'vertical'
      ? css`
          flex-direction: row;
          align-items: ${props.isSubStep ? 'center' : 'flex-start'};
          gap: ${getStepperTheme(props.theme)?.global?.edgeSize?.small};
          text-align: left;
        `
      : css`
          flex-direction: column;
          align-items: center;
          gap: ${getStepperTheme(props.theme)?.global?.edgeSize?.xxsmall};
          text-align: center;
          width: 100%;
        `}
`;

const StyledStepContent = styled.span.withConfig(styledComponentsConfig)`
  display: flex;
  flex-direction: column;
  ${(props) => {
    if (
      props.direction === 'vertical' &&
      !props.isSubStep &&
      !props.hasDescription
    ) {
      const theme = getStepperTheme(props.theme);
      const indicatorSizeToken = theme.stepper?.indicator?.size || 'medium';
      const indicatorSize = getMetricSize(theme, indicatorSizeToken);
      const lineHeight = getTextMetric(theme, 'small', 'height');
      return css`
        padding-top: calc((${indicatorSize} - ${lineHeight}) / 2);
      `;
    }
    return '';
  }}
`;

const StyledIndicator = styled.span.withConfig(styledComponentsConfig)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: transform 0.1s ease, background-color 0.15s ease,
    border-color 0.15s ease, color 0.15s ease;

  ${(props) =>
    (() => {
      const theme = getStepperTheme(props.theme);
      const indicatorSizeToken = theme.stepper?.indicator?.size || 'medium';
      const parentSize = getMetricSize(theme, indicatorSizeToken);
      const subStepSize = getMetricSize(
        theme,
        getSubStepSizeToken(indicatorSizeToken),
      );
      const borderWidth =
        theme.stepper?.indicator?.border?.width ||
        theme.global?.borderSize?.small ||
        '2px';

      return props.isSubStep
        ? css`
            width: ${subStepSize};
            height: ${subStepSize};
            min-width: ${subStepSize};
            min-height: ${subStepSize};
            border: none;
            background: transparent;
          `
        : css`
            width: ${parentSize};
            height: ${parentSize};
            min-width: ${parentSize};
            min-height: ${parentSize};
            border: ${borderWidth} solid;
          `;
    })()}

  ${(props) => {
    const theme = getStepperTheme(props.theme);

    const getIndicatorToken = (state, prop, fallback) =>
      theme.stepper?.[state]?.indicator?.[prop] || fallback;

    if (props.isSubStep) {
      switch (props.effectiveState) {
        case 'current':
        case 'current-completed':
        case 'completed':
          return css`
            color: ${normalizeColor(
              getIndicatorToken('completed', 'border', 'brand'),
              theme,
            )};
          `;
        case 'error':
        case 'current-error':
          return css`
            color: ${normalizeColor(
              getIndicatorToken('error', 'border', 'status-error'),
              theme,
            )};
          `;
        case 'disabled':
          return css`
            color: ${normalizeColor(
              getIndicatorToken('disabled', 'border', 'border'),
              theme,
            )};
            opacity: 0.6;
          `;
        default:
          return css`
            color: ${normalizeColor(
              getIndicatorToken('pending', 'border', 'border'),
              theme,
            )};
          `;
      }
    }
    switch (props.effectiveState) {
      case 'current':
      case 'current-completed':
        return css`
          background: ${normalizeColor(
            getIndicatorToken('current', 'background', 'brand'),
            theme,
          )};
          color: ${normalizeColor(
            getIndicatorToken('current', 'color', 'white'),
            theme,
          )};
          border-color: ${normalizeColor(
            getIndicatorToken('current', 'border', 'brand'),
            theme,
          )};
        `;
      case 'current-error':
        return css`
          background: ${normalizeColor(
            getIndicatorToken('currentError', 'background', 'status-error'),
            theme,
          )};
          color: ${normalizeColor(
            getIndicatorToken('currentError', 'color', 'white'),
            theme,
          )};
          border-color: ${normalizeColor(
            getIndicatorToken('currentError', 'border', 'status-error'),
            theme,
          )};
        `;
      case 'completed':
        return css`
          background: ${normalizeColor(
            getIndicatorToken('completed', 'background', 'transparent'),
            theme,
          )};
          color: ${normalizeColor(
            getIndicatorToken('completed', 'color', 'brand'),
            theme,
          )};
          border-color: ${normalizeColor(
            getIndicatorToken('completed', 'border', 'brand'),
            theme,
          )};
        `;
      case 'error':
        return css`
          background: ${normalizeColor(
            getIndicatorToken('error', 'background', 'transparent'),
            theme,
          )};
          color: ${normalizeColor(
            getIndicatorToken('error', 'color', 'status-error'),
            theme,
          )};
          border-color: ${normalizeColor(
            getIndicatorToken('error', 'border', 'status-error'),
            theme,
          )};
        `;
      case 'disabled':
        return css`
          background: ${normalizeColor(
            getIndicatorToken('disabled', 'background', 'transparent'),
            theme,
          )};
          color: ${normalizeColor(
            getIndicatorToken('disabled', 'color', 'text-weak'),
            theme,
          )};
          border-color: ${normalizeColor(
            getIndicatorToken('disabled', 'border', 'border'),
            theme,
          )};
          opacity: 0.6;
        `;
      default:
        return css`
          background: ${normalizeColor(
            getIndicatorToken('pending', 'background', 'transparent'),
            theme,
          )};
          color: ${normalizeColor(
            getIndicatorToken('pending', 'color', 'text-weak'),
            theme,
          )};
          border-color: ${normalizeColor(
            getIndicatorToken('pending', 'border', 'border'),
            theme,
          )};
        `;
    }
  }}

  ${StyledStepButton}:focus-visible & {
    ${(props) => getGlobalFocusStyles(getStepperTheme(props.theme))}
  }

  ${(props) => {
    if (!props.isClickable) return '';

    const theme = getStepperTheme(props.theme);
    const brandColor = normalizeColor('brand', theme);
    const errorColor = normalizeColor('status-error', theme);
    const brandHover = theme.stepper?.hover?.brand
      ? normalizeColor(theme.stepper.hover.brand, theme)
      : `color-mix(in srgb, ${brandColor} 80%, black)`;
    const errorHover = theme.stepper?.hover?.error
      ? normalizeColor(theme.stepper.hover.error, theme)
      : `color-mix(in srgb, ${errorColor} 80%, black)`;
    const borderHover =
      normalizeColor(theme.stepper?.hover?.border || 'text', theme) ||
      '#444444';

    const hoverStyles = props.isSubStep
      ? (() => {
          switch (props.effectiveState) {
            case 'current':
            case 'current-completed':
            case 'completed':
              return css`
                color: ${brandHover};
              `;
            case 'error':
            case 'current-error':
              return css`
                color: ${errorHover};
              `;
            default:
              return css`
                color: ${borderHover};
              `;
          }
        })()
      : (() => {
          switch (props.effectiveState) {
            case 'current':
            case 'current-completed':
              return css`
                background: ${brandHover};
                border-color: ${brandHover};
              `;
            case 'completed':
              return css`
                color: ${brandHover};
                border-color: ${brandHover};
              `;
            case 'error':
              return css`
                color: ${errorHover};
                border-color: ${errorHover};
              `;
            case 'current-error':
              return css`
                background: ${errorHover};
                border-color: ${errorHover};
              `;
            default:
              return css`
                border-color: ${borderHover};
                color: ${borderHover};
              `;
          }
        })();

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
  }
`;

const StyledLabelText = styled(Text).withConfig(styledComponentsConfig)`
  ${(props) => {
    const theme = getStepperTheme(props.theme);
    const size = props.isSubStep ? 'xsmall' : 'small';
    return css`
      font-size: ${getTextMetric(theme, size, 'size')};
      line-height: ${getTextMetric(theme, size, 'height')};
    `;
  }}
  ${(props) => {
    const theme = getStepperTheme(props.theme);
    const { stepper } = theme;
    switch (props.effectiveState) {
      case 'current':
      case 'current-completed':
        return css`
          font-weight: ${stepper?.current?.label?.weight || 'bold'};
          color: ${normalizeColor(
            stepper?.current?.label?.color || 'brand',
            theme,
          )};
        `;
      case 'error':
        return css`
          font-weight: ${stepper?.error?.label?.weight || 'normal'};
          color: ${normalizeColor(
            stepper?.error?.label?.color || 'text',
            theme,
          )};
        `;
      case 'current-error':
        return css`
          font-weight: ${stepper?.currentError?.label?.weight || 'bold'};
          color: ${normalizeColor(
            stepper?.currentError?.label?.color || 'brand',
            theme,
          )};
        `;
      case 'completed':
        return css`
          font-weight: ${stepper?.completed?.label?.weight || 'normal'};
          color: ${normalizeColor(
            stepper?.completed?.label?.color || 'text-weak',
            theme,
          )};
        `;
      case 'disabled':
        return css`
          font-weight: ${stepper?.disabled?.label?.weight || 'normal'};
          color: ${normalizeColor(
            stepper?.disabled?.label?.color || 'text-weak',
            theme,
          )};
        `;
      default:
        return css`
          font-weight: ${stepper?.pending?.label?.weight || 'normal'};
          color: ${normalizeColor(
            stepper?.pending?.label?.color || 'text',
            theme,
          )};
        `;
    }
  }}
  ${(props) =>
    props.direction === 'horizontal' &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    `}
`;

const StyledDescription = styled(Text).withConfig(styledComponentsConfig)`
  ${(props) => {
    const theme = getStepperTheme(props.theme);
    const size = theme.stepper?.description?.font?.size || 'xsmall';
    return css`
      font-size: ${getTextMetric(theme, size, 'size')};
      line-height: ${getTextMetric(theme, size, 'height')};
    `;
  }}
  color: ${(props) =>
    normalizeColor('text-weak', getStepperTheme(props.theme))};
  margin-top: ${(props) =>
    getMetricSize(
      getStepperTheme(props.theme),
      getStepperTheme(props.theme)?.stepper?.description?.margin?.top ||
        'xxsmall',
    )};
  ${(props) =>
    props.direction === 'horizontal' &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    `}
`;

const StyledHelperText = styled(Text).withConfig(styledComponentsConfig)`
  ${(props) => {
    const theme = getStepperTheme(props.theme);
    const size = theme.stepper?.helperText?.font?.size || 'xsmall';
    return css`
      font-size: ${getTextMetric(theme, size, 'size')};
      line-height: ${getTextMetric(theme, size, 'height')};
    `;
  }}
  margin-top: ${(props) =>
    getMetricSize(
      getStepperTheme(props.theme),
      getStepperTheme(props.theme)?.stepper?.helperText?.margin?.top ||
        'xxsmall',
    )};
  color: ${(props) =>
    normalizeColor('text-weak', getStepperTheme(props.theme))};
`;

const StyledConnector = styled.span.withConfig(styledComponentsConfig)`
  ${(props) => {
    const theme = getStepperTheme(props.theme);
    const indicatorSizeToken = theme.stepper?.indicator?.size || 'medium';
    const parentSize = getMetricSize(theme, indicatorSizeToken);
    const buttonPad = theme.global?.edgeSize?.xxsmall || '4px';
    const connectorThickness =
      theme.stepper?.connector?.stroke?.width ||
      theme.global?.borderSize?.small ||
      '2px';
    const connectorRadius = theme.global?.edgeSize?.xsmall || '4px';
    const connectorOffset = `calc(${parentSize} / 2 + ${buttonPad})`;

    return css`
      border-radius: ${connectorRadius};
      ${props.direction === 'horizontal'
        ? css`
            top: ${connectorOffset};
            left: calc(50% + ${connectorOffset});
            right: calc(-50% + ${connectorOffset});
            height: ${connectorThickness};
          `
        : css`
            left: calc(${connectorOffset} - ${connectorThickness} / 2);
            top: calc(${parentSize} + ${buttonPad} * 3);
            bottom: 0;
            width: ${connectorThickness};
          `}
    `;
  }}
  position: absolute;
  background: ${(props) => props.connectorColor};
`;

export {
  StyledStepper,
  StyledStepItem,
  StyledStepButton,
  StyledStepContent,
  StyledIndicator,
  StyledLabelText,
  StyledDescription,
  StyledHelperText,
  StyledConnector,
};
