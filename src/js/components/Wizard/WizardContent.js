// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box } from '../Box';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardContent renders the current step body and any wizard-level
// validation error message.
export const WizardContent = ({ ...rest }) => {
  const { theme } = useThemeValue();
  const wizard = useWizard();
  const { currentStepObj, renderStep } = wizard;

  const contentTheme = theme.wizard?.content;

  if (!currentStepObj) return null;

  const stepRender = currentStepObj.render || renderStep;
  const body = stepRender ? stepRender(currentStepObj, wizard) : null;

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
    </Box>
  );
};

WizardContent.displayName = 'WizardContent';
