// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';

import {
  Box,
  Notification,
  Paragraph,
  TextInput,
  Form,
  FormField,
} from 'grommet';
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
      validate: (value) =>
        validateEmail(value.email) ? 'Fix the issues to continue' : true,
      render: (step, api) => {
        const emailError =
          api.validationError && validateEmail(api.formValue.email);
        return (
          <Form
            value={api.formValue}
            onChange={(nextValue) => api.setFormValue(nextValue)}
            validate="submit"
          >
            <FormField
              htmlFor="wizard-email"
              label="Email"
              name="email"
              required
              validate={validateEmail}
              error={emailError}
            >
              <TextInput
                id="wizard-email"
                name="email"
                placeholder="you@example.com"
              />
            </FormField>
          </Form>
        );
      },
    },
    {
      id: 'password',
      title: 'Password',
      description: 'Choose a password.',
      validate: (value) =>
        validatePassword(value.password) ? 'Fix the issues to continue' : true,
      render: (step, api) => {
        const passwordError =
          api.validationError && validatePassword(api.formValue.password);

        return (
          <Form
            value={api.formValue}
            onChange={(nextValue) => api.setFormValue(nextValue)}
            validate="change"
          >
            <FormField
              htmlFor="wizard-password"
              label="Password"
              name="password"
              required
              validate={validatePassword}
              error={passwordError}
            >
              <TextInput
                id="wizard-password"
                name="password"
                type="password"
                placeholder="password"
              />
            </FormField>
          </Form>
        );
      },
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
