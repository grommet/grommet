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
    validate: (value) =>
      value.name?.trim() ? undefined : 'A request name is required.',
    render: () => (
      <FormField htmlFor="request-name" label="Request name" name="name">
        <TextInput id="request-name" name="name" />
      </FormField>
    ),
  },
  {
    id: 'review',
    title: 'Review',
    render: (step, api) => (
      <Paragraph>
        Review the request for {api.formValue.name || 'an unnamed request'}.
      </Paragraph>
    ),
  },
];

const ExternalForm = () => {
  const [complete, setComplete] = useState(false);
  const [value, setValue] = useState({ name: '' });
  return (
    <Form value={value} onChange={setValue}>
      <Box fill>
        <Wizard
          aria-label="New request"
          form={false}
          title="New request"
          showProgress="vertical"
          steps={steps}
          value={value}
          onChange={({ value: nextValue }) => setValue(nextValue)}
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
