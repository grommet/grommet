import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { MessageContext } from '../../contexts/MessageContext';
import { useThemeValue } from '../../utils/useThemeValue';
import { useWizard } from './WizardContext';

// Header above the progress track. Hosts the close (X) button which
// invokes `cancel` from context.
export const WizardHeader = ({ title, children, ...rest }) => {
  const { theme } = useThemeValue();
  const { format } = React.useContext(MessageContext);
  const { cancel, messages } = useWizard();
  const headerTheme = theme.wizard?.header;

  // Custom children override the themed title.
  const content =
    children !== undefined
      ? children
      : title && (
          <Heading level={1} size={headerTheme?.title?.size} margin="none">
            {title}
          </Heading>
        );

  const CloseIcon = headerTheme?.close?.icon;
  const closeLabel = format({ id: 'wizard.close', messages });

  return (
    <Box
      pad={headerTheme?.pad}
      background={headerTheme?.background}
      border={headerTheme?.border}
      direction="row"
      align="center"
      justify="between"
      flex={false}
      {...rest}
    >
      <Box direction="row" align="center" flex>
        {content}
      </Box>
      <Button
        aria-label={closeLabel}
        icon={CloseIcon ? <CloseIcon aria-hidden="true" /> : undefined}
        onClick={cancel}
      />
    </Box>
  );
};

WizardHeader.displayName = 'WizardHeader';
