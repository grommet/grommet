import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box, Button, Grommet, Form, FormField, TextInput } from 'grommet';
import { grommet } from 'grommet/themes';

const Example = () => {
  const [value, setValue] = React.useState('');
  return (
    <Grommet full theme={grommet}>
      <Box fill align="center" justify="center">
        <Box width="medium">
          <Form
            onReset={event => {
              console.log(event);
              setValue('');
            }}
            onSubmit={event => console.log('Submit', event.value)}
          >
            <FormField label="Name" name="name">
              <TextInput
                name="name"
                value={value}
                onChange={event => setValue(event.target.value)}
              />
            </FormField>
            <Box direction="row" justify="between" margin={{ top: 'medium' }}>
              <Button label="Cancel" />
              <Button type="reset" label="Reset" />
              <Button type="submit" label="Update" primary />
            </Box>
          </Form>
        </Box>
      </Box>
    </Grommet>
  );
};

storiesOf('Form', module).add('Controlled Input', () => <Example />);
