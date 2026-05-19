import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Box } from '../Box';
import { StepperIndicator } from './StepperIndicator';
import { StepperLabel } from './StepperLabel';
import { StepperDescription } from './StepperDescription';
import { StepperError } from './StepperError';
import {
  StepItemContext,
  useStepper,
  getConnectorColorToken,
} from './StepperContext';
import { normalizeColor } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';

const StepperStep = forwardRef(
  ({ stepId, index: indexProp, children, ...rest }, ref) => {
    const {
      steps,
      direction,
      clickableSteps,
      onStepClick,
      focusIndex,
      setFocusIndex,
      stepRefs,
      isCurrentStep,
    } = useStepper();
    const { theme } = useThemeValue();

    const index =
      indexProp !== undefined
        ? indexProp
        : steps.findIndex((s) => s.id === stepId);
    const step = steps[index];
    const isLast = index === steps.length - 1;
    const isCurrent = isCurrentStep(stepId);
    const isInteractive = clickableSteps && step?.status !== 'disabled';

    const stepItemValue = useMemo(
      () => ({
        step,
        index,
        isLast,
        isLabelRevealed: direction === 'vertical' || focusIndex === index,
      }),
      [direction, focusIndex, index, isLast, step],
    );

    if (!step) return null;

    // Each connector half reflects the status of the preceding step.
    const prevStep = index > 0 ? steps[index - 1] : null;
    const prevConnectorToken = prevStep
      ? getConnectorColorToken(prevStep.status)
      : null;
    const nextConnectorToken = !isLast
      ? getConnectorColorToken(step.status)
      : null;

    const connectorColor = (token) =>
      token ? normalizeColor(token, theme) : 'transparent';

    const connectorSize =
      theme.stepper?.connector?.size ||
      theme.stepper?.connector?.stroke?.width ||
      '2px';

    // Associate error/disabled helper text with step button.
    const describedByIds = [];
    if (step.status === 'error' && step.errorMessage) {
      describedByIds.push(`stepper-error-${stepId}`);
    }
    if (step.status === 'disabled' && step.disabledReason) {
      describedByIds.push(`stepper-reason-${stepId}`);
    }
    const ariaDescribedBy =
      describedByIds.length > 0 ? describedByIds.join(' ') : undefined;

    const handleClick = () => {
      if (isInteractive) {
        onStepClick?.(stepId);
      }
    };

    const handleFocus = () => {
      setFocusIndex(index);
    };

    // The indicator button element — native button for full tabIndex control
    const indicatorButton = (
      <button
        ref={stepRefs[index]}
        type="button"
        tabIndex={focusIndex === index ? 0 : -1}
        aria-label={`Step ${index + 1} of ${steps.length}: ${step.title}`}
        aria-current={isCurrent ? 'step' : undefined}
        aria-disabled={step.status === 'disabled' ? 'true' : undefined}
        aria-describedby={ariaDescribedBy}
        onClick={handleClick}
        onFocus={handleFocus}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          cursor: isInteractive ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '44px',
          minHeight: '44px',
          borderRadius: '50%',
        }}
      >
        <StepperIndicator />
      </button>
    );

    // Default horizontal layout
    const horizontalLayout = (
      <Box direction="column" align="center" flex>
        {/* Connector row: left-half + indicator + right-half */}
        <Box direction="row" align="center" fill="horizontal">
          {/* Left connector half (colored by preceding step's status) */}
          <Box
            flex
            height={connectorSize}
            background={connectorColor(prevConnectorToken)}
            aria-hidden="true"
          />
          {indicatorButton}
          {/* Right connector half (colored by this step's status) */}
          <Box
            flex
            height={connectorSize}
            background={connectorColor(nextConnectorToken)}
            aria-hidden="true"
          />
        </Box>
        {/* Label block */}
        <Box align="center" pad={{ top: 'xsmall' }}>
          <StepperLabel />
          <StepperDescription />
          <StepperError />
          {step.status === 'disabled' && step.disabledReason && (
            <Box
              id={`stepper-reason-${stepId}`}
              as="span"
              style={{ display: 'block', fontSize: 'smaller', opacity: 0.6 }}
            >
              {step.disabledReason}
            </Box>
          )}
        </Box>
      </Box>
    );

    // Default vertical layout
    const verticalLayout = (
      <Box direction="row" gap="small">
        {/* Left column: connector-top + indicator + connector-bottom */}
        <Box align="center">
          {/* Top connector half */}
          <Box
            width={connectorSize}
            flex
            background={connectorColor(prevConnectorToken)}
            style={{ minHeight: index > 0 ? '16px' : '0' }}
            aria-hidden="true"
          />
          {indicatorButton}
          {/* Bottom connector half */}
          <Box
            width={connectorSize}
            flex
            background={connectorColor(nextConnectorToken)}
            style={{ minHeight: !isLast ? '16px' : '0' }}
            aria-hidden="true"
          />
        </Box>
        {/* Right column: label + description + error/reason */}
        <Box justify="center" pad={{ vertical: 'small' }}>
          <StepperLabel />
          <StepperDescription />
          <StepperError />
          {step.status === 'disabled' && step.disabledReason && (
            <Box
              as="span"
              id={`stepper-reason-${stepId}`}
              style={{
                display: 'block',
                fontSize: 'smaller',
                color: 'inherit',
                opacity: 0.6,
              }}
            >
              {step.disabledReason}
            </Box>
          )}
        </Box>
      </Box>
    );

    return (
      <StepItemContext.Provider value={stepItemValue}>
        <Box
          ref={ref}
          as="li"
          aria-current={isCurrent ? 'step' : undefined}
          flex={direction === 'horizontal' ? true : undefined}
          style={{ listStyle: 'none' }}
          {...rest}
        >
          {children ||
            (direction === 'horizontal' ? horizontalLayout : verticalLayout)}
        </Box>
      </StepItemContext.Provider>
    );
  },
);

StepperStep.displayName = 'StepperStep';
StepperStep.propTypes = {
  stepId: PropTypes.string.isRequired,
  index: PropTypes.number,
  children: PropTypes.node,
};

StepperStep.defaultProps = {
  index: undefined,
  children: undefined,
};

export { StepperStep };
