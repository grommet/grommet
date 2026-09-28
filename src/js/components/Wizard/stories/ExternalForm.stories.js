// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';

import {
  Box,
  Form,
  FormField,
  Notification,
  Paragraph,
  TextInput,
} from 'grommet';
import { Wizard } from '../Wizard';

const steps = [
  {
    id: 'details',
    title: 'Details',
    render: () => (
      <FormField htmlFor="request-name" label="Request name" name="name">
        <TextInput id="request-name" name="name" />
      </FormField>
    ),
  },
  {
    id: 'review',
    title: 'Review',
    render: () => (
      <Paragraph>Review the request and complete the wizard.</Paragraph>
    ),
  },
];

const ExternalForm = () => {
  const [complete, setComplete] = useState(false);
  return (
    <Form>
      <Box fill>
        <Wizard
          aria-label="New request"
          form={false}
          title="New request"
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
    </Form>
  );
};

ExternalForm.args = {
  full: true,
};

export default {
  title: 'Layout/Wizard/External Form',
};

export { ExternalForm };
