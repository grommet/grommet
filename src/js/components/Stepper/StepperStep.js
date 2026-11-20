// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useMemo } from 'react';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useId } from '../../utils/useId';
import { useStepper, StepItemContext } from './StepperContext';
import { StepperIndicator } from './StepperIndicator';
import { StepperLabel } from './StepperLabel';
import { StepperDescription } from './StepperDescription';
import { StepperError, StepperDisabledReason } from './StepperHelperText';
import {
  StyledStepItem,
  StyledStepButton,
  StyledStepContent,
  StyledStepSupportingContent,
  StyledConnector,
  StyledSubStepsList,
} from './StyledStepper';
import { useStepTheme } from './utils';

export const StepperStep = ({
  stepId,
  focusedIndex,
  index: indexProp,
  onFocusStep,
  stepRefs,
  children,
  ...rest
}) => {
  const {
    currentStep,
    clickableSteps,
    direction,
    showDescription,
    onStepClick,
    steps,
  } = useStepper();
  const { format } = useContext(MessageContext);
  const { passThemeFlag } = useThemeValue();
  const step = steps.find((s) => s.id === stepId);

  const { isSubStep } = step;

  const isLastParent =
    steps.filter((s) => !s.parentId).slice(-1)[0]?.id === step.id;
  const baseId = useId();
  const descriptionId = `${baseId}-stepper-description-${step.id}`;
  const errorId = `${baseId}-stepper-error-${step.id}`;
  const reasonId = `${baseId}-stepper-reason-${step.id}`;
  
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
  const isVertical = direction === 'vertical';

  const showConnector =
    !isSubStep && (!isLastParent || (isVertical && children?.length));
 
  const stepTheme = useStepTheme(step, isSubStep);

  const stepItemValue = useMemo(
    () => ({
      step,
      isSubStep,
      isDisabled,
    }),
    [step, isSubStep, isDisabled],
  );

  const handleClick = () => {
    if (isClickable && navigationStepId && onStepClick) {
      onStepClick(navigationStepId);
    }
  };

  // Count every configured leaf, including unrevealed and disabled steps.
  const progressSteps = steps.filter((item) => item.childIds.length === 0);
  const progressIndex = progressSteps.findIndex((item) => item.id === step.id);
  let ariaLabel = step['aria-label'];
  if (!ariaLabel) {
    if (hasChildren) {
      ariaLabel = step.title;
    } else {
      const values = {
        step: progressIndex + 1,
        total: progressSteps.length,
        title: step.title,
      };
      if (isSubStep) {
        const currentStepData = steps.find((item) => item.id === step.id);
        const parentStep = steps.find(
          (item) => item.id === currentStepData.parentId,
        );
        values.parent = parentStep.title;
      }
      ariaLabel = format({
        id: isSubStep ? 'stepper.subStep' : 'stepper.step',
        values,
      });
    }
  }
  let statusId;
  if (step.status === 'completed') statusId = 'stepper.completed';
  if (step.status === 'error') statusId = 'stepper.error';
  const accessibleLabel = statusId
    ? format({ id: statusId, values: { step: ariaLabel } })
    : ariaLabel;

  const describedBy = [];
  if (showDescription && step.description) {
    describedBy.push(descriptionId);
  }
  if (step.errorMessage && step.status === 'error') {
    describedBy.push(errorId);
  }
  if (step.disabledReason && step.status === 'disabled') {
    describedBy.push(reasonId);
  }

  const hasSupportingContent =
    (showDescription && !!step.description) ||
    (step.status === 'error' && !!step.errorMessage) ||
    (step.status === 'disabled' && !!step.disabledReason);

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
        stepTheme={stepTheme}
        {...passThemeFlag}
        {...rest}
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
            {showDescription && <StepperDescription id={descriptionId} />}
            <StepperError id={errorId} />
            <StepperDisabledReason id={reasonId} />
          </StyledStepSupportingContent>
        )}
        {!!children?.length && (
          <StyledSubStepsList
            forwardedAs="ol"
            isVertical={isVertical}
            cssGap
            stepTheme={stepTheme}
            {...stepTheme?.children}
          >
            {children}
          </StyledSubStepsList>
        )}
        {(showConnector !== undefined ? showConnector : !isLastParent) && (
          <StyledConnector
            direction={direction}
            status={step.status}
            aria-hidden="true"
            stepTheme={stepTheme}
            spansStepGap={!isSubStep && !isLastParent}
            {...passThemeFlag}
          />
        )}
      </StyledStepItem>
    </StepItemContext.Provider>
  );
};
