import React from 'react';
import { storiesOf } from '@storybook/react';

import { mnet, Box, FormField, Form, TextArea, MnetUIBase } from 'mnet-ui-base';

const FormFieldTextArea = props => (
  <MnetUIBase theme={mnet}>
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
  </MnetUIBase>
);

storiesOf('Form', module).add('TextArea', () => <FormFieldTextArea />);
