// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box } from '../Box';
import { Notification } from '../Notification';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardContent renders the current step body and any wizard-level
// validation error message.
export const WizardContent = ({ ...rest }) => {
  const { theme } = useThemeValue();
  const wizard = useWizard();
  const { currentStepObj, renderStep, validationError } = wizard;

  const contentTheme = theme.wizard?.content;
  const errorTheme = theme.wizard?.error;
  const Icon = errorTheme?.icon || (() => null);

  if (!currentStepObj) return null;

  const stepRender = currentStepObj.render || renderStep;
  const body = stepRender ? stepRender(currentStepObj, wizard) : null;

  return (
    <Box {...contentTheme} flex="grow" {...rest}>
      {body}
      {validationError && (
        <Notification
          status="critical"
          message={validationError}
          icon={<Icon />}
        />
      )}
    </Box>
  );
};

WizardContent.displayName = 'WizardContent';
