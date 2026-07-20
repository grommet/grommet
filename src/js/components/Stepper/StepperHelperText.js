import React from 'react';
import { Text } from '../Text';
import { useStepItem } from './StepperContext';
import { useThemeValue } from '../../utils/useThemeValue';

const StepperHelperText = ({ variant, ...rest }) => {
  const { theme } = useThemeValue();

  const helperTextProps = theme.stepper?.helperText || {
    size: 'xsmall',
    color: 'text-weak',
    margin: { top: 'xsmall' },
  };
  const variantProps = variant
    ? theme.stepper?.[variant]?.helperText || {}
    : {};

  return <Text {...helperTextProps} {...variantProps} {...rest} />;
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
