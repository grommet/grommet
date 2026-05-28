import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { normalizeColor } from '../../utils';
import { base } from '../../themes/base';
import { StepperContext } from './StepperContext';
import { StepperIndicator, getEffectiveState } from './StepperIndicator';
import {
  StyledStepItem,
  StyledStepButton,
  StyledLabelText,
  StyledDescription,
  StyledHelperText,
  StyledConnector,
} from './StyledStepper';

const getConnectorColor = (stepStatus, theme) => {
  switch (stepStatus) {
    case 'completed':
      return normalizeColor('status-ok', theme);
    case 'error':
      return normalizeColor('status-error', theme);
    default:
      return normalizeColor('border', theme);
  }
};

export const StepperStep = ({
  step,
  stepNumber,
  isLast,
  showConnector,
  direction,
  focusedIndex,
  index,
  isSubStep,
  onKeyDown,
  stepsRef,
  childSteps,
}) => {
  const { currentStep, clickableSteps, onStepClick } =
    useContext(StepperContext);
  const theme = useContext(ThemeContext) || base;

  const isCurrent = currentStep === step.id;
  const isDisabled = step.status === 'disabled';
  const effectiveState = getEffectiveState(step.status, isCurrent);
  const isClickable = clickableSteps && !isDisabled;

  const handleClick = () => {
    if (isClickable && onStepClick) {
      onStepClick(step.id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isClickable && onStepClick) {
        onStepClick(step.id);
      }
    }
    if (onKeyDown) {
      onKeyDown(e, index);
    }
  };

  const totalSteps = stepsRef.current?.length || stepNumber;
  const ariaLabel =
    step['aria-label'] || `Step ${stepNumber} of ${totalSteps}: ${step.title}`;

  const describedBy = [];
  if (step.errorMessage && step.status === 'error') {
    describedBy.push(`stepper-error-${step.id}`);
  }
  if (step.disabledReason && step.status === 'disabled') {
    describedBy.push(`stepper-reason-${step.id}`);
  }

  return (
    <StyledStepItem direction={direction} isSubStep={isSubStep} theme={theme}>
      <StyledStepButton
        data-stepper-step
        aria-current={isCurrent ? 'step' : undefined}
        aria-disabled={isDisabled || undefined}
        aria-label={ariaLabel}
        aria-describedby={
          describedBy.length > 0 ? describedBy.join(' ') : undefined
        }
        tabIndex={focusedIndex === index ? 0 : -1}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        isClickable={isClickable}
        isDisabled={isDisabled}
        direction={direction}
        theme={theme}
        type="button"
      >
        <StepperIndicator
          stepId={step.id}
          stepNumber={stepNumber}
          isSubStep={isSubStep}
        />
        <span style={{ display: 'flex', flexDirection: 'column' }}>
          <StyledLabelText
            effectiveState={effectiveState}
            direction={direction}
            theme={theme}
          >
            {step.title}
          </StyledLabelText>
          {step.description && (
            <StyledDescription direction={direction} theme={theme}>
              {step.description}
            </StyledDescription>
          )}
          {step.status === 'error' && step.errorMessage && (
            <StyledHelperText
              id={`stepper-error-${step.id}`}
              variant="error"
              theme={theme}
            >
              {step.errorMessage}
            </StyledHelperText>
          )}
          {step.status === 'disabled' && step.disabledReason && (
            <StyledHelperText
              id={`stepper-reason-${step.id}`}
              variant="disabled"
              theme={theme}
            >
              {step.disabledReason}
            </StyledHelperText>
          )}
        </span>
      </StyledStepButton>
      {(showConnector !== undefined ? showConnector : !isLast) && (
        <StyledConnector
          direction={direction}
          connectorColor={getConnectorColor(step.status, theme)}
          isSubStep={isSubStep}
          aria-hidden="true"
          theme={theme}
        />
      )}
      {childSteps && direction === 'vertical' && (
        <ol style={{ listStyle: 'none', padding: '0 0 0 44px', margin: 0 }}>
          {childSteps}
        </ol>
      )}
      {childSteps && direction === 'horizontal' && childSteps}
    </StyledStepItem>
  );
};
