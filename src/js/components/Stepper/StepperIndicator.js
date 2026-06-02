import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { base } from '../../themes/base';

import { StepperContext } from './StepperContext';
import { StyledIndicator } from './StyledStepper';

const CheckIcon = ({ size = 12, color = 'currentColor', strokeWidth = 3 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const WarningIcon = () => (
  <svg
    width="12"
    height="12"
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

const SubStepDot = ({ size = 10 }) => (
  <span
    aria-hidden="true"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: 'currentColor',
    }}
  />
);

const SubStepRing = ({ size = 8, strokeWidth = 1.5 }) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx={size / 2}
      cy={size / 2}
      r={size / 2 - strokeWidth / 2}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      fill="none"
    />
  </svg>
);

const RadioDot = () => (
  <span
    aria-hidden="true"
    style={{
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#ffffff',
    }}
  />
);

// Maps step status + current position to a visual state
// used by both the indicator and label components.
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

export const StepperIndicator = ({ stepId, isSubStep }) => {
  const { currentStep, steps } = useContext(StepperContext);
  const theme = useContext(ThemeContext) || base;

  const step = steps.find((s) => s.id === stepId);
  if (!step) return null;

  const isCurrent = currentStep === stepId;
  const hasCurrentChild =
    !isSubStep &&
    step.childIds &&
    step.childIds.length > 0 &&
    step.childIds.includes(currentStep);
  const isHighlighted = isCurrent || hasCurrentChild;
  const effectiveState = getEffectiveState(step.status, isHighlighted);

  const renderContent = () => {
    if (isSubStep) {
      switch (effectiveState) {
        case 'current':
          return <SubStepDot />;
        case 'current-completed':
          return <CheckIcon size={10} strokeWidth={4} />;
        case 'completed':
          return <CheckIcon size={10} />;
        case 'error':
        case 'current-error':
          return <SubStepDot />;
        case 'disabled':
          return <SubStepRing />;
        default:
          // pending - small hollow ring
          return <SubStepRing />;
      }
    }
    // Parent step indicator
    switch (effectiveState) {
      case 'current-completed':
      case 'completed':
        return <CheckIcon size={12} />;
      case 'current':
        return <RadioDot />;
      case 'error':
      case 'current-error':
        return <WarningIcon />;
      default:
        return null;
    }
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
