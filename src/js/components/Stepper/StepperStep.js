// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, {
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useId } from '../../utils/useId';
import {
  useStepper,
  StepItemContext,
  StepperHelperContext,
  StepperRenderContext,
} from './StepperContext';
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
import { StepperStepPropTypes } from './propTypes';

const EMPTY_STEP = { id: '', title: '', status: 'disabled' };

export const StepperStep = forwardRef(({ stepId, children }, forwardedRef) => {
  const {
    currentStep,
    clickableSteps,
    direction: contextDirection,
    showDescription,
    onStepClick,
    steps,
  } = useStepper();
  const renderContext = useContext(StepperRenderContext);
  const { format } = useContext(MessageContext);
  const { passThemeFlag } = useThemeValue();
  const resolvedStep = steps.find((item) => item.id === stepId);
  const hasStep = !!resolvedStep;
  const step = useMemo(
    () => resolvedStep || { ...EMPTY_STEP, id: stepId || '' },
    [resolvedStep, stepId],
  );
  const visibleIndex = renderContext.flatSteps.findIndex(
    (item) => item.id === step.id,
  );
  const isHiddenStep = visibleIndex < 0;
  const index = visibleIndex;
  const direction = contextDirection;
  const isSubStep = !!step.isSubStep;
  const subSteps = renderContext.defaultLayout
    ? renderContext.defaultSubSteps[step.id]
    : undefined;
  const topLevelSteps = steps.filter((item) => !item.isSubStep);
  const isLast = renderContext.defaultLayout
    ? !isSubStep && topLevelSteps[topLevelSteps.length - 1]?.id === step.id
    : index === renderContext.flatSteps.length - 1;
  const showConnector = renderContext.defaultLayout
    ? !isSubStep && (!isLast || !!subSteps?.length)
    : !isLast;
  const { focusedIndex } = renderContext;
  const baseId = useId();
  const descriptionId = `${baseId}-stepper-description-${step.id}`;
  const errorId = `${baseId}-stepper-error-${step.id}`;
  const reasonId = `${baseId}-stepper-reason-${step.id}`;
  const [helpers, setHelpers] = useState(() => new Map());
  const registerHelper = useCallback((token, variant, id) => {
    setHelpers((previous) => {
      const current = previous.get(token);
      if (
        (!id && !current) ||
        (current?.variant === variant && current.id === id)
      )
        return previous;
      const next = new Map(previous);
      if (id) next.set(token, { variant, id });
      else next.delete(token);
      return next;
    });
  }, []);
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
      descriptionId,
      errorId,
      reasonId,
    }),
    [
      step,
      index,
      isLast,
      isSubStep,
      isDisabled,
      descriptionId,
      errorId,
      reasonId,
    ],
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
  if (!hasStep || isHiddenStep) return null;
  let statusId;
  if (step.status === 'completed') statusId = 'stepper.completed';
  if (step.status === 'error') statusId = 'stepper.error';
  const accessibleLabel = statusId
    ? format({ id: statusId, values: { step: ariaLabel } })
    : ariaLabel;

  const hasCustomChildren = children != null;
  const helperConditions = {
    description: showDescription && !!step.description,
    error: step.status === 'error' && !!step.errorMessage,
    reason: step.status === 'disabled' && !!step.disabledReason,
  };
  const describedBy = hasCustomChildren
    ? ['description', 'error', 'reason'].flatMap((variant) =>
        helperConditions[variant]
          ? Array.from(helpers.values())
              .filter((helper) => helper.variant === variant)
              .map((helper) => helper.id)
          : [],
      )
    : [
        helperConditions.description && descriptionId,
        helperConditions.error && errorId,
        helperConditions.reason && reasonId,
      ].filter(Boolean);
  const hasSupportingContent =
    helperConditions.description ||
    helperConditions.error ||
    helperConditions.reason;

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
        onFocus: () => renderContext.updateFocusedIndex(index),
      };

  const setStepRef = (element) => {
    renderContext.registerStepRef(index, element);
    if (typeof forwardedRef === 'function') forwardedRef(element);
    else if (forwardedRef) {
      Object.assign(forwardedRef, { current: element });
    }
  };

  return (
    <StepItemContext.Provider value={stepItemValue}>
      <StyledStepItem
        direction={direction}
        isSubStep={isSubStep}
        stepTheme={stepTheme}
        {...passThemeFlag}
      >
        <StyledStepButton
          role={isReadOnly ? 'group' : undefined}
          ref={setStepRef}
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
          {!hasCustomChildren && <StepperIndicator />}
          {hasCustomChildren ? (
            <StepperHelperContext.Provider value={registerHelper}>
              {children}
            </StepperHelperContext.Provider>
          ) : (
            <StyledStepContent
              align={isVertical ? 'start' : 'center'}
              isVertical={isVertical}
              stepTheme={stepTheme}
            >
              <StepperLabel />
            </StyledStepContent>
          )}
        </StyledStepButton>
        {!hasCustomChildren && hasSupportingContent && (
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
        {!!subSteps?.length && (
          <StyledSubStepsList
            forwardedAs="ol"
            isVertical={isVertical}
            cssGap
            stepTheme={stepTheme}
            {...stepTheme?.children}
          >
            {subSteps}
          </StyledSubStepsList>
        )}
        {showConnector && (
          <StyledConnector
            direction={direction}
            status={step.status}
            aria-hidden="true"
            stepTheme={stepTheme}
            spansStepGap={!isSubStep && !isLast}
            {...passThemeFlag}
          />
        )}
      </StyledStepItem>
    </StepItemContext.Provider>
  );
});

StepperStep.displayName = 'StepperStep';
StepperStep.propTypes = StepperStepPropTypes;
