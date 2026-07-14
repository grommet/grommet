import React from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardContent renders the current step's body via renderStep(). It also
// hosts the wizard-level validation error region so any error message
// shares its color with the error icon defined in the theme.
//
// Sub-component follows the composition-primitive pattern: theme values
// drive default Box props, but callers can override any Box prop by
// passing it directly (spread as {...rest} last).
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
      // Scrolling region for the step body. `flex` (1 1 auto) + `minHeight: 0`
      // lets this Box shrink below its content so `overflow: auto` engages;
      // `flex="grow"` (1 0 auto) would refuse to shrink.
      flex
      overflow="auto"
      style={{ minHeight: 0 }}
      {...passThemeFlag}
      {...rest}
    >
      {/* Non-shrinking wrapper: keeps the step body at its natural
          height so the parent's `overflow: auto` scrolls instead of
          the body collapsing on top of itself. */}
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
