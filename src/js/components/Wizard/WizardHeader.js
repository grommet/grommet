import React from 'react';
import { Box } from '../Box';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// Optional header region above the progress track. Rendered when the caller
// supplies a `header` prop OR a `header` node child. Uses only theme tokens
// and Heading/Text components (no custom font-size CSS).
export const WizardHeader = ({ header, ...rest }) => {
  const { theme, passThemeFlag } = useThemeValue();
  const { header: headerTheme } = theme.wizard || {};

  const resolved =
    header && typeof header === 'object' && !React.isValidElement(header)
      ? header
      : null;

  // If caller passed a raw node, just render it inside the themed pad+border.
  const content = resolved ? (
    <>
      {resolved.title && (
        <Heading
          level={headerTheme?.title?.level}
          size={headerTheme?.title?.size}
          margin="none"
        >
          {resolved.title}
        </Heading>
      )}
      {resolved.description && (
        <Text color="text-weak">{resolved.description}</Text>
      )}
    </>
  ) : (
    header
  );

  return (
    <Box
      pad={headerTheme?.pad}
      background={headerTheme?.background}
      border={headerTheme?.border}
      flex={false}
      {...passThemeFlag}
      {...rest}
    >
      {content}
    </Box>
  );
};

WizardHeader.displayName = 'WizardHeader';

// Consumer variant lets callers place <WizardHeader> as a child without
// having to pass the raw prop. It pulls its content from the current step
// title/description when no explicit header is set. It reads context so it
// stays in sync when the step changes.
export const WizardHeaderConsumer = () => {
  const { currentStepObj } = useWizard();
  if (!currentStepObj) return null;
  return (
    <WizardHeader
      header={{
        title: currentStepObj.title,
        description: currentStepObj.description,
      }}
    />
  );
};

WizardHeaderConsumer.displayName = 'WizardHeaderConsumer';
