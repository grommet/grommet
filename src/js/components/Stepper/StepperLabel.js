import React from 'react';

import { Text } from '../Text';
import { useThemeValue } from '../../utils/useThemeValue';
import { useStepper, useStepItem, getEffectiveState } from './StepperContext';

const LABEL_COLORS = {
  pending: 'text',
  current: 'brand',
  'current-completed': 'brand',
  completed: 'text-weak',
  error: 'status-error',
  'current-error': 'status-error',
  disabled: 'text-weak',
};

const isBoldState = (effectiveState) =>
  effectiveState === 'current' ||
  effectiveState === 'current-completed' ||
  effectiveState === 'current-error';

const StepperLabel = () => {
  const { currentStep, direction } = useStepper();
  const { step, isLabelRevealed } = useStepItem();
  const { theme } = useThemeValue();

  if (!step) return null;

  const isCurrent = step.id === currentStep;
  const effectiveState = getEffectiveState(step, isCurrent);

  const stepperTheme = theme.stepper || {};
  const themeColors = stepperTheme.label?.color || {};
  const baseColorToken =
    themeColors[effectiveState] ||
    themeColors[
      effectiveState === 'current-completed' ||
      effectiveState === 'current-error'
        ? 'current'
        : effectiveState
    ] ||
    LABEL_COLORS[effectiveState] ||
    'text';

  const weight = isBoldState(effectiveState)
    ? stepperTheme.label?.weight?.current || 'bold'
    : stepperTheme.label?.weight?.default || 'normal';

  const shouldTruncate =
    direction === 'horizontal' &&
    !isLabelRevealed &&
    theme.stepper?.horizontal?.label?.truncate !== false;

  return (
    <Text
      size="small"
      weight={weight}
      color={baseColorToken}
      textAlign="center"
      truncate={shouldTruncate}
    >
      {step.title}
    </Text>
  );
};

StepperLabel.displayName = 'StepperLabel';

export { StepperLabel };
