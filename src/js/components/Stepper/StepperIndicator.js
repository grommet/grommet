// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { useThemeValue } from '../../utils/useThemeValue';
import { deepMerge } from '../../utils';

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
  const { currentStep, direction } = useStepper();
  const { theme, passThemeFlag } = useThemeValue();

  const { step, isSubStep } = useStepItem();
  if (!step) return null;

  const isCurrent = currentStep === step.id;
  const hasCurrentChild =
    !isSubStep && step.children?.some((c) => c.id === currentStep);
  const isHighlighted = isCurrent || hasCurrentChild;
  const effectiveState = getEffectiveState(step.status, isHighlighted);
  
  const stepperTheme = deepMerge(
    {},
    theme.stepper,
    direction === 'vertical' ? theme.stepper?.vertical : {},
    isSubStep ? theme.stepper?.substep : {},
    theme.stepper?.[effectiveState],
  );

  // grab the icon pieces and size. Size will be handled
  // in the StyledIndicator component but we pull it out
  // here to leave other props as boxProps
  const indicatorTheme = stepperTheme?.indicator || {};
  const { color, icon, iconSize, size, ...boxProps } = indicatorTheme;

  return (
    <StyledIndicator
      stepperTheme={stepperTheme}
      {...boxProps}
      {...passThemeFlag}
      {...rest}
    >
      {renderIcon(icon, { size: iconSize })}
    </StyledIndicator>
  );
};

export { getEffectiveState };
