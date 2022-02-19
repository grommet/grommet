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
      requiredIndicator: true,
    },
  },
});

export const RequiredLabel = () => (
  <Grommet theme={customTheme}>
    <Box align="center" pad="large">
      <Form>
        <FormField
          name="firstName"
          htmlFor="firstName"
          label="First Name"
          required
        >
          <TextInput id="firstName" name="firstName" />
        </FormField>
        <FormField
          name="lastName"
          htmlFor="lastName"
          label="Last Name"
          required
        >
          <TextInput id="lastName" name="lastName" />
        </FormField>
        <FormField name="email" htmlFor="email" label="Email" required>
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

RequiredLabel.storyName = 'Required label';

export default {
  title: 'Input/Form/Custom Themed/Required label',
};
