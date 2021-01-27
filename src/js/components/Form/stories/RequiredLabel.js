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

const myTheme = deepMerge(grommet, {
  formField: {
    label: {
      requiredAsterisk: true,
    },
  },
});

export const RequiredLabel = () => (
  <Grommet theme={myTheme}>
    <Box align="center" pad="large">
      <Form>
        <FormField
          name="firstName"
          label="First Name"
          htmlFor="firstName"
          required
        >
          <TextInput id="firstName" name="firstName" />
        </FormField>
        <FormField
          name="lastName"
          label="Last Name"
          htmlFor="lastName"
          required
        >
          <TextInput id="lastName" name="lastName" />
        </FormField>
        <FormField name="email" label="Email" htmlFor="email" required>
          <TextInput id="email" name="email" type="email" />
        </FormField>
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
