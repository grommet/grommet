// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';

import { Box, FormField, Notification, Paragraph, TextInput } from 'grommet';
import { Wizard } from '../Wizard';

const FinalStepValidation = () => {
  const [completed, setCompleted] = useState(false);

  const steps = [
    {
      id: 'introduction',
      title: 'Introduction',
      render: () => <Paragraph>Continue to create an account.</Paragraph>,
    },
    {
      id: 'details',
      title: 'Account details',
      render: () => (
        <FormField
          htmlFor="wizard-email"
          label="Email address"
          name="email"
          required
        >
          <TextInput id="wizard-email" name="email" type="email" />
        </FormField>
      ),
    },
    {
      id: 'password',
      title: 'Password',
      render: () => (
        <FormField
          htmlFor="wizard-password"
          label="Password"
          name="password"
          required
        >
          <TextInput id="wizard-password" name="password" type="password" />
        </FormField>
      ),
    },
  ];

  return (
    <Box fill>
      <Wizard
        aria-label="Create account"
        title="Create account"
        steps={steps}
        defaultValue={{ email: '', password: '' }}
        onComplete={() => setCompleted(true)}
      />
      {completed && (
        <Notification
          toast={{ position: 'top' }}
          status="normal"
          title="Wizard completed"
          onClose={() => setCompleted(false)}
        />
      )}
    </Box>
  );
};

FinalStepValidation.args = {
  full: true,
};

export default {
  title: 'Layout/Wizard/Final Step Validation',
};

export { FinalStepValidation };
