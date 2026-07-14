import React, { useContext, useMemo } from 'react';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useStepper, StepItemContext } from './StepperContext';
import { StepperIndicator } from './StepperIndicator';
import { StepperLabel } from './StepperLabel';
import { StepperDescription } from './StepperDescription';
import { StepperError, StepperDisabledReason } from './StepperHelperText';
import {
  StyledStepItem,
  StyledStepButton,
  StyledStepContent,
  StyledConnector,
} from './StyledStepper';

export const StepperStep = ({
  step,
  stepNumber,
  isLast,
  showConnector,
  direction,
  focusedIndex,
  index: indexProp,
  isSubStep,
  onFocusStep,
  stepsRef,
  stepRefs,
}) => {
  const { currentStep, clickableSteps, showDescription, onStepClick, steps } =
    useStepper();
  const { format } = useContext(MessageContext);
  const { passThemeFlag } = useThemeValue();
  const index =
    indexProp !== undefined
      ? indexProp
      : steps.findIndex((s) => s.id === step.id);
  const isCurrent = currentStep === step.id;
  const hasCurrentChild =
    !isSubStep && step.children?.some((c) => c.id === currentStep);
  const isHighlighted = isCurrent || hasCurrentChild;
  const isDisabled = step.status === 'disabled';
  const isClickable = clickableSteps && !isDisabled;
  const isReadOnly = !clickableSteps;

  const stepItemValue = useMemo(
    () => ({
      step,
      index,
      isLast,
      isLabelRevealed: direction === 'vertical' || focusedIndex === index,
      isSubStep,
    }),
    [step, index, isLast, direction, focusedIndex, isSubStep],
  );

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
    <StepItemContext.Provider value={stepItemValue}>
      <StyledStepItem
        direction={direction}
        isSubStep={isSubStep}
        {...passThemeFlag}
      >
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
          {...passThemeFlag}
        >
          <StepperIndicator />
          <StyledStepContent
            direction={direction}
            isSubStep={isSubStep}
            hasDescription={!!step.description}
            {...passThemeFlag}
          >
            <StepperLabel />
            {showDescription && <StepperDescription />}
            <StepperError />
            <StepperDisabledReason />
          </StyledStepContent>
        </StyledStepButton>
        {(showConnector !== undefined ? showConnector : !isLast) && (
          <StyledConnector
            direction={direction}
            status={step.status}
            aria-hidden="true"
            {...passThemeFlag}
          />
        )}
      </StyledStepItem>
    </StepItemContext.Provider>
  );
};
