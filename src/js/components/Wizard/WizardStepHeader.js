import React from 'react';
import { Box } from '../Box';
import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';
import { Text } from '../Text';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardStepHeader renders the "Step X of Y" counter, the step title, and
// the step description. All typography goes through Text / Heading /
// Paragraph with theme-driven props (no custom font-size CSS).
//
// Sub-component follows the composition-primitive pattern: theme values
// drive default props on the primitives, and callers can override any
// outer Box prop by passing it directly (spread as {...rest} last).
export const WizardStepHeader = ({ ...rest }) => {
  const { theme, passThemeFlag } = useThemeValue();
  const { format } = React.useContext(MessageContext);
  const { currentStepObj, currentStepIndex, totalSteps, messages } =
    useWizard();

  if (!currentStepObj) return null;

  const stepHeaderTheme = theme.wizard?.stepHeader;
  const counterTheme = theme.wizard?.stepCounter;

  const counterTemplate =
    messages?.stepCounter ||
    format({
      id: 'wizard.stepCounter',
      values: { step: currentStepIndex + 1, total: totalSteps },
    });

  return (
    <Box
      pad={stepHeaderTheme?.pad}
      gap={stepHeaderTheme?.gap}
      flex={false}
      {...passThemeFlag}
      {...rest}
    >
      <Text
        size={counterTheme?.size}
        color={counterTheme?.color}
        weight={counterTheme?.weight}
        margin={counterTheme?.margin}
      >
        {counterTemplate}
      </Text>
      <Heading
        level={stepHeaderTheme?.title?.level}
        size={stepHeaderTheme?.title?.size}
        color={stepHeaderTheme?.title?.color}
        weight={stepHeaderTheme?.title?.weight}
        margin={stepHeaderTheme?.title?.margin || 'none'}
      >
        {currentStepObj.title}
      </Heading>
      {currentStepObj.description && (
        <Paragraph
          size={stepHeaderTheme?.description?.size}
          color={stepHeaderTheme?.description?.color}
          weight={stepHeaderTheme?.description?.weight}
          margin={stepHeaderTheme?.description?.margin}
          fill
        >
          {currentStepObj.description}
        </Paragraph>
      )}
    </Box>
  );
};

WizardStepHeader.displayName = 'WizardStepHeader';
