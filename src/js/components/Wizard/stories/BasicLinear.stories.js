import React, { useState } from 'react';

import { Box, Notification, Paragraph, TextInput } from 'grommet';
import { Wizard } from '../Wizard';

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
  const [complete, setComplete] = useState(false);
  return (
    <Box fill>
      <Wizard
        aria-label="Onboarding"
        title="Set up your account"
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

BasicLinear.args = {
  full: true,
};

export default {
  title: 'Layout/Wizard/Basic Linear',
};

export { BasicLinear };
