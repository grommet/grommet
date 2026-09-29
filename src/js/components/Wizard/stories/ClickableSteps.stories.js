// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';

import {
  Box,
  CheckBox,
  FormField,
  Notification,
  Paragraph,
  TextInput,
} from 'grommet';
import { Wizard } from '../Wizard';

const ClickableSteps = () => {
  const [complete, setComplete] = useState(false);
  const [value, setValue] = useState({ advanced: false });
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
            label="Resource name"
            name="name"
            required
          >
            <TextInput id="resource-name" name="name" />
          </FormField>
          <FormField name="advanced">
            <CheckBox name="advanced" label="Enable advanced options" />
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
      id: 'advanced',
      title: 'Advanced',
      description: 'Configure advanced resource options.',
      disabled: !value.advanced,
      disabledReason: 'Enable advanced options to configure this step.',
      render: () => <Paragraph>Configure advanced resource options.</Paragraph>,
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
        value={value}
        onChange={({ value: nextValue }) => setValue(nextValue)}
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
