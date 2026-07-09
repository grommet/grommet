import React from 'react';
import { Text } from '../Text';
import { useThemeValue } from '../../utils/useThemeValue';

export const StepperHelperText = ({ stepId, variant, ...rest }) => {
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
