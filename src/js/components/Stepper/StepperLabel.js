import React from 'react';
import { Text } from '../Text';
import { useStepper } from './StepperContext';
import { getEffectiveState } from './StepperIndicator';
import { useThemeValue } from '../../utils/useThemeValue';

const getStateProps = (theme, effectiveState) =>
  theme.stepper?.[effectiveState]?.label || {};

export const StepperLabel = ({ stepId, isSubStep, ...rest }) => {
  const { currentStep, direction, steps } = useStepper();
  const { theme } = useThemeValue();
  const step = steps.find((s) => s.id === stepId);
  if (!step) return null;

  const isCurrent = currentStep === step.id;
  const hasCurrentChild =
    !isSubStep &&
    step.children &&
    step.children.length > 0 &&
    step.children.some((c) => c.id === currentStep);
  const isHighlighted = isCurrent || hasCurrentChild;
  const effectiveState = getEffectiveState(step.status, isHighlighted);
  const stateProps = getStateProps(theme, effectiveState);

  return (
    <Text
      size={isSubStep ? 'xsmall' : 'small'}
      truncate={direction === 'horizontal'}
      {...stateProps}
      {...rest}
    >
      {step.title}
    </Text>
  );
};
