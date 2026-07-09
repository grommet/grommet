import React, { useContext } from 'react';
import { FormCheckmark } from 'grommet-icons/icons/FormCheckmark';
import { StatusCriticalSmall } from 'grommet-icons/icons/StatusCriticalSmall';
import { StatusGoodSmall } from 'grommet-icons/icons/StatusGoodSmall';
import { Radial } from 'grommet-icons/icons/Radial';

import { useThemeValue } from '../../utils/useThemeValue';

import { StepperContext } from './StepperContext';
import { StyledIndicator } from './StyledStepper';

const getIconMetric = (theme, sizeToken, fallback) =>
  theme.global?.edgeSize?.[sizeToken] ||
  theme.global?.size?.[sizeToken] ||
  fallback;

const withMinPixelSize = (value, minPx) => {
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) return value;
  return `${Math.max(parsed, minPx)}px`;
};

const renderIcon = (Icon, props) => {
  if (!Icon) return null;
  const iconProps = {
    color: 'currentColor',
    ...props,
  };
  if (React.isValidElement(Icon)) {
    return React.cloneElement(Icon, {
      ...iconProps,
      'aria-hidden': true,
    });
  }
  return <Icon {...iconProps} aria-hidden />;
};

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

export const StepperIndicator = ({ stepId, isSubStep, isClickable }) => {
  const { currentStep, steps } = useContext(StepperContext);
  const { theme } = useThemeValue();

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
  const stepperIcons = theme.stepper?.icons || {};
  const completedIcon = stepperIcons.completed || FormCheckmark;
  const errorIcon = stepperIcons.error || StatusCriticalSmall;
  const currentErrorIcon = stepperIcons.currentError || errorIcon;
  const currentIcon = stepperIcons.current || StatusGoodSmall;
  const subStepCurrentIcon = stepperIcons.substepCurrent || StatusGoodSmall;
  const subStepCompletedIcon = stepperIcons.substepCompleted || completedIcon;
  const subStepErrorIcon = stepperIcons.substepError || StatusGoodSmall;
  const subStepPendingIcon = stepperIcons.substepPending || Radial;
  const subStepDisabledIcon = stepperIcons.substepDisabled || Radial;
  const subStepIconSize = withMinPixelSize(
    getIconMetric(theme, 'small', '10px'),
    10,
  );
  const subStepSmallIconSize = withMinPixelSize(
    getIconMetric(theme, 'xsmall', '8px'),
    8,
  );
  const parentIconSize = withMinPixelSize(
    getIconMetric(theme, 'small', '12px'),
    12,
  );

  const renderContent = () => {
    if (isSubStep) {
      switch (effectiveState) {
        case 'current':
          return renderIcon(subStepCurrentIcon, { size: subStepIconSize });
        case 'current-completed':
          return renderIcon(subStepCompletedIcon, { size: subStepIconSize });
        case 'completed':
          return renderIcon(subStepCompletedIcon, { size: subStepIconSize });
        case 'error':
          return renderIcon(subStepErrorIcon, { size: subStepIconSize });
        case 'current-error':
          return renderIcon(subStepErrorIcon, {
            size: subStepIconSize,
          });
        case 'disabled':
          return renderIcon(subStepDisabledIcon, {
            size: subStepSmallIconSize,
          });
        default:
          // pending - small hollow ring
          return renderIcon(subStepPendingIcon, { size: subStepSmallIconSize });
      }
    }
    // Parent step indicator
    switch (effectiveState) {
      case 'current-completed':
      case 'completed':
        return renderIcon(completedIcon, { size: 'medium' });
      case 'current':
        return renderIcon(currentIcon, { size: 'medium' });
      case 'error':
        return renderIcon(errorIcon, { size: parentIconSize });
      case 'current-error':
        return renderIcon(currentErrorIcon, {
          size: parentIconSize,
        });
      default:
        return null;
    }
  };

  return (
    <StyledIndicator
      effectiveState={effectiveState}
      isSubStep={isSubStep}
      isClickable={isClickable}
    >
      {renderContent()}
    </StyledIndicator>
  );
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
