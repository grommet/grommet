import React, { useState } from 'react';

import { Box, Heading, Notification, Paragraph } from 'grommet';
import { Wizard } from '../Wizard';
import { WizardHeader } from '../WizardHeader';
import { WizardProgress } from '../WizardProgress';
import { WizardContent } from '../WizardContent';
import { WizardFooter } from '../WizardFooter';

// Composable wizard: consumers assemble the layout from sub-components.
// Passing `children` bypasses the default layout — each sub-component
// reads from WizardContext, so no props need to be threaded through.
// Insert <WizardStepHeader /> between progress and content to show the
// current step's title and description.
const steps = [
  {
    id: 'account',
    title: 'Account',
    description: 'Tell us about your account.',
    render: () => <Paragraph>Placeholder account form.</Paragraph>,
  },
  {
    id: 'profile',
    title: 'Profile',
    description: 'Fill in your profile details.',
    render: () => <Paragraph>Placeholder profile form.</Paragraph>,
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Review and finish.',
    render: () => <Paragraph>Ready to submit.</Paragraph>,
  },
];

const Composable = () => {
  const [complete, setComplete] = useState(false);
  return (
    <Box fill>
      <Wizard
        aria-label="Composable wizard"
        showProgress="horizontal"
        steps={steps}
        onComplete={() => setComplete(true)}
      >
        <WizardHeader>
          <Heading level={2} size="small" margin="none">
            Set up your account
          </Heading>
        </WizardHeader>
        <WizardProgress />
        <WizardContent background="light-3" />
        <WizardFooter />
      </Wizard>
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

Composable.args = {
  full: true,
};

export default {
  title: 'Layout/Wizard/Composable',
};

export { Composable };
