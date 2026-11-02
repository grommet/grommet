// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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
  const { cancel, closable, messages } = useWizard();
  const headerTheme = theme.wizard?.header;

  // Custom children override the themed title.
  let content = children;
  if (children === undefined) {
    content =
      typeof title === 'string' && title ? (
        <Heading level={1} size={headerTheme?.title?.size} margin="none">
          {title}
        </Heading>
      ) : (
        title
      );
  }

  const CloseIcon = headerTheme?.close?.icon;
  const closeLabel = format({ id: 'wizard.close', messages });

  return (
    <Box
      pad={headerTheme?.pad}
      background={headerTheme?.background}
      direction="row"
      align="center"
      justify="between"
      flex={false}
      {...rest}
    >
      <Box direction="row" align="center" flex>
        {content}
      </Box>
      {closable && (
        <Button
          aria-label={closeLabel}
          icon={CloseIcon ? <CloseIcon aria-hidden="true" /> : undefined}
          onClick={cancel}
        />
      )}
    </Box>
  );
};

WizardHeader.displayName = 'WizardHeader';
