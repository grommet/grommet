import React from 'react';
import { Text } from '../Text';
import { useStepper, useStepItem } from './StepperContext';
import { getEffectiveState } from './StepperIndicator';
import { useThemeValue } from '../../utils/useThemeValue';

const getStateProps = (theme, effectiveState) =>
  theme.stepper?.[effectiveState]?.label || {};

export const StepperLabel = ({ ...rest }) => {
  const { currentStep, direction } = useStepper();
  const { theme } = useThemeValue();
  const { step, isSubStep } = useStepItem();
  if (!step) return null;

  const isCurrent = currentStep === step.id;
  const hasCurrentChild =
    !isSubStep && step.children?.some((c) => c.id === currentStep);
  const isHighlighted = isCurrent || hasCurrentChild;
  const effectiveState = getEffectiveState(step.status, isHighlighted);
  const stateProps = getStateProps(theme, effectiveState);
  const size = isSubStep
    ? theme.stepper?.label?.substep?.size || 'small'
    : theme.stepper?.label?.size || 'medium';
  return (
    <Text
      size={size}
      truncate={direction === 'horizontal'}
      {...stateProps}
      {...rest}
    >
      {step.title}
    </Text>
  );
};
