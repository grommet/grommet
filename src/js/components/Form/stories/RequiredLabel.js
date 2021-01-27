import React from 'react';

import {
  Box,
  Button,
  Form,
  FormField,
  Grommet,
  Text,
  TextInput,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(grommet, {
  formField: {
    label: {
      requiredAsterisk: true,
    },
  },
});

export const RequiredLabel = () => (
  <Grommet theme={customTheme}>
    <Box align="center" pad="large">
      <Form>
        <FormField name="firstName" label="First Name" required />
        <FormField name="lastName" label="Last Name" required />
        <FormField name="email" label="Email" required />
        <Button type="submit" label="Submit" primary />
        <Text margin={{ left: 'small' }} size="small" color="status-critical">
          * Required Field
        </Text>
      </Form>
    </Box>
  </Grommet>
);

RequiredLabel.story = {
  name: 'Required label',
};
