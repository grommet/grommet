import React, { useState } from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { normalizeColor } from '../../utils/colors';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardStepHeader: step counter + title + optional description
const WizardStepHeader = () => {
  const [headingFocused, setHeadingFocused] = useState(false);
  const { theme } = useThemeValue();
  const stepHeaderTheme = theme.wizard?.stepHeader || {};
  const focusColorToken = theme.wizard?.focus?.outline?.color;
  const focusColor =
    focusColorToken && normalizeColor(focusColorToken, theme)
      ? normalizeColor(focusColorToken, theme)
      : undefined;

  const { currentStepIndex, linearSteps = [], steps = [] } = useWizard();
  const currentStep = linearSteps[currentStepIndex];

  if (!currentStep) return null;

  const parentSteps = steps;
  const parentCount = parentSteps.length;

  let displayStepNumber = currentStepIndex + 1;
  if (currentStep && Array.isArray(parentSteps) && parentSteps.length) {
    const directParentIndex = parentSteps.findIndex(
      (step) => step.id === currentStep.id,
    );
    if (directParentIndex >= 0) {
      displayStepNumber = directParentIndex + 1;
    } else {
      const parentIndex = parentSteps.findIndex((step) =>
        Array.isArray(step.children)
          ? step.children.some((child) => child.id === currentStep.id)
          : false,
      );
      if (parentIndex >= 0) {
        displayStepNumber = parentIndex + 1;
      }
    }
  }

  return (
    <Box margin={stepHeaderTheme.margin} pad={{ bottom: 'small' }}>
      <Text
        size={stepHeaderTheme.counter?.size || 'small'}
        color={stepHeaderTheme.counter?.color || 'text-weak'}
        margin={{ bottom: 'xsmall' }}
      >
        {`Step ${displayStepNumber} of ${parentCount}`}
      </Text>
      <Text
        as="h2"
        id={`wizard-step-heading-${currentStep.id}`}
        tabIndex={-1}
        margin="none"
        weight={stepHeaderTheme.title?.weight || 'bold'}
        size={stepHeaderTheme.title?.size || 'medium'}
        onFocus={() => setHeadingFocused(true)}
        onBlur={() => setHeadingFocused(false)}
        style={
          focusColor && headingFocused
            ? {
                outlineColor: focusColor,
                outlineStyle: 'solid',
                outlineWidth: '2px',
              }
            : undefined
        }
      >
        {currentStep.title}
      </Text>
      {currentStep.description && (
        <Box
          margin={{ top: 'xsmall' }}
          color={stepHeaderTheme.description?.color}
        >
          {currentStep.description}
        </Box>
      )}
    </Box>
  );
};

WizardStepHeader.displayName = 'WizardStepHeader';

export { WizardStepHeader };
