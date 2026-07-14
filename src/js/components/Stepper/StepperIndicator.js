import React from 'react';

import { useThemeValue } from '../../utils/useThemeValue';

import { useStepper, useStepItem } from './StepperContext';
import { StyledIndicator } from './StyledStepper';

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
    if (status === 'completed') return 'currentCompleted';
    if (status === 'error') return 'currentError';
    return 'current';
  }
  if (status === 'completed') return 'completed';
  if (status === 'error') return 'error';
  return 'pending';
}

export const StepperIndicator = ({ ...rest }) => {
  const { currentStep, clickableSteps } = useStepper();
  const { theme, passThemeFlag } = useThemeValue();

  const { step, isSubStep } = useStepItem();
  if (!step) return null;

  const isCurrent = currentStep === step.id;
  const hasCurrentChild =
    !isSubStep && step.children?.some((c) => c.id === currentStep);
  const isHighlighted = isCurrent || hasCurrentChild;
  const effectiveState = getEffectiveState(step.status, isHighlighted);
  let stateTheme = theme.stepper?.[effectiveState]?.indicator || {};
  if (isSubStep && stateTheme.substep) {
    stateTheme = { ...stateTheme, ...stateTheme.substep };
  }

  const isDisabled = step.status === 'disabled';
  const isClickable = clickableSteps && !isDisabled;

  const iconSize = stateTheme?.iconSize || (isSubStep ? 'xsmall' : 'small');

  return (
    <StyledIndicator
      effectiveState={effectiveState}
      isSubStep={isSubStep}
      isClickable={isClickable}
      {...passThemeFlag}
      {...rest}
    >
      {renderIcon(stateTheme?.icon, { size: iconSize })}
    </StyledIndicator>
  );
};

export { getEffectiveState };
