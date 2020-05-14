import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, CheckBoxGroup, Form, FormField, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const CheckBoxGroupForm = () => {
  const [value, setValue] = useState();

  return (
    <Grommet theme={grommet}>
      <Box pad="medium" width="medium">
        <Form
          onSubmit={({ value: values, touched }) =>
            // 'touched' is a single boolean value indication of
            // whether any of the checkboxes had changed.
            console.log('Submit', values, touched)
          }
        >
          <FormField name="controlled">
            <CheckBoxGroup
              id="check-box-group-id"
              name="controlled"
              value={value}
              onChange={() => setValue()}
              options={['Maui', 'Jerusalem', 'Wuhan']}
            />
          </FormField>
          <Button type="submit" label="Submit" />
        </Form>
      </Box>
    </Grommet>
  );
};

storiesOf('CheckBoxGroup', module).add('Form controlled input', () => (
  <CheckBoxGroupForm />
));
