// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { Box, Button, Form, FormField } from 'grommet';
import { DateTimeRangeInput } from '../index';

const validateRange = (range?: [string?, string?]) =>
  range?.[0] && range?.[1]
    ? undefined
    : 'Select both a start and end date and time.';

export const FormIntegration = () => {
  const [value, setValue] = React.useState<{
    stay: [string?, string?];
  }>({ stay: [undefined, undefined] });

  return (
    <Box pad="medium" width="xlarge" gap="small">
      <Form
        value={value}
        onChange={(nextValue: { stay: [string?, string?] }) => {
          setValue(nextValue);
        }}
        onSubmit={() => {
          setValue({ stay: [undefined, undefined] });
        }}
      >
        <FormField
          htmlFor="stay-range"
          label="Choose a check-in and check-out date and time"
          name="stay"
          required
          validate={validateRange}
        >
          <DateTimeRangeInput id="stay-range" name="stay" format="12" />
        </FormField>
        <Button type="submit" label="submit" />
      </Form>
    </Box>
  );
};

FormIntegration.storyName = 'Form';

export default {
  title: 'Input/DateTimeRangeInput/Form',
};
