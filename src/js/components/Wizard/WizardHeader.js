import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// Header region above the progress track. Always renders so the close
// (X) button is present; X invokes `cancel` from context (caller's
// `onCancel` or, if unset, self-close).
export const WizardHeader = ({ header, ...rest }) => {
  const { theme, passThemeFlag } = useThemeValue();
  const { format } = React.useContext(MessageContext);
  const { cancel, messages } = useWizard();
  const { header: headerTheme, icons: iconTheme } = theme.wizard || {};

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

  const CloseIcon = iconTheme?.close;
  const closeLabel =
    messages?.close || format({ id: 'wizard.close' }) || 'Close';

  return (
    <Box
      pad={headerTheme?.pad}
      background={headerTheme?.background}
      border={headerTheme?.border}
      height={headerTheme?.height}
      direction="row"
      align="center"
      justify="between"
      flex={false}
      {...passThemeFlag}
      {...rest}
    >
      <Box direction="row" align="center" flex>
        {content}
      </Box>
      <Button
        a11yTitle={closeLabel}
        icon={CloseIcon ? <CloseIcon aria-hidden="true" /> : undefined}
        plain
        onClick={cancel}
      />
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
