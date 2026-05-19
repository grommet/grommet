import React from 'react';

import { Box } from '../Box';
import { Text } from '../Text';
import { normalizeColor } from '../../utils';
import { useThemeValue } from '../../utils/useThemeValue';
import { useStepper, useStepItem, getEffectiveState } from './StepperContext';

// Dynamically import icons to avoid hard bundling when unused
let CheckmarkIcon;
let WarningIcon;
try {
  // eslint-disable-next-line global-require
  CheckmarkIcon = require('grommet-icons/icons/Checkmark').Checkmark;
  // eslint-disable-next-line global-require
  WarningIcon = require('grommet-icons/icons/StatusWarning').StatusWarning;
} catch (e) {
  // Icons unavailable; fall back to text indicators
  console.warn(
    `StepperIndicator: Grommet icons not found, 
    falling back to text indicators`,
    e,
  );
}

const INDICATOR_COLORS = {
  pending: {
    background: 'background-front',
    text: 'text',
    border: 'border',
  },
  current: {
    background: 'brand',
    text: 'white',
    border: 'brand',
  },
  'current-completed': {
    background: 'brand',
    text: 'white',
    border: 'brand',
  },
  completed: {
    background: 'status-ok',
    text: 'white',
    border: 'status-ok',
  },
  error: {
    background: 'status-error',
    text: 'white',
    border: 'status-error',
  },
  'current-error': {
    background: 'status-error',
    text: 'white',
    border: 'status-error',
  },
  disabled: {
    background: 'background-contrast',
    text: 'text-weak',
    border: 'border',
  },
};

const StepperIndicator = () => {
  const { currentStep } = useStepper();
  const { step, index } = useStepItem();
  const { theme } = useThemeValue();

  if (!step) return null;

  const isCurrent = step.id === currentStep;
  const effectiveState = getEffectiveState(step, isCurrent);

  // Resolve colors — theme overrides fall back to built-in defaults
  const stepperTheme = theme.stepper || {};
  const themeColors = stepperTheme.step?.colors || {};
  let baseState = effectiveState;
  if (effectiveState === 'current-completed') {
    baseState = 'current';
  } else if (effectiveState === 'current-error') {
    baseState = 'error';
  }
  const colors = {
    ...INDICATOR_COLORS[effectiveState],
    ...(themeColors[baseState] || {}),
  };

  const indicatorSize = stepperTheme.step?.indicator?.size || '32px';
  const iconSize = stepperTheme.step?.indicator?.icon?.size || 'small';

  const bgColor = normalizeColor(colors.background, theme);
  const borderColor = normalizeColor(colors.border, theme);
  const textColor = normalizeColor(colors.text, theme);

  // Choose indicator content
  let content;
  if (
    (effectiveState === 'completed' ||
      effectiveState === 'current-completed') &&
    CheckmarkIcon
  ) {
    content = <CheckmarkIcon color={textColor} size={iconSize} />;
  } else if (
    (effectiveState === 'error' || effectiveState === 'current-error') &&
    WarningIcon
  ) {
    content = <WarningIcon color={textColor} size={iconSize} />;
  } else {
    content = (
      <Text size="small" color={textColor} weight="bold">
        {index + 1}
      </Text>
    );
  }

  return (
    <Box
      width={indicatorSize}
      height={indicatorSize}
      round="full"
      align="center"
      justify="center"
      background={bgColor}
      style={{
        border: `2px solid ${borderColor}`,
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {content}
    </Box>
  );
};

StepperIndicator.displayName = 'StepperIndicator';

export { StepperIndicator };
