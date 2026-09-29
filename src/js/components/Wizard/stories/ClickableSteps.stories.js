// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';

import { Box, FormField, Notification, Paragraph, TextInput } from 'grommet';
import { Wizard } from '../Wizard';

const validateResourceName = (name) => {
  if (!name || !name.trim()) return 'Enter a resource name to continue.';
  return undefined;
};

const ClickableSteps = () => {
  const [complete, setComplete] = useState(false);
  const steps = [
    {
      id: 'details',
      title: 'Details',
      description: 'Provide the resource details.',
      render: (/* step, api */) => (
        <Box gap="small">
          <Paragraph>Describe the resource to create.</Paragraph>
          <FormField
            htmlFor="resource-name"
            label="Resource"
            name="name"
            required
            validate={validateResourceName}
          >
            <TextInput
              id="resource-name"
              name="name"
              placeholder="Resource name"
            />
          </FormField>
        </Box>
      ),
    },
    {
      id: 'configure',
      title: 'Configure',
      description: 'Choose configuration options.',
      status: 'error',
      errorMessage: 'Configuration requires attention.',
      render: () => <Paragraph>Configure the resource options.</Paragraph>,
    },
    {
      id: 'approval',
      title: 'Approval',
      description: 'Request approval to continue.',
      disabled: true,
      disabledReason: 'Approval is unavailable for this resource.',
      skippable: true,
      render: () => <Paragraph>Request approval for the resource.</Paragraph>,
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Review before creating the resource.',
      render: (step, api) => (
        <Paragraph>
          Review the configuration for {api.formValue.name || 'your resource'}.
        </Paragraph>
      ),
    },
  ];
  return (
    <Box fill>
      <Wizard
        aria-label="Create resource"
        clickableSteps
        title="Create resource"
        showProgress="vertical"
        steps={steps}
        onComplete={() => setComplete(true)}
      />
      {complete && (
        <Notification
          toast={{ position: 'top' }}
          status="normal"
          title="Wizard complete"
          onClose={() => setComplete(false)}
        />
      )}
    </Box>
  );
};

ClickableSteps.args = {
  full: true,
};

export default {
  title: 'Layout/Wizard/Clickable Steps',
};

export { ClickableSteps };
