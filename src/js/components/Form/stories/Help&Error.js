import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, FormField, TextInput, Grommet } from 'grommet';

const FormFieldHelpError = props => (
  <Grommet theme={grommet}>
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
  </Grommet>
);

storiesOf('Form', module).add('Help and Error', () => <FormFieldHelpError />);
