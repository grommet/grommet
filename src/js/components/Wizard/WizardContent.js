import React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardContent renders the current step body and any wizard-level
// validation error message.
export const WizardContent = ({ renderStep, ...rest }) => {
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
      margin={contentTheme?.margin}
      width={contentTheme?.width}
      height={contentTheme?.height}
      align={contentTheme?.align}
      // Scrollable region for the step body. `tabIndex={0}` satisfies
      // the WCAG scrollable-region-focusable rule.
      flex
      overflow="auto"
      style={{ minHeight: 0 }}
      tabIndex={0}
      {...passThemeFlag}
      {...rest}
    >
      {/* Keep the step body at natural height so the parent scrolls. */}
      <Box flex={false}>{body}</Box>
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
