import React, { useState } from 'react';

import { Box, Grommet, Notification, Paragraph, TextInput } from 'grommet';
import { Wizard } from '../Wizard';
import { grommet } from '../../../themes';

const steps = [
  {
    id: 'account',
    title: 'Account',
    description: 'Tell us about your account.',
    render: (step, api) => (
      <Box gap="small">
        <Paragraph>Enter an email to continue.</Paragraph>
        <TextInput
          placeholder="you@example.com"
          value={api.formValue.email || ''}
          onChange={(event) =>
            api.setFormValue({ ...api.formValue, email: event.target.value })
          }
        />
      </Box>
    ),
  },
  {
    id: 'profile',
    title: 'Profile',
    description: 'Fill in your profile details.',
    render: () => (
      <Paragraph>Placeholder profile form for the second step.</Paragraph>
    ),
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Review and finish.',
    render: (step, api) => (
      <Paragraph>
        Ready to submit for {api.formValue.email || 'unknown user'}.
      </Paragraph>
    ),
  },
];

const BasicLinear = () => {
  const [result, setResult] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const handleCancel = () => {
    setResult(null);
    setResetKey((key) => key + 1);
  };
  return (
    <Grommet theme={grommet} full>
      <Box fill>
        <Wizard
          key={resetKey}
          aria-label="Onboarding"
          header={{ title: 'Set up your account' }}
          steps={steps}
          defaultValue={{ email: '' }}
          onComplete={(value) => setResult({ status: 'complete', value })}
          onCancel={handleCancel}
        />
        {result && (
          <Notification
            toast={{ position: 'top' }}
            status="normal"
            title="Wizard complete"
            message={
              result.value && Object.keys(result.value).length > 0
                ? `Completed: ${JSON.stringify(result.value)}`
                : undefined
            }
            onClose={() => setResult(null)}
          />
        )}
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Layout/Wizard/Basic Linear',
};

export { BasicLinear };
