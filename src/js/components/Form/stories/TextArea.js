import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, FormField, Form, TextArea, Grommet } from 'grommet';

const FormFieldTextArea = props => (
  <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <Form>
        <FormField
          label="Label"
          htmlFor="text-area"
          {...props}
          component={TextArea}
          placeholder="placeholder"
        />
      </Form>
    </Box>
  </Grommet>
);

storiesOf('Form', module).add('TextArea', () => <FormFieldTextArea />);
