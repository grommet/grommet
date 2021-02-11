import React from 'react';

import { Box, Form, FormField, Grommet, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

export const HelpAndError = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Form>
        <FormField
          label="Label"
          htmlFor="text-input"
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

HelpAndError.storyName = 'Help and error';

export default {
  title: 'Input/Form/Help and error',
};
