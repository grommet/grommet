import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, FormField, Form, TextArea } from 'mnet-ui-base';

const FormFieldTextArea = props => (
  <>
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
  </>
);

storiesOf('Form', module).add('TextArea', () => <FormFieldTextArea />);
