import React from 'react';
import { storiesOf } from '@storybook/react';
import { deepMerge } from 'grommet/utils';

import { grommet, Box, FormField, TextArea, Grommet } from 'grommet';

const customFormFieldTheme = {
  global: {
    font: {
      size: '13px',
    },
    input: {
      weight: 400,
    },
  },
  formField: {
    label: {
      color: 'dark-3',
      size: 'xsmall',
      margin: { vertical: '0', bottom: 'small', horizontal: '0' },
      weight: 600,
    },
    border: false,
    margin: 0,
  },
};

const CustomFormField = () => (
  <Grommet theme={deepMerge(grommet, customFormFieldTheme)}>
    <Box align="center" pad="large">
      <FormField label="Label" htmlFor="text-area">
        <TextArea id="text-area" placeholder="placeholder" />
      </FormField>
    </Box>
  </Grommet>
);

storiesOf('FormField', module).add('Custom Theme', () => <CustomFormField />);
