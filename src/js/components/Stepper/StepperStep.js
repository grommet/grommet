// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useMemo } from 'react';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useStepper, StepItemContext } from './StepperContext';
import { StepperIndicator } from './StepperIndicator';
import { StepperLabel } from './StepperLabel';
import { StepperDescription } from './StepperDescription';
import { StepperError, StepperDisabledReason } from './StepperHelperText';
import { StepConnector } from './StepConnector';
import {
  StyledStepItem,
  StyledStepButton,
  StyledStepContent,
  StyledConnector,
  StyledSubStepsList,
} from './StyledStepper';
import { useStepTheme } from './utils';

export const StepperStep = ({
  step,
  stepNumber,
  isLast,
  showConnector,
  direction,
  focusedIndex,
  index: indexProp,
  isSubStep,
  subSteps,
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
  const hasChildren = !!step.children?.length;
  const navigationStepId = hasChildren
    ? step.children.find((child) => child.status !== 'disabled')?.id
    : step.id;
  const isDisabled = step.status === 'disabled';
  const isNavigable = !isDisabled && !!navigationStepId;
  const isClickable = clickableSteps && isNavigable;
  const isReadOnly = !clickableSteps;

  const stepTheme = useStepTheme(step, isSubStep);

  const stepItemValue = useMemo(
    () => ({
      step,
      index,
      isLast,
      isSubStep,
      isDisabled,
    }),
    [step, index, isLast, isSubStep, isDisabled],
  );

  const handleClick = () => {
    if (isClickable && navigationStepId && onStepClick) {
      onStepClick(navigationStepId);
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
  const accessibleLabel =
    step.status === 'completed'
      ? format({ id: 'stepper.completed', values: { step: ariaLabel } })
      : ariaLabel;

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
        forwardedAs: 'button',
        type: 'button',
        background: 'none',
        border: { size: '0px' },
        tabIndex: focusedIndex === index ? 0 : -1,
        onClick: (event) => {
          if (event.type === 'keydown') event.preventDefault();
          handleClick();
        },
        // indicator provides focus-visible treatment; avoid a second ring
        focusIndicator: false,
        onFocus: () => {
          if (onFocusStep) onFocusStep(index);
        },
      };

  return (
    <StepItemContext.Provider value={stepItemValue}>
      <StyledStepItem
        direction={direction}
        isSubStep={isSubStep}
        isLast={isLast}
        hasSubSteps={!!subSteps?.length}
        stepTheme={stepTheme}
        {...passThemeFlag}
      >
        <StyledStepButton
          role={isReadOnly ? 'group' : undefined}
          ref={(el) => {
            if (stepRefs) {
              if (el) stepRefs.current.set(index, el);
              else stepRefs.current.delete(index);
            }
          }}
          aria-current={isHighlighted ? 'step' : undefined}
          aria-disabled={
            isDisabled || (clickableSteps && !isNavigable) || undefined
          }
          aria-label={accessibleLabel}
          aria-describedby={
            describedBy.length > 0 ? describedBy.join(' ') : undefined
          }
          {...focusableProps}
          {...stepTheme.button}
        >
          <StepperIndicator />
          <StyledStepContent
            align={direction === 'vertical' ? 'start' : 'center'}
            isVertical={direction === 'vertical'}
            isSubStep={isSubStep}
            hasDescription={!!step.description}
            stepTheme={stepTheme}
          >
            <StepperLabel />
            {showDescription && <StepperDescription />}
            <StepperError />
            <StepperDisabledReason />
          </StyledStepContent>
        </StyledStepButton>
        {(showConnector !== undefined ? showConnector : !isLast) && (
          // positioned relative to this li so it stays anchored to the
          // indicator regardless of how tall the label/content grows
          <StyledConnector
            direction={direction}
            status={step.status}
            aria-hidden="true"
            stepTheme={stepTheme}
            {...passThemeFlag}
          />
        )}
        {!!subSteps?.length && (
          <StepConnector>
            <StyledSubStepsList
              forwardedAs="ol"
              isVertical={direction === 'vertical'}
              cssGap
              stepTheme={stepTheme}
              {...stepTheme?.children}
            >
              {subSteps}
            </StyledSubStepsList>
          </StepConnector>
        )}
      </StyledStepItem>
    </StepItemContext.Provider>
  );
};
