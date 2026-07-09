import React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardContent renders the current step's body via renderStep(). It also
// hosts the wizard-level validation error region so any error message
// shares its color with the error icon defined in the theme.
export const WizardContent = ({ renderStep }) => {
  const { theme, passThemeFlag } = useThemeValue();
  const {
    currentStepObj,
    formValue,
    setFormValue,
    next,
    previous,
    goTo,
    skip,
    complete,
    cancel,
    validationError,
  } = useWizard();

  const contentTheme = theme.wizard?.content;
  const helperTheme = theme.wizard?.error?.helperText;

  if (!currentStepObj) return null;

  // API exposed to renderStep callbacks.
  const wizardApi = {
    formValue,
    setFormValue,
    next,
    previous,
    goTo,
    skip,
    complete,
    cancel,
  };

  const stepRender = renderStep || currentStepObj.render;
  const body = stepRender ? stepRender(currentStepObj, wizardApi) : null;

  return (
    <Box
      pad={contentTheme?.pad}
      background={contentTheme?.background}
      round={contentTheme?.round}
      elevation={contentTheme?.elevation}
      flex="grow"
      {...passThemeFlag}
    >
      {body}
      {validationError && (
        <Text
          role="alert"
          aria-live="polite"
          size={helperTheme?.size}
          color={helperTheme?.color}
          margin={helperTheme?.margin}
        >
          {validationError}
        </Text>
      )}
    </Box>
  );
};

WizardContent.displayName = 'WizardContent';
