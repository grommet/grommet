import React, { useState } from 'react';

import { Box, Notification, Paragraph, TextInput } from 'grommet';
import { Wizard } from '../Wizard';

const Validation = () => {
  const [result, setResult] = useState(null);
  const steps = [
    {
      id: 'email',
      title: 'Email',
      description: 'Enter a valid email address.',
      validate: (value) => {
        if (!value.email) return 'Email is required.';
        if (!value.email.includes('@')) return 'Enter a valid email address.';
        return true;
      },
      render: (step, api) => (
        <TextInput
          placeholder="you@example.com"
          value={api.formValue.email || ''}
          onChange={(event) =>
            api.setFormValue({ ...api.formValue, email: event.target.value })
          }
        />
      ),
    },
    {
      id: 'password',
      title: 'Password',
      description: 'Choose a password.',
      validate: (value) =>
        value.password && value.password.length >= 6
          ? true
          : 'Password must be at least 6 characters.',
      render: (step, api) => (
        <TextInput
          type="password"
          placeholder="password"
          value={api.formValue.password || ''}
          onChange={(event) =>
            api.setFormValue({ ...api.formValue, password: event.target.value })
          }
        />
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
