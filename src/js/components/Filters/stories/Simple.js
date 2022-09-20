import React from 'react';

import { Box, CheckBoxGroup, Form, FormField, Select } from 'grommet';

import { Filters } from '../Filters';

export const Simple = () => (
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={...}>
  <Box fill align="center" justify="start" pad="large" gap="medium">
    <Filters>
      <Form>
        <FormField label="Status" name="status">
          <CheckBoxGroup
            name="status"
            options={['all', 'critical', 'warning', 'ok']}
          />
        </FormField>
        <FormField label="Type" name="type">
          <Select name="type" options={['type 1', 'type 2']} />
        </FormField>
      </Form>
    </Filters>
  </Box>
  // </Grommet>
);

Simple.args = {
  full: true,
};

export default {
  title: 'Layout/Filters/Simple',
};
