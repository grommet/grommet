import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, CheckBoxGroup, Form, FormField, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const CheckBoxGroupForm = () => {
  return (
    <Grommet theme={grommet}>
      <Box pad="medium">
        <Form
          onSubmit={({ value: values, touched }) =>
            console.log('Submit', values, touched)
          }
        >
          <FormField
            name="am-pm"
            component={CheckBoxGroup}
            options={['morning', 'evening']}
          />
          <Button type="submit" label="Submit" />
        </Form>
      </Box>
    </Grommet>
  );
};

storiesOf('CheckBoxGroup', module).add('Form uncontrolled', () => (
  <CheckBoxGroupForm />
));
