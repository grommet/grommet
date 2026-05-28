import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { base } from '../../themes/base';
import { StepperContext } from './StepperContext';
import { StyledIndicator } from './StyledStepper';

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const WarningIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

function getEffectiveState(status, isCurrent) {
  if (status === 'disabled') return 'disabled';
  if (isCurrent) {
    if (status === 'completed') return 'current-completed';
    if (status === 'error') return 'current-error';
    return 'current';
  }
  if (status === 'completed') return 'completed';
  if (status === 'error') return 'error';
  return 'pending';
}

export const StepperIndicator = ({ stepId, stepNumber, isSubStep }) => {
  const { currentStep } = useContext(StepperContext);
  const theme = useContext(ThemeContext) || base;
  const { steps } = useContext(StepperContext);

  const step = steps.find((s) => s.id === stepId);
  if (!step) return null;

  const isCurrent = currentStep === stepId;
  const effectiveState = getEffectiveState(step.status, isCurrent);

  const renderContent = () => {
    if (isSubStep) return null;
    if (
      effectiveState === 'completed' ||
      effectiveState === 'current-completed'
    ) {
      return <CheckIcon />;
    }
    if (effectiveState === 'error' || effectiveState === 'current-error') {
      return <WarningIcon />;
    }
    return <span aria-hidden="true">{stepNumber}</span>;
  };

  return (
    <StyledIndicator
      className="stepper-indicator"
      effectiveState={effectiveState}
      isSubStep={isSubStep}
      theme={theme}
      aria-hidden="true"
    >
      {renderContent()}
    </StyledIndicator>
  );
};

export const StepperLabel = ({ stepId }) => {
  const { steps } = useContext(StepperContext);
  const step = steps.find((s) => s.id === stepId);
  if (!step) return null;
  return <span>{step.title}</span>;
};

export const StepperDescription = ({ stepId }) => {
  const { steps } = useContext(StepperContext);
  const step = steps.find((s) => s.id === stepId);
  if (!step || !step.description) return null;
  return <span>{step.description}</span>;
};

export const StepperError = ({ stepId }) => {
  const { steps } = useContext(StepperContext);
  const step = steps.find((s) => s.id === stepId);
  if (!step || step.status !== 'error' || !step.errorMessage) return null;
  return (
    <span id={`stepper-error-${stepId}`} role="alert">
      {step.errorMessage}
    </span>
  );
};

export { getEffectiveState };
