// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';

import { Box, Notification, Paragraph, TextInput, FormField } from 'grommet';
import { Wizard } from '../Wizard';

const validateEmail = (email) => {
  if (!email) return 'Email is required.';
  if (!email.includes('@')) return 'Enter a valid email address.';
  return undefined;
};

const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters.';
  }
  return undefined;
};

const Validation = () => {
  const [result, setResult] = useState(null);

  const steps = [
    {
      id: 'email',
      title: 'Email',
      description: 'Enter a valid email address.',
      skippable: true,
      validate: (value) => {
        if (value.extra !== 'please') {
          return 'You must enter "please" in the Extra field to proceed.';
        }
        return undefined;
      },
      render: (/* step, api */) => (
        <>
          <FormField
            htmlFor="wizard-email"
            label="Email"
            name="email"
            required
            validate={validateEmail}
          >
            <TextInput
              id="wizard-email"
              name="email"
              placeholder="you@example.com"
            />
          </FormField>
          <FormField htmlFor="wizard-extra" label="Extra" name="extra" required>
            <TextInput
              id="wizard-extra"
              name="extra"
              placeholder="Extra information"
            />
          </FormField>
        </>
      ),
    },
    {
      id: 'password',
      title: 'Password',
      description: 'Choose a password.',
      render: (/* step, api */) => (
        <FormField
          htmlFor="wizard-password"
          label="Password"
          name="password"
          required
          validate={validatePassword}
        >
          <TextInput
            id="wizard-password"
            name="password"
            type="password"
            placeholder="password"
          />
        </FormField>
      ),
    },
    {
      id: 'confirm',
      title: 'Confirm',
      description: 'Ready to submit.',
      render: (step, api) => (
        <Paragraph>Confirm sign-up for {api.formValue.email}.</Paragraph>
      ),
    },
  ];

  return (
    <Box fill>
      <Wizard
        aria-label="Sign up"
        title="Create your account"
        showProgress="vertical"
        steps={steps}
        defaultValue={{ email: '', password: '' }}
        onComplete={({ value }) => setResult({ status: 'complete', value })}
      />
      {result && (
        <Notification
          toast={{ position: 'top' }}
          status="normal"
          title="Wizard complete"
          message={`Account created for ${result.value.email}.`}
          onClose={() => setResult(null)}
        />
      )}
    </Box>
  );
};

Validation.args = {
  full: true,
};

export default {
  title: 'Layout/Wizard/Validation',
};

export { Validation };
