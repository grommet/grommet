import styled, { css } from 'styled-components';
import { normalizeColor, styledComponentsConfig } from '../../utils';

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
          gap: ${props.theme.stepper?.vertical?.gap || '0'};
        `
      : css`
          flex-direction: row;
          align-items: flex-start;
          gap: ${props.theme.stepper?.horizontal?.gap || '0'};
        `}
  ${(props) => props.theme.stepper?.container?.extend};
`;

const StyledStepItem = styled.li.withConfig(styledComponentsConfig)`
  display: flex;
  position: relative;
  ${(props) => {
    if (props.direction === 'vertical') {
      return css`
        flex-direction: column;
        align-items: flex-start;
        padding-bottom: ${props.isSubStep ? '4px' : '4px'};
      `;
    }
    if (props.isSubStep) {
      return css`
        flex-direction: row;
        align-items: center;
        flex: none;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
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
  padding: 4px;
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'default')};
  outline: none;
  ${(props) =>
    props.direction === 'vertical'
      ? css`
          flex-direction: row;
          align-items: flex-start;
          gap: 12px;
          text-align: left;
        `
      : css`
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-align: center;
          width: 100%;
        `}

  &:focus-visible {
    .stepper-indicator {
      outline: none;
      box-shadow: 0 0 0 2px
          ${(props) => props.theme.stepper?.focus?.innerColor || '#ffffff'},
        0 0 0 4px
          ${(props) => props.theme.stepper?.focus?.outerColor || '#292d3a'};
    }
  }

  &:active {
    ${(props) =>
      props.isClickable &&
      !props.isDisabled &&
      css`
        .stepper-indicator {
          transform: scale(0.95);
        }
      `}
  }
`;

const StyledIndicator = styled.span.withConfig(styledComponentsConfig)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: transform 0.1s ease, background-color 0.15s ease,
    border-color 0.15s ease, color 0.15s ease;

  ${(props) =>
    props.isSubStep
      ? css`
          width: 14px;
          height: 14px;
          min-width: 14px;
          min-height: 14px;
          border: none;
          background: transparent;
        `
      : css`
          width: 24px;
          height: 24px;
          min-width: 24px;
          min-height: 24px;
          border: 2px solid;
        `}

  ${(props) => {
    const { theme } = props;
    if (props.isSubStep) {
      switch (props.effectiveState) {
        case 'current':
        case 'current-completed':
        case 'completed':
          return css`
            color: ${normalizeColor('brand', theme)};
          `;
        case 'error':
        case 'current-error':
          return css`
            color: ${normalizeColor('status-error', theme)};
          `;
        case 'disabled':
          return css`
            color: ${normalizeColor('border', theme)};
            opacity: 0.6;
          `;
        default:
          return css`
            color: ${normalizeColor('border', theme)};
          `;
      }
    }
    switch (props.effectiveState) {
      case 'current':
        return css`
          background: ${normalizeColor('brand', theme)};
          color: #ffffff;
          border-color: ${normalizeColor('brand', theme)};
        `;
      case 'current-completed':
        return css`
          background: ${normalizeColor('brand', theme)};
          color: #ffffff;
          border-color: ${normalizeColor('brand', theme)};
        `;
      case 'completed':
        return css`
          background: transparent;
          color: ${normalizeColor('brand', theme)};
          border-color: ${normalizeColor('brand', theme)};
        `;
      case 'error':
      case 'current-error':
        return css`
          background: ${normalizeColor('status-error', theme)};
          color: #ffffff;
          border-color: ${normalizeColor('status-error', theme)};
        `;
      case 'disabled':
        return css`
          background: transparent;
          color: ${normalizeColor('text-weak', theme)};
          border-color: ${normalizeColor('border', theme)};
          opacity: 0.6;
        `;
      default:
        return css`
          background: transparent;
          color: ${normalizeColor('text-weak', theme)};
          border-color: ${normalizeColor('border', theme)};
        `;
    }
  }}

  ${StyledStepButton}:not([aria-disabled]):hover & {
    ${(props) => {
      const { theme } = props;
      if (props.effectiveState === 'disabled') return '';

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

      if (props.isSubStep) {
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
      }

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
    }}
  }
`;

const StyledLabelText = styled.span.withConfig(styledComponentsConfig)`
  font-size: ${(props) => (props.isSubStep ? '12px' : '16px')};
  line-height: ${(props) => (props.isSubStep ? '16px' : '24px')};
  ${(props) => {
    const { theme } = props;
    switch (props.effectiveState) {
      case 'current':
      case 'current-completed':
        return css`
          font-weight: 500;
          color: ${normalizeColor('brand', theme)};
        `;
      case 'error':
      case 'current-error': {
        const fw = props.effectiveState === 'current-error' ? 'bold' : 'normal';
        return css`
          font-weight: ${fw};
          color: ${normalizeColor('status-error', theme)};
        `;
      }
      case 'disabled':
        return css`
          color: ${normalizeColor('text-weak', theme)};
        `;
      case 'completed':
        return css`
          color: ${normalizeColor('text-weak', theme)};
        `;
      default:
        return css`
          color: ${normalizeColor('text', theme)};
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

const StyledDescription = styled.span.withConfig(styledComponentsConfig)`
  font-size: 12px;
  color: ${(props) => normalizeColor('text-weak', props.theme)};
  margin-top: 2px;
  ${(props) =>
    props.direction === 'horizontal' &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    `}
`;

const StyledHelperText = styled.span.withConfig(styledComponentsConfig)`
  font-size: 11px;
  margin-top: 2px;
  color: ${(props) =>
    props.variant === 'error'
      ? normalizeColor('status-error', props.theme)
      : normalizeColor('text-weak', props.theme)};
`;

const StyledConnector = styled.span.withConfig(styledComponentsConfig)`
  position: absolute;
  background: ${(props) => props.connectorColor};
  border-radius: 4px;
  ${(props) =>
    props.direction === 'horizontal'
      ? css`
          top: 16px;
          left: calc(50% + 16px);
          right: calc(-50% + 16px);
          height: 2px;
        `
      : css`
          left: 15px;
          top: 36px;
          bottom: 0;
          width: 2px;
        `}
`;

export {
  StyledStepper,
  StyledStepItem,
  StyledStepButton,
  StyledIndicator,
  StyledLabelText,
  StyledDescription,
  StyledHelperText,
  StyledConnector,
};
