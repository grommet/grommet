import React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardContent renders the current step body and any wizard-level
// validation error message.
export const WizardContent = ({ ...rest }) => {
  const { theme } = useThemeValue();
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
    renderStep,
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
      margin={contentTheme?.margin}
      // Grow to fill the middle region without shrinking. The scroll
      // region lives on the middle (StyledWizardMiddle), not here.
      flex="grow"
      {...rest}
    >
      {body}
      {validationError && (
        <Text role="alert" aria-live="polite" {...helperTheme}>
          {validationError}
        </Text>
      )}
    </Box>
  );
};

WizardContent.displayName = 'WizardContent';
