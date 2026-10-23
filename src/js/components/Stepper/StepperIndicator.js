// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { useThemeValue } from '../../utils/useThemeValue';
import { parseMetricToNum, deepMerge } from '../../utils';
import { Box } from '../Box';

import { useStepper, useStepItem } from './StepperContext';
// import { StyledIndicator } from './StyledStepper';

const getMetricSize = (theme, size, type = 'edgeSize') =>
  theme.global?.[type]?.[size] || theme.global?.size?.[size] || size;

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
  const { currentStep, clickableSteps, direction } = useStepper();
  const { theme, passThemeFlag } = useThemeValue();

  const { step, isSubStep } = useStepItem();
  if (!step) return null;

  const isCurrent = currentStep === step.id;
  const hasCurrentChild =
    !isSubStep && step.children?.some((c) => c.id === currentStep);
  const isHighlighted = isCurrent || hasCurrentChild;
  const effectiveState = getEffectiveState(step.status, isHighlighted);
  

  // let stateTheme = theme.stepper?.[effectiveState]?.indicator || {};
  // if (isSubStep && stateTheme.substep) {
  //   stateTheme = { ...stateTheme, ...stateTheme.substep };
  // }

  const stepperTheme = deepMerge(
    {},
    theme.stepper,
    direction === 'vertical' ? theme.stepper?.vertical : {},
    isSubStep ? theme.stepper?.substep : {},
    theme.stepper?.[effectiveState],
  );

  const isDisabled = step.status === 'disabled';
  const isClickable = clickableSteps && !isDisabled;

  const indicatorTheme = stepperTheme?.indicator || {};
  const { icon, iconSize, size, ...boxProps } = indicatorTheme;
  const boxSize =
    `${parseMetricToNum(getMetricSize(theme, size || '24px')) +
    2 * parseMetricToNum(
      getMetricSize(theme, boxProps?.border?.size || '2px', 'borderSize'),
    )}px`;

  // const iconSize = stateTheme?.iconSize || (isSubStep ? 'xsmall' : 'small');

  // return (
  //   <StyledIndicator
  //     effectiveState={effectiveState}
  //     isSubStep={isSubStep}
  //     isClickable={isClickable}
  //     {...passThemeFlag}
  //     {...rest}
  //   >
  //     {renderIcon(stateTheme?.icon, { size: iconSize })}
  //   </StyledIndicator>
  // );
  return (
    <Box width={{ min: boxSize }} height={{ min: boxSize }} {...boxProps}>
      {renderIcon(icon, { size: iconSize })}
    </Box>
  );
};

export { getEffectiveState };
