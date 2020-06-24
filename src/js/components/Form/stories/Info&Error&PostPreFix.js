import React from 'react';
import { storiesOf } from '@storybook/react';
import { CircleInformation } from 'grommet-icons';

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
        {...props}
        info={{
          icon: <CircleInformation size="small" />,
          message: 'Text to call attention to an issue with this field ',
        }}
        error="Text to call attention to an issue with this field"
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
