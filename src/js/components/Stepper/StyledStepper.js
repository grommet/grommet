import styled, { css } from 'styled-components';
import { normalizeColor, styledComponentsConfig } from '../../utils';

const StyledStepper = styled.ol.withConfig(styledComponentsConfig)`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  ${(props) =>
    props.direction === 'vertical'
      ? css`
          flex-direction: column;
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
  ${(props) =>
    props.direction === 'vertical'
      ? css`
          flex-direction: column;
          align-items: flex-start;
          padding-bottom: ${props.isSubStep ? '8px' : '16px'};
        `
      : css`
          flex-direction: column;
          align-items: center;
          flex: 1;
          min-width: 0;
        `}
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
          align-items: center;
          gap: 12px;
          text-align: left;
        `
      : css`
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
          width: 100%;
        `}

  &:focus-visible {
    .stepper-indicator {
      outline: 2px solid
        ${(props) =>
          props.theme.stepper?.focus?.ring?.color ||
          props.theme.global?.colors?.focus ||
          '#6FFFB0'};
      outline-offset: ${(props) =>
        props.theme.stepper?.focus?.ring?.offset || '2px'};
    }
  }

  &:hover {
    ${(props) =>
      props.isClickable &&
      !props.isDisabled &&
      css`
        .stepper-indicator {
          opacity: 0.85;
        }
      `}
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
  transition: transform 0.1s ease, opacity 0.15s ease;

  ${(props) =>
    props.isSubStep
      ? css`
          width: 12px;
          height: 12px;
          min-width: 12px;
          min-height: 12px;
          border: none;
        `
      : css`
          width: 32px;
          height: 32px;
          min-width: 32px;
          min-height: 32px;
          font-size: 14px;
          font-weight: 600;
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
            background: ${normalizeColor('status-ok', theme)};
          `;
        case 'error':
        case 'current-error':
          return css`
            background: ${normalizeColor('status-error', theme)};
          `;
        case 'disabled':
          return css`
            background: ${normalizeColor('border', theme)};
            opacity: 0.6;
          `;
        default:
          return css`
            background: ${normalizeColor('border', theme)};
          `;
      }
    }
    switch (props.effectiveState) {
      case 'current':
      case 'current-completed':
        return css`
          background: ${normalizeColor('brand', theme)};
          color: #ffffff;
          border-color: ${normalizeColor('brand', theme)};
        `;
      case 'completed':
        return css`
          background: ${normalizeColor('status-ok', theme)};
          color: #ffffff;
          border-color: ${normalizeColor('status-ok', theme)};
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
          background: ${normalizeColor('background-contrast', theme)};
          color: ${normalizeColor('text-weak', theme)};
          border-color: ${normalizeColor('border', theme)};
          opacity: 0.6;
        `;
      default:
        return css`
          background: ${normalizeColor('background-front', theme)};
          color: ${normalizeColor('text-strong', theme)};
          border-color: ${normalizeColor('border', theme)};
        `;
    }
  }}
`;

const StyledLabelText = styled.span.withConfig(styledComponentsConfig)`
  font-size: 14px;
  line-height: 1.4;
  ${(props) => {
    const { theme } = props;
    switch (props.effectiveState) {
      case 'current':
      case 'current-completed':
        return css`
          font-weight: bold;
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
  ${(props) =>
    props.direction === 'horizontal'
      ? css`
          position: absolute;
          top: 20px;
          left: calc(50% + 20px);
          right: calc(-50% + 20px);
          height: 2px;
          background: ${props.connectorColor};
        `
      : css`
          position: absolute;
          left: 19px;
          top: 40px;
          bottom: 0;
          width: 2px;
          background: ${props.connectorColor};
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
