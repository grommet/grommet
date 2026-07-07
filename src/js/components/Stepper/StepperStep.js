import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { normalizeColor } from '../../utils';
import { MessageContext } from '../../contexts/MessageContext';
import { base } from '../../themes/base';

import { StepperContext } from './StepperContext';
import { StepperIndicator, getEffectiveState } from './StepperIndicator';
import {
  StyledStepItem,
  StyledStepButton,
  StyledStepContent,
  StyledLabelText,
  StyledDescription,
  StyledHelperText,
  StyledConnector,
} from './StyledStepper';

const getConnectorColor = (stepStatus, theme) => {
  switch (stepStatus) {
    case 'completed':
      return normalizeColor(
        theme.stepper?.completed?.connector?.color || 'brand',
        theme,
      );
    case 'error':
      return normalizeColor(
        theme.stepper?.error?.connector?.color || 'status-error',
        theme,
      );
    default:
      return normalizeColor(
        theme.stepper?.pending?.connector?.color || 'border',
        theme,
      );
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
  onFocusStep,
  stepsRef,
  stepRefs,
}) => {
  const { currentStep, clickableSteps, onStepClick } =
    useContext(StepperContext);
  const { format } = useContext(MessageContext);
  const theme = useContext(ThemeContext) || base;

  const isCurrent = currentStep === step.id;
  const hasCurrentChild =
    !isSubStep &&
    step.children &&
    step.children.length > 0 &&
    step.children.some((c) => c.id === currentStep);
  const isHighlighted = isCurrent || hasCurrentChild;
  const isDisabled = step.status === 'disabled';
  const effectiveState = getEffectiveState(step.status, isHighlighted);
  const isClickable = clickableSteps && !isDisabled;
  const isReadOnly = !clickableSteps;

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
  };

  const totalSteps = stepsRef.current?.length || stepNumber;
  const ariaLabel =
    step['aria-label'] ||
    format({
      id: 'stepper.step',
      values: {
        step: stepNumber,
        total: totalSteps,
        title: step.title,
      },
    });

  const describedBy = [];
  if (step.errorMessage && step.status === 'error') {
    describedBy.push(`stepper-error-${step.id}`);
  }
  if (step.disabledReason && step.status === 'disabled') {
    describedBy.push(`stepper-reason-${step.id}`);
  }

  const focusableProps = isReadOnly
    ? {}
    : {
        tabIndex: focusedIndex === index ? 0 : -1,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        onFocus: () => {
          if (onFocusStep) onFocusStep(index);
        },
        type: 'button',
      };

  return (
    <StyledStepItem direction={direction} isSubStep={isSubStep}>
      <StyledStepButton
        as={isReadOnly ? 'div' : 'button'}
        role={isReadOnly ? 'group' : undefined}
        ref={(el) => {
          if (stepRefs) {
            if (el) stepRefs.current.set(index, el);
            else stepRefs.current.delete(index);
          }
        }}
        aria-current={isHighlighted ? 'step' : undefined}
        aria-disabled={isDisabled || undefined}
        aria-label={ariaLabel}
        aria-describedby={
          describedBy.length > 0 ? describedBy.join(' ') : undefined
        }
        isClickable={isClickable}
        isDisabled={isDisabled}
        isSubStep={isSubStep}
        direction={direction}
        {...focusableProps}
      >
        <StepperIndicator
          stepId={step.id}
          stepNumber={stepNumber}
          isSubStep={isSubStep}
          isClickable={isClickable}
        />
        <StyledStepContent
          direction={direction}
          isSubStep={isSubStep}
          hasDescription={!!step.description}
        >
          <StyledLabelText
            effectiveState={effectiveState}
            direction={direction}
            isSubStep={isSubStep}
          >
            {step.title}
          </StyledLabelText>
          {step.description && (
            <StyledDescription direction={direction}>
              {step.description}
            </StyledDescription>
          )}
          {step.status === 'error' && step.errorMessage && (
            <StyledHelperText id={`stepper-error-${step.id}`} variant="error">
              {step.errorMessage}
            </StyledHelperText>
          )}
          {step.status === 'disabled' && step.disabledReason && (
            <StyledHelperText
              id={`stepper-reason-${step.id}`}
              variant="disabled"
            >
              {step.disabledReason}
            </StyledHelperText>
          )}
        </StyledStepContent>
      </StyledStepButton>
      {(showConnector !== undefined ? showConnector : !isLast) && (
        <StyledConnector
          direction={direction}
          connectorColor={getConnectorColor(step.status, theme)}
          isSubStep={isSubStep}
          aria-hidden="true"
        />
      )}
    </StyledStepItem>
  );
};
