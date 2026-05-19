import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardFooter: Previous / Next / Skip / Complete / Cancel navigation bar
const WizardFooter = ({ onCancel }) => {
  const { theme } = useThemeValue();
  const wizardTheme = theme.wizard || {};
  const footerTheme = wizardTheme.footer || {};
  const actionsTheme = wizardTheme.actions || {};

  const { currentStepIndex, steps, isValidating, navigation } = useWizard();

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const currentStepDef = steps[currentStepIndex];
  const isSkippable = currentStepDef?.skippable;

  return (
    <Box
      direction="row"
      justify="between"
      pad={footerTheme.pad || { top: 'medium' }}
      gap={footerTheme.gap || 'small'}
      background={footerTheme.background}
    >
      <Box direction="row" gap="small">
        <Button
          label="Previous"
          onClick={navigation.previous}
          disabled={isFirstStep}
          color={actionsTheme.previous?.color}
          secondary
        />
        {isSkippable && (
          <Button
            label="Skip"
            onClick={navigation.skip}
            color={actionsTheme.skip?.color}
            plain
          />
        )}
      </Box>
      <Box direction="row" gap="small">
        {onCancel && (
          <Button
            label="Cancel"
            onClick={navigation.cancel}
            color={actionsTheme.cancel?.color}
            plain
          />
        )}
        {isLastStep ? (
          <Button
            label="Complete"
            onClick={navigation.complete}
            disabled={isValidating}
            color={actionsTheme.next?.color}
            primary
          />
        ) : (
          <Button
            label="Next"
            onClick={navigation.next}
            disabled={isValidating}
            color={actionsTheme.next?.color}
            primary
          />
        )}
      </Box>
    </Box>
  );
};

WizardFooter.displayName = 'WizardFooter';

export { WizardFooter };
