import React from 'react';
import { Box } from '../Box';
import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';
import { Text } from '../Text';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// WizardStepHeader renders the "Step X of Y" counter, title, and description.
export const WizardStepHeader = ({ ...rest }) => {
  const { theme, passThemeFlag } = useThemeValue();
  const { format } = React.useContext(MessageContext);
  const { currentStepObj, currentStepIndex, totalSteps, messages } =
    useWizard();

  if (!currentStepObj) return null;

  const stepHeaderTheme = theme.wizard?.stepHeader;
  const counterTheme = theme.wizard?.stepHeader?.counter;

  const counterTemplate =
    messages?.stepHeader?.counter ||
    format({
      id: 'wizard.stepHeader.counter',
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
      <Text size={counterTheme?.size} color={counterTheme?.color}>
        {counterTemplate}
      </Text>
      <Heading
        level={2}
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
        >
          {currentStepObj.description}
        </Paragraph>
      )}
    </Box>
  );
};

WizardStepHeader.displayName = 'WizardStepHeader';
