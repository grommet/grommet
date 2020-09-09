import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Form, FormField, TextInput, Grommet } from 'grommet';

const FormFieldHelpError = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Form>
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
      </Form>
    </Box>
  </Grommet>
);

storiesOf('Form', module).add('Help and error', () => <FormFieldHelpError />);
