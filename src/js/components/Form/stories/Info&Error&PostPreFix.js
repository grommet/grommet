import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, FormField, TextInput } from 'mnet-ui-base';

const FormFieldInfoPostFix = props => (
  <>
    <Box align="center" pad="large">
      <FormField
        direction="row"
        label="Label"
        postfix="ms"
        prefix="ms"
        htmlFor="text-input"
        error="Text to call attention to an issue with this field"
        {...props}
      >
        <TextInput
          id="text-input"
          placeholder="placeholder"
          value="Value"
          onChange={() => {}}
        />
      </FormField>
    </Box>
  </>
);

storiesOf('Form', module).add('Info, Error, Post and Pre fix label', () => (
  <FormFieldInfoPostFix />
));
