import React from 'react';
import { Text } from '../Text';
import { useStepItem } from './StepperContext';
import { useThemeValue } from '../../utils/useThemeValue';

const StepperHelperText = ({ variant, ...rest }) => {
  const { theme } = useThemeValue();

  const helperTextTheme = theme.stepper?.helperText || {};

  const size = helperTextTheme?.font?.size || 'xsmall';
  const color = variant
    ? theme.stepper?.[variant]?.helperText?.color
    : helperTextTheme?.color;
  const margin = helperTextTheme?.margin || { top: 'xsmall' };

  return (
    <Text size={size} color={color || 'text-weak'} margin={margin} {...rest} />
  );
};

export const StepperError = ({ ...rest }) => {
  const { step } = useStepItem();
  if (!step || step.status !== 'error' || !step.errorMessage) return null;
  return (
    <StepperHelperText
      id={`stepper-error-${step.id}`}
      role="alert"
      variant="error"
      {...rest}
    >
      {step.errorMessage}
    </StepperHelperText>
  );
};

export const StepperDisabledReason = ({ ...rest }) => {
  const { step } = useStepItem();
  if (!step || step.status !== 'disabled' || !step.disabledReason) return null;
  return (
    <StepperHelperText
      id={`stepper-reason-${step.id}`}
      variant="disabled"
      {...rest}
    >
      {step.disabledReason}
    </StepperHelperText>
  );
};
