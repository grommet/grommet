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
  StyledStepMain,
  StyledStepButton,
  StyledStepContent,
  StyledStepSupportingContent,
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

  const describedBy = [];
  if (showDescription && step.description) {
    describedBy.push(`stepper-description-${step.id}`);
  }
  if (step.errorMessage && step.status === 'error') {
    describedBy.push(`stepper-error-${step.id}`);
  }
  if (step.disabledReason && step.status === 'disabled') {
    describedBy.push(`stepper-reason-${step.id}`);
  }

  const hasSupportingContent =
    (showDescription && !!step.description) ||
    (step.status === 'error' && !!step.errorMessage) ||
    (step.status === 'disabled' && !!step.disabledReason);

  const isVertical = direction === 'vertical';
  // In vertical direction the gap between indicator and label is
  // applied as column-gap on the step item grid (shared with the
  // supporting content), not as a Box gap on the button.
  const { gap, ...buttonThemeRest } = stepTheme.button || {};
  const buttonThemeProps = isVertical ? buttonThemeRest : stepTheme.button;

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
        <StyledStepMain
          isVertical={isVertical}
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
            aria-label={ariaLabel}
            aria-describedby={
              describedBy.length > 0 ? describedBy.join(' ') : undefined
            }
            isVertical={isVertical}
            {...focusableProps}
            {...buttonThemeProps}
          >
            <StepperIndicator />
            <StyledStepContent
              align={isVertical ? 'start' : 'center'}
              isVertical={isVertical}
              stepTheme={stepTheme}
            >
              <StepperLabel />
            </StyledStepContent>
          </StyledStepButton>
          {hasSupportingContent && (
            <StyledStepSupportingContent
              align={isVertical ? 'start' : 'center'}
              isVertical={isVertical}
              {...passThemeFlag}
            >
              {showDescription && <StepperDescription />}
              <StepperError />
              <StepperDisabledReason />
            </StyledStepSupportingContent>
          )}
        </StyledStepMain>
        {(showConnector !== undefined ? showConnector : !isLast) &&
          !subSteps?.length && (
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
