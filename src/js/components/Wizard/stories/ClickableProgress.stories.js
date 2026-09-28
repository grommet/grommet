// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';

import { Box, Notification, Paragraph } from 'grommet';
import { Wizard } from '../Wizard';

const steps = [
  {
    id: 'details',
    title: 'Details',
    description: 'Provide the resource details.',
    render: () => <Paragraph>Describe the resource to create.</Paragraph>,
  },
  {
    id: 'configure',
    title: 'Configure',
    description: 'Choose configuration options.',
    render: () => <Paragraph>Configure the resource options.</Paragraph>,
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Review before creating the resource.',
    render: () => <Paragraph>Review the selected configuration.</Paragraph>,
  },
];

const ClickableProgress = () => {
  const [complete, setComplete] = useState(false);
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

ClickableProgress.args = {
  full: true,
};

export default {
  title: 'Layout/Wizard/Clickable Progress',
};

export { ClickableProgress };
