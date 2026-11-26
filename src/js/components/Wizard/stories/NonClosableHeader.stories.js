// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';

import { Box, Button, Heading, Notification, Paragraph } from 'grommet';
import { Wizard } from '../Wizard';

const steps = [
  {
    id: 'details',
    title: 'Details',
    render: () => <Paragraph>Enter the request details.</Paragraph>,
  },
  {
    id: 'review',
    title: 'Review',
    render: () => <Paragraph>Review the request before submitting.</Paragraph>,
  },
];

const NonClosableHeader = () => {
  const [saved, setSaved] = useState(false);
  const title = (
    <Box direction="row" align="center" gap="medium" flex>
      <Heading level={1} size="small" margin="none">
        New request
      </Heading>
      <Button label="Save draft" onClick={() => setSaved(true)} />
    </Box>
  );

  return (
    <Box fill>
      <Wizard
        aria-label="New request"
        closable={false}
        title={title}
        showProgress="horizontal"
        steps={steps}
      />
      {saved && (
        <Notification
          toast={{ position: 'top' }}
          status="normal"
          title="Draft saved"
          onClose={() => setSaved(false)}
        />
      )}
    </Box>
  );
};

NonClosableHeader.args = {
  full: true,
};

export default {
  title: 'Layout/Wizard/Non Closable Header',
};

export { NonClosableHeader };
