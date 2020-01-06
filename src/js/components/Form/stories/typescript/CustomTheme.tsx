import React from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'storybook-chromatic/isChromatic';

import { mnet, Box, FormField, TextArea, MnetUIBase } from 'mnet-ui-base';
import { deepMerge } from 'mnet-ui-base/utils';
import { ThemeType } from 'mnet-ui-base/themes';

const customFormFieldTheme: ThemeType = {
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
    margin: '0',
  },
};

const CustomFormField = () => (
  <MnetUIBase theme={deepMerge(mnet, customFormFieldTheme)}>
    <Box align="center" pad="large">
      <FormField label="Label" htmlFor="text-area">
        <TextArea id="text-area" placeholder="placeholder" />
      </FormField>
    </Box>
  </MnetUIBase>
);

if (!isChromatic()) {
  storiesOf('TypeScript/Form', module).add('Custom Theme', () => (
    <CustomFormField />
  ));
}
