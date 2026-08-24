// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box } from '../Box';
import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';
import { Text } from '../Text';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';
import { StyledWizardFocusAnchor } from './StyledWizard';

// Renders the "Step X of Y" counter, title, and description. Wrapped in an
// `aria-live="polite"` focus anchor (located via `data-g-wizard-focus-anchor`)
// so Wizard can move focus here on step transitions for screen readers.
export const WizardStepHeader = ({ ...rest }) => {
  const { theme } = useThemeValue();
  const { format } = React.useContext(MessageContext);
  const { currentStepObj, currentStepIndex, totalSteps, messages } =
    useWizard();

  if (!currentStepObj) return null;

  const stepHeaderTheme = theme.wizard?.stepHeader;
  const counterTheme = theme.wizard?.stepHeader?.counter;

  const counterTemplate = format({
    id: 'wizard.stepHeader.counter',
    values: { step: currentStepIndex + 1, total: totalSteps },
    messages,
  });

  return (
    <StyledWizardFocusAnchor
      data-g-wizard-focus-anchor
      tabIndex={-1}
      aria-live="polite"
    >
      <Box
        pad={stepHeaderTheme?.pad}
        gap={stepHeaderTheme?.gap}
        flex={false}
        {...rest}
      >
        <Text {...counterTheme}>{counterTemplate}</Text>
        <Heading level={2} {...stepHeaderTheme?.title}>
          {currentStepObj.title}
        </Heading>
        {currentStepObj.description && (
          <Paragraph {...stepHeaderTheme?.description}>
            {currentStepObj.description}
          </Paragraph>
        )}
      </Box>
    </StyledWizardFocusAnchor>
  );
};

WizardStepHeader.displayName = 'WizardStepHeader';
