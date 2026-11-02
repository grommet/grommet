// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';

import { Box, Notification, Paragraph } from 'grommet';
import { Wizard } from '../Wizard';

// Nested wizard with sub-steps under a parent group. Parent is never a
// navigation target; child steps are visited in order.
const steps = [
  {
    id: 'setup',
    title: 'Setup',
    children: [
      {
        id: 'setup-account',
        title: 'Account',
        description: 'Create an account.',
        render: () => <Paragraph>Account form here.</Paragraph>,
      },
      {
        id: 'setup-profile',
        title: 'Profile',
        description: 'Fill in your profile.',
        render: () => <Paragraph>Profile form here.</Paragraph>,
      },
    ],
  },
  {
    id: 'billing',
    title: 'Billing',
    description: 'Set up billing.',
    render: () => <Paragraph>Billing form here.</Paragraph>,
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Review and submit.',
    render: () => <Paragraph>Review summary here.</Paragraph>,
  },
];

const NestedSubSteps = () => {
  const [result, setResult] = useState(null);
  return (
    <Box fill>
      <Wizard
        aria-label="Nested wizard"
        title="Set up your organization"
        showProgress="vertical"
        steps={steps}
        onComplete={({ value }) => setResult({ status: 'complete', value })}
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
  );
};

NestedSubSteps.args = {
  full: true,
};

export default {
  title: 'Layout/Wizard/Nested Sub-Steps',
};

export { NestedSubSteps };
