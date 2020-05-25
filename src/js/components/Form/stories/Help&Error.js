import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, FormField, TextInput } from 'mnet-ui-base';

const FormFieldHelpError = props => (
  <>
    <Box align="center" pad="large">
      <FormField
        label="Label"
        htmlFor="text-input"
        {...props}
        help="Text to help the user know what is possible"
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

storiesOf('Form', module).add('Help and Error', () => <FormFieldHelpError />);
